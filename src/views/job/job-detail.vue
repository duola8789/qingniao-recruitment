<template>
    <div
        class="job-detail"
        v-loading="!jobInfo"
    >
        <el-card class="job-detail-top">
            <div class="job-detail-title-wrapper">
                <div class="job-detail-title-left">
                    <div class="job-detail-title-left-line">
                        <p class="job-detail-title">{{ jobInfo.name }}</p>
                        <el-tag
                            v-if="jobInfo.isEmergency"
                            effect="dark"
                            class="emergency-tag"
                        >
                            急聘
                        </el-tag>
                        <span class="job-detail-salary">{{ jobInfo.salary }}</span>
                    </div>
                    <div class="job-detail-title-left-line">
                        <span class="job-detail-extra">{{ jobInfo.location }}</span>
                        <span
                            v-for="it in jobInfo.tags"
                            :key="it"
                            class="job-detail-extra"
                        >
                            {{ it }}
                        </span>
                    </div>
                    <div class="job-detail-title-left-line">
                        <el-tag
                            v-for="it in jobInfo.company.tags.slice(0, 5)"
                            :key="it"
                            class="job-detail-extra job-detail-company-tag"
                            type="info"
                            round
                        >
                            {{ it }}
                        </el-tag>
                    </div>
                </div>
                <div class="job-detail-title-right">
                    <el-button
                        class="job-recruiter-btn"
                        round
                        :disabled="jobInfo.isSubmit"
                        :icon="jobInfo.isSubmit ? BellFilled : Bell"
                        @click="onClick('isSubmit')"
                    >
                        {{ jobInfo.isSubmit ? '简历已投递' : '投简历' }}
                    </el-button>
                    <el-button
                        class="job-recruiter-btn"
                        round
                        type="success"
                        :icon="jobInfo.isCollect ? StarFilled : Star"
                        @click="onClick('isCollect')"
                    >
                        {{ jobInfo.isCollect ? '已收藏' : '收藏' }}
                    </el-button>
                </div>
            </div>
        </el-card>
        <el-card class="job-detail-recruiter-card">
            <div class="job-detail-recruiter">
                <div class="job-detail-recruiter-left">
                    <el-avatar
                        :size="80"
                        class="job-detail-recruiter-avatar"
                        :src="jobInfo.recruiter.icon"
                    />
                    <div class="job-detail-recruiter-info">
                        <div class="job-detail-recruiter-info-top">
                            <span class="job-detail-recruiter-name">{{ jobInfo.recruiter.name }}</span>
                            <span
                                :class="
                                    jobInfo.recruiter.onlineTime
                                        ? 'job-detail-recruiter-online-circle'
                                        : 'job-detail-recruiter-offline-circle'
                                "
                            ></span>
                            <span class="job-detail-recruiter-online-time">
                                {{
                                    jobInfo.recruiter.onlineTime
                                        ? jobInfo.recruiter.onlineTime + '小时前在线'
                                        : '当前在线'
                                }}
                            </span>
                            <el-tag
                                effect="dark"
                                :type="jobInfo.recruiter.isAuthentication ? 'success' : 'danger'"
                            >
                                {{ jobInfo.recruiter.isAuthentication ? '已认证' : '未认证' }}
                            </el-tag>
                        </div>
                        <p class="job-detail-recruiter-info-bottom">
                            {{ jobInfo.recruiter.post }}·{{ jobInfo.company.name }}
                        </p>
                    </div>
                </div>
                <el-button
                    class="job-recruiter-btn"
                    round
                    type="primary"
                    :icon="jobInfo.isCommunicate ? CircleCheckFilled : CircleCheck"
                    :disabled="jobInfo.isCommunicate"
                    @click="onClick('isCommunicate')"
                >
                    {{ jobInfo.isCommunicate ? '请静候佳音' : '聊一聊' }}
                </el-button>
            </div>
        </el-card>
        <div class="job-detail-content-card">
            <el-card class="job-detail-content-box">
                <div class="job-detail-content-desc">
                    <p class="job-detail-content-desc-title">职位描述</p>
                    <p
                        v-for="it in jobInfo.content.desc.split('\n')"
                        :key="it"
                        class="job-detail-text"
                    >
                        {{ it }}
                    </p>
                </div>
                <div class="job-detail-content-desc">
                    <p class="job-detail-content-desc-title">岗位职责</p>
                    <p
                        v-for="it in jobInfo.content.require.split('\n')"
                        :key="it"
                        class="job-detail-text"
                    >
                        {{ it }}
                    </p>
                </div>
            </el-card>
            <el-card class="job-detail-related-job">
                <p class="job-detail-related-job-title">类似岗位</p>
                <job-item
                    class="job-detail-related-job-item"
                    v-for="item in relatedJobs"
                    :job-info="item"
                    :key="item.id"
                    :show-company="true"
                    @onJump="onJumpJobItem(item)"
                />
            </el-card>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { onMounted, ref } from 'vue';
import { request } from '@/server/request';
import { CompanyTypes, JobInfo } from '@/config/types';
import { COMMON_URLS } from '@/config';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Star, StarFilled, CircleCheckFilled, CircleCheck, Bell, BellFilled } from '@element-plus/icons-vue';
import { useRootStore } from '@/store/root-store';
import JobItem from '@/components/job-item.vue';
import { loadingCounter } from '@/util/loading-counter';

const store = useRootStore();
const router = useRouter();
const route = useRoute();

const relatedJobs = ref<JobInfo[]>([]);

