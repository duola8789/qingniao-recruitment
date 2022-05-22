<template>
    <el-card
        shadow="always"
        class="home-card"
    >
        <el-tabs
            v-model="jobType"
            class="demo-tabs"
        >
            <el-tab-pane
                v-for="item in tabsConfig"
                :key="item.key"
                :label="item.name"
                :name="item.key"
            >
                <span class="job-type-label">热门公司：</span>
                <span
                    v-for="it in tabCompany"
                    :key="it.id"
                    class="job-type-content"
                    @click="goCompanyPage(it.id)"
                >
                    {{ it.shortName || it.name }}
                </span>
            </el-tab-pane>
        </el-tabs>
        <el-button
            class="refresh-btn"
            circle
            type="primary"
            :icon="Refresh"
            @click="onRefresh"
        />
    </el-card>
    <div
        v-if="jobList.length > 0"
        class="home-job-list"
    >
        <job-item
            v-for="item in jobList"
            :job-info="item"
            :key="item.id"
            :show-company="true"
            @onJump="onJumpJobItem(item)"
        />
        <el-card
            shadow="hover"
            class="job-list-card-more"
        >
            <div class="card-item-more">
                <jump-link
                    :text="`更多${jobTypeName}职位`"
                    @onJump="onJump"
                />
            </div>
        </el-card>
    </div>
    <el-empty
        v-else
        description="暂无数据"
    />
</template>

<script
    setup
    lang="ts"
>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Refresh } from '@element-plus/icons-vue';
import { COMPANY_INFO_MAP, COMPANY_TYPES, COMMON_URLS } from '@/config';
import { CompanyTypes, JobInfo } from '@/config/types';
import { request } from '@/server/request';
import JumpLink from '@/components/jump-link.vue';
import JobItem from '@/components/job-item.vue';

const router = useRouter();

const jobType = ref<CompanyTypes>('it');
const jobTypeName = computed(() => tabsConfig.value.find((v) => v.key === jobType.value)?.name);

const tabsConfig = ref(COMPANY_TYPES);
const tabCompany = computed(() => COMPANY_INFO_MAP[jobType.value]);

const jobMap = ref<Record<CompanyTypes, JobInfo[]>>({
    it: [],
    estate: [],
    finance: []
});
const jobList = computed(() => jobMap.value[jobType.value]);

const goCompanyPage = (id: string) => {
    router.push(`${COMMON_URLS.company}/${id}`);
};

const onRefresh = () => {
    request.getRecommendJobs().then((res) => {
        const { code, data } = res;
        if (+code === 0 && data) {
            jobMap.value = data;
        }
    });
};

const onJump = () => {
    router.push({
        path: COMMON_URLS.jobs,
        query: { jobType: jobType.value }
    });
};

const onJumpJobItem = (job: JobInfo) => {
    router.push({
        name: COMMON_URLS.job,
        query: { id: job.id, companyId: job.company.id, type: job.company.type }
    });
};

onMounted(() => {
    onRefresh();
});
</script>

<style lang="scss">
.home-card {
    position: relative;
    margin: 16px 0;

    .el-tabs__item {
        font-size: 16px;
        padding: 0 24px;
        letter-spacing: 4px;
    }

    .el-tabs__content {
        padding: 4px 0;
        text-align: left;
    }

    .job-type-label {
        font-weight: bold;
        margin-right: 12px;
    }

    .job-type-content {
        margin-right: 12px;
        transition: all linear 0.1s;
        cursor: pointer;

        &:hover {
            color: $highlight-color;
        }
    }

    .refresh-btn {
        position: absolute;
        right: 16px;
        top: 16px;
    }
}

.home-job-list {
    display: flex;
    align-content: center;
    flex-wrap: wrap;

    .job-list-card-more {
        width: 308px;
        height: 206px;
        margin-bottom: 12px;
        cursor: pointer;

        &:hover {
            .card-item-more {
                .card-item-more-link {
                    color: $highlight-color-hover;
                }
            }
        }

        .card-item-more {
            @include flex-center();

            flex-wrap: wrap;
            height: 166px;
        }
    }
}
</style>
