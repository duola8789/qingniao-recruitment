<template>
    <div class="company-detail">
        <div class="company-detail-header">
            <div class="company-detail-header-content">
                <el-avatar
                    class="company-detail-avatar"
                    shape="square"
                    :size="64"
                    :src="companyInfo.icon"
                    :style="{ backgroundColor: companyInfo.iconColor || 'unset' }"
                >
                    {{ companyInfo.name[0] }}
                </el-avatar>
                <div class="company-detail-info">
                    <p class="company-detail-name">
                        <span>{{ companyInfo.name }}</span>
                        <el-button
                            round
                            :type="isFollow ? 'default' : 'primary'"
                            :icon="Plus"
                            size="small"
                            class="follow-company-btn"
                            @click="onFollowCompany"
                        >
                            {{ isFollow ? '取消关注' : '关注' }}
                        </el-button>
                    </p>
                    <p class="company-detail-desc">{{ companyInfo.desc }}</p>
                </div>
            </div>
            <p class="company-detail-header-tags">
                <el-tag
                    v-for="item in companyInfo.tags"
                    effect="dark"
                    :key="item"
                    type="info"
                    class="company-detail-tag"
                    round
                >
                    {{ item }}
                </el-tag>
            </p>
        </div>
        <div class="company-detail-main">
            <p class="company-detail-detail-title">公司简介</p>
            <el-card
                class="company-detail-detail"
                :body-style="{ padding: '36px 40px' }"
            >
                <div class="company-detail-detail-inner">
                    <div class="company-detail-detail-text-box">
                        <p class="company-detail-detail-text">{{ companyInfo.detail }}</p>
                    </div>
                    <img
                        class="company-detail-detail-image"
                        :src="getSrc(companyInfo.id)"
                        alt=""
                    />
                </div>
            </el-card>
            <p class="company-detail-detail-title">
                <span>热招职位</span>
                <jump-link
                    @onJump="onJump"
                    content="查看更多"
                />
            </p>
            <div class="company-job-list">
                <job-item
                    v-for="item in jobList"
                    :job-info="item"
                    :key="item.id"
                    @onJump="onJumpJobItem(item)"
                />
            </div>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { CompanyInfo, JobInfo } from '@/config/types';
import { request } from '@/server/request';
import { COMMON_URLS } from '@/config';
import JumpLink from '@/components/jump-link.vue';
import JobItem from '@/components/job-item.vue';

const route = useRoute();
const router = useRouter();
const companyInfo = ref<CompanyInfo>({
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
});
const jobList = ref<JobInfo[]>([]);

const isFollow = ref(false);

const fetchData = (id: string) => {
    request.getCompany({ companyId: id }).then((res) => {
        const { code, data } = res;
        if (+code === 0 && data) {
            companyInfo.value = data;
            request
                .getJobList({
                    companyId: id,
                    jobType: companyInfo.value ? companyInfo.value.type : '',
                    page: 1,
                    size: 20
                })
                .then((res) => {
                    const { code, data } = res;
                    if (+code === 0 && data) {
                        jobList.value = data;
                    }
                });
        }
    });
};

onBeforeRouteUpdate((to) => {
    fetchData(to.params.id as string);
});

watch(
    route,
    (newVal) => {
        if (newVal) {
            fetchData(newVal.params.id as string);
        }
    },
    { immediate: true }
);

const onFollowCompany = () => {
    isFollow.value = !isFollow.value;
    ElMessage.success(isFollow.value ? '关注成功' : '取消关注成功');
};

const getSrc = (id: string) => {
    return new URL(`../../assets/company/${id}/pic-1.png`, import.meta.url).href;
};

const onJump = () => {
    router.push(COMMON_URLS.jobs);
};

const onJumpJobItem = (job: JobInfo) => {
    router.push({
        name: COMMON_URLS.job,
        query: { id: job.id, companyId: job.company.id, type: job.company.type }
    });
};
</script>

<style lang="scss">
.company-detail {
    .company-detail-header {
        height: 300px;
        background: url('@/assets/company/header-bg.png') no-repeat center center;
        background-size: cover;
    }

    .company-detail-main {
        width: $main-width;
        margin: 0 auto;
        text-align: left;
    }

    .company-detail-header-content {
        display: flex;
        padding-top: 64px;
        width: $main-width;
        margin: 0 auto;
        text-align: left;

        .company-detail-avatar {
            font-size: 40px;
        }

        .company-detail-info {
            margin-left: 20px;
        }

        .company-detail-name {
            margin-top: 4px;
            color: #fff;
            font-weight: 700;
            font-size: 24px;
        }

        .follow-company-btn {
            margin-left: 12px;
        }

        .company-detail-desc {
            color: #fff;
            margin-top: 16px;
            font-size: 14px;
        }
    }

    .company-detail-detail-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 30px 0;
        color: #000;
        font-weight: 500;
        font-size: 24px;
    }

    .company-detail-header-tags {
        width: $main-width;
        margin: 24px auto 0;
        text-align: left;

        .company-detail-tag {
            margin-right: 8px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .company-detail-detail {
        width: $main-width;
        margin: 0 auto 24px;
        text-align: left;

        .company-detail-detail-inner {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
        }

        .company-detail-detail-text-box {
            margin-right: 60px;
        }

        .company-detail-detail-text {
            padding-top: 30px;
            line-height: 30px;
            text-align: justify;
        }

        .company-detail-detail-image {
            width: 350px;
            border-radius: 8px;
        }
    }

    .company-job-list {
        display: flex;
        align-content: center;
        flex-wrap: wrap;
    }
}
</style>