const jobId = ref('');
const jobInfo = ref<JobInfo>({
    id: '',
    name: '',
    salary: '',
    location: '',
    company: {
        id: '',
        name: '',
        shortName: '',
        desc: '',
        type: 'it',
        slogan: '',
        icon: '',
        iconColor: '',
        evaluateNum: 0,
        jobNum: 0,
        resumeHandleRete: 0,
        detail: '',
        tags: []
    },
    isEmergency: false,
    isCommunicate: false,
    tags: ['', ''],
    content: {
        desc: '',
        require: ''
    },
    recruiter: {
        name: '',
        icon: '',
        post: '',
        onlineTime: '',
        isAuthentication: false
    }
});

const onClick = (type: 'isCommunicate' | 'isCollect' | 'isSubmit') => {
    if (!store.isLogin) {
        ElMessageBox.alert('您还没有登录，请先登录', '提示', {
            confirmButtonText: 'OK',
            callback: () => {
                store.dialogVisible = true;
            }
        });
    } else {
        jobInfo.value[type] = !jobInfo.value[type];
        if (type === 'isCommunicate') {
            ElMessage.success('已通知招聘者，招聘者会尽快与您联系');
        } else if (type === 'isCollect') {
            ElMessage.success(jobInfo.value.isCollect ? '收藏成功' : '取消收藏');
        } else {
            ElMessage.success('投递成功');
        }
    }
};

const fetchData = () => {
    const params = {
        jobId: jobId.value,
        type: typeof route.query?.type === 'string' ? (route.query.type as CompanyTypes) : undefined,
        companyId: typeof route.query?.companyId === 'string' ? route.query.companyId : ''
    };
    return request.getJob(params).then((res) => {
        const { code, data } = res;
        if (+code === 0 && data) {
            jobInfo.value = data;
            window.localStorage.setItem('job', JSON.stringify(data));
        }
    });
};

const fetchRelatedJobs = () => {
    if (store.jobs.size > 0) {
        relatedJobs.value = [...store.jobs.values()].slice(0, 3);
    } else {
        request
            .getJobList({
                companyId: jobInfo.value.company.id,
                jobType: jobInfo.value.company.type,
                size: 3,
                page: 1
            })
            .then((re) => {
                if (+re.code === 0 && re.data) {
                    relatedJobs.value = re.data;
                }
            });
    }
};

onMounted(() => {
    if (typeof route.query?.id === 'string') {
        jobId.value = route.query.id;
        const inStorage = window.localStorage.getItem('job');
        if (inStorage) {
            const jonInfoInStorage = JSON.parse(inStorage) as JobInfo;
            if (jonInfoInStorage.id === route.query.id) {
                jobInfo.value = jonInfoInStorage;
            } else {
                fetchData().then(fetchRelatedJobs);
            }
        } else {
            fetchData().then(fetchRelatedJobs);
        }
        fetchRelatedJobs();
    }
});

onBeforeRouteUpdate((to, from, next) => {
    if (typeof to.query?.id === 'string') {
        jobId.value = to.query.id;
        fetchData().then(fetchRelatedJobs);
    } else {
        next(COMMON_URLS.jobs);
    }
});

const onJumpJobItem = (job: JobInfo) => {
    loadingCounter.addLoading();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setTimeout(() => {
        router.replace({
            name: COMMON_URLS.job,
            query: { id: job.id, companyId: job.company.id, type: job.company.type }
        });
        loadingCounter.subLoading();
    }, 500);
};
</script>

<style lang="scss">
.job-detail {
    width: 960px;
    margin: 0 auto;

    .job-detail-top {
        margin: 20px 0;

        .job-detail-title-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .job-detail-title {
                color: #000;
                font-weight: 700;
                font-size: 28px;
                margin-right: 8px;
            }

            .job-detail-title-left-line {
                display: flex;
                align-items: center;

                &:nth-child(2) {
                    margin: 12px 0 24px;
                }
            }

            .job-detail-extra {
                color: #333;
                font-size: 14px;
                margin-right: 16px;

                &:last-child {
                    margin-bottom: 0;
                }

                &.job-detail-company-tag {
                    font-size: 12px;
                    color: #999;
                }
            }

            .job-detail-salary {
                font-size: 24px;
                font-weight: 700;
                color: #ff6400;
                margin-left: 24px;
            }
        }
    }

    .job-detail-title-right {
        display: flex;
        align-items: center;
    }

    .job-detail-recruiter-card {
        margin-bottom: 20px;
    }

    .job-detail-recruiter {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .job-detail-recruiter-left {
            display: flex;
            align-items: center;
        }

        .job-detail-recruiter-avatar {
            margin-right: 12px;
        }

        .job-detail-recruiter-info-top {
            display: flex;
            align-items: center;

            .job-detail-recruiter-name {
                margin-right: 12px;
                font-size: 16px;
                color: #07132b;
            }

            .job-detail-recruiter-online-circle,
            .job-detail-recruiter-offline-circle {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #999;
                margin-right: 4px;

                &.job-detail-recruiter-offline-circle {
                    background: #0ee652;
                }
            }

            .job-detail-recruiter-online-time {
                color: #999;
                font-size: 12px;
                margin-right: 12px;
            }
        }

        .job-detail-recruiter-info-bottom {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            text-align: left;
        }
    }

    .job-detail-content-card {
        display: grid;
        grid-column-gap: 20px;
        grid-template-columns: 1fr 300px;
        text-align: left;
        margin-bottom: 20px;

        .job-detail-content-desc {
            margin-bottom: 20px;
        }

        .job-detail-content-desc-title {
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin-bottom: 12px;
        }

        .job-detail-text {
            font-size: 16px;
            color: #666;
            line-height: 40px;
        }
    }

    .job-detail-related-job-title {
        font-weight: bold;
        font-size: 16px;
        color: #333;
        margin-bottom: 20px;
    }

    .job-detail-related-job-item {
        width: 100%;
    }
}
</style>
