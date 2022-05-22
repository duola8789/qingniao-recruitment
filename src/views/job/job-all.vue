<template>
    <div class="job-all">
        <el-card
            class="job-all-top"
            shadow="never"
        >
            <div class="job-all-top-wrapper">
                <el-pagination
                    background
                    layout="prev, pager, next, sizes"
                    :total="150"
                    v-model:page-size="pageSize"
                    v-model:current-page="currentPage"
                    :page-sizes="[10, 50, 100]"
                    @current-change="onPageChange"
                    @size-change="onSizeChange"
                />
                <el-select
                    v-model="jobType"
                    placeholder="请选择行业"
                    clearable
                >
                    <el-option
                        v-for="item in jobOptions"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key"
                    />
                </el-select>
            </div>
        </el-card>
        <el-card
            v-for="item in jobList"
            :key="item.id"
            class="job-all-item-card"
            @click="onJumpJobItem(item)"
        >
            <div class="job-all-item-wrapper">
                <div class="job-all-item-left">
                    <div class="job-all-item-title">
                        <span class="job-all-item-title-name">{{ item.name }}</span>
                        <span class="job-all-item-title-location">[{{ item.location }}]</span>
                        <el-tag
                            v-if="item.isEmergency"
                            effect="dark"
                            class="emergency-tag"
                        >
                            急聘
                        </el-tag>
                        <span class="job-all-item-title-salary">{{ item.salary }}</span>
                    </div>
                    <div class="company-tag-wrapper">
                        <el-tag
                            v-for="tag in item.tags"
                            :key="tag"
                            class="job-all-item-tag"
                            size="small"
                            type="info"
                        >
                            {{ tag }}
                        </el-tag>
                    </div>
                    <div>
                        <company-icon
                            class="job-all-item-company-icon"
                            :icon="item.company.icon"
                            :name="item.company.name"
                            :icon-color="item.company.iconColor"
                            :size="30"
                        />
                        <span class="job-all-item-company-name">{{ item.company.name }}</span>
                        <span class="job-all-item-company-desc">{{ item.company.desc }}</span>
                    </div>
                </div>
                <div class="job-all-item-right">
                    <el-avatar
                        :size="40"
                        :src="item.recruiter.icon"
                    />
                    <div class="job-recruiter-right-bottom">
                        <div class="job-recruiter-desc">
                            <p class="job-all-item-recruiter-name">{{ item.recruiter.name }}</p>
                            <p class="job-all-item-recruiter-post">{{ item.recruiter.post }}</p>
                        </div>
                        <div class="job-recruiter-btn-wrapper">
                            <el-button
                                class="job-recruiter-btn"
                                round
                                type="primary"
                                :icon="item.isCommunicate ? CircleCheckFilled : CircleCheck"
                                :disabled="item.isCommunicate"
                                @click="onChat(item)"
                            >
                                {{ item.isCommunicate ? '请静候佳音' : '聊一聊' }}
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { request } from '@/server/request';
import { CompanyTypes, JobInfo } from '@/config/types';
import { COMMON_URLS, COMPANY_TYPES } from '@/config';
import CompanyIcon from '@/components/company-icon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { CircleCheckFilled, CircleCheck } from '@element-plus/icons-vue';
import { useRootStore } from '@/store/root-store';

const store = useRootStore();
const router = useRouter();
const route = useRoute();

const jobType = ref<CompanyTypes | ''>('');
const jobOptions = COMPANY_TYPES;

const pageSize = ref(10);
const currentPage = ref(1);
const jobList = ref<JobInfo[]>([]);

const onChat = (item: JobInfo) => {
    if (!store.isLogin) {
        ElMessageBox.alert('您还没有登录，请先登录', '提示', {
            confirmButtonText: 'OK',
            callback: () => {
                store.dialogVisible = true;
            }
        });
    } else {
        item.isCommunicate = true;
        ElMessage.success('已通知招聘者，招聘者会尽快与您联系');
    }
};

const fetchData = () => {
    const params = {
        companyId: '',
        jobType: jobType.value,
        size: pageSize.value,
        page: currentPage.value
    };
    request.getJobList(params).then((res) => {
        const { code, data } = res;
        if (+code === 0 && data) {
            jobList.value = data;
        }
    });
};

watch(jobType, () => {
    fetchData();
});

onMounted(() => {
    jobType.value = typeof route.query.jobType === 'string' ? (route.query.jobType as CompanyTypes) : 'it';
});

const onPageChange = (page: number) => {
    currentPage.value = page;
    fetchData();
};

const onSizeChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
    fetchData();
};

const onJumpJobItem = (job: JobInfo) => {
    router.push({
        name: COMMON_URLS.job,
        query: { id: job.id, companyId: job.company.id, type: job.company.type }
    });
};
</script>

<style lang="scss">
.job-all {
    width: 960px;
    margin: 0 auto;

    .job-all-top {
        margin: 12px 0;

        .job-all-top-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .job-all-item-card {
        margin-bottom: 12px;

        &:hover {
            .job-recruiter-desc {
                display: none;
            }

            .job-recruiter-btn {
                display: inline-flex;
            }
        }
    }

    .job-all-item-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        cursor: pointer;

        .job-all-item-title {
            margin-bottom: 16px;

            .job-all-item-title-name,
            .job-all-item-title-location {
                font-size: 18px;
                font-weight: 700;
                color: #000;
                margin-right: 12px;
            }

            .emergency-tag {
                margin-right: 12px;
            }

            .job-all-item-title-salary {
                font-size: 18px;
                font-weight: 700;
                color: #ff6400;
            }
        }

        .company-tag-wrapper {
            margin-bottom: 16px;

            .job-all-item-tag {
                margin-right: 8px;
            }
        }

        .job-all-item-company-icon {
            margin-right: 8px;
        }

        .job-all-item-company-name {
            margin-right: 16px;
            font-weight: 700;
            font-size: 12px;
            color: #07132b;
        }

        .job-all-item-company-desc {
            margin-right: 16px;
            font-size: 12px;
            color: #999;
        }
    }

    .job-all-item-right {
        width: 80px;
        text-align: center;
        cursor: pointer;

        .job-recruiter-right-bottom {
            margin-top: 12px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .job-recruiter-desc,
    .job-recruiter-btn-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 100%;
    }

    .job-all-item-recruiter-name {
        width: 100%;
        font-size: 14px;
    }

    .job-all-item-recruiter-post {
        width: 100%;
        font-size: 12px;
        color: #999;
    }

    .job-recruiter-btn {
        display: none;
    }
}
</style>
