<template>
    <div class="company-all">
        <el-card
            class="company-card-page"
            shadow="never"
        >
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
        </el-card>
        <el-card
            class="company-card"
            shadow="never"
            v-for="item in companyList"
            :key="item.id"
        >
            <div class="company-card-content">
                <el-avatar
                    class="company-card-avatar"
                    shape="square"
                    :size="60"
                    :src="item.icon"
                    :style="{ backgroundColor: item.iconColor || 'unset' }"
                >
                    {{ item.name[0] }}
                </el-avatar>
                <div class="company-card-info">
                    <p
                        class="company-card-info-name"
                        @click="goCompanyPage(item.id)"
                    >
                        {{ item.name }}
                    </p>
                    <p class="company-card-info-desc">{{ item.desc }}</p>
                </div>
                <div class="company-card-num">
                    <p class="company-card-num-item">
                        <span class="num-label">面试评价</span>
                        <span class="num-value">{{ item.evaluateNum }}</span>
                    </p>
                    <p class="company-card-num-item">
                        <span class="num-label">在招职位</span>
                        <span class="num-value">{{ item.jobNum }}</span>
                    </p>
                    <p class="company-card-num-item">
                        <span class="num-label">简历处理率</span>
                        <span class="num-value">{{ `${item.resumeHandleRete * 100}%` }}</span>
                    </p>
                </div>
                <el-button
                    type="primary"
                    size="large"
                    round
                    @click="goCompanyPage(item.id)"
                >
                    进入公司主页
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { request } from '@/server/request';
import { CompanyInfo } from '@/config/types';
import { COMMON_URLS } from '@/config';

const router = useRouter();
const pageSize = ref(10);
const currentPage = ref(1);
const companyList = ref<CompanyInfo[]>([]);

const fetchData = () => {
    const size = pageSize.value;
    const page = currentPage.value;
    request.getCompanyList({ size, page }).then((res) => {
        const { code, data } = res;
        if (+code === 0 && data) {
            companyList.value = data;
        }
    });
};

onMounted(() => {
    fetchData();
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

const goCompanyPage = (id: string) => {
    router.push(`${COMMON_URLS.company}/${id}`);
};
</script>

<style lang="scss">
.company-all {
    width: 960px;
    margin: 0 auto;

    .company-card-page {
        margin: 12px 0;
    }

    .company-card {
        margin: 12px 0;

        .company-card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .company-card-avatar {
            font-size: 32px;
            flex-shrink: 0;
            flex-grow: 0;
            border: 1px solid #eee;
            margin-right: 20px;
        }

        .company-card-info {
            flex: 4;
            text-align: left;

            .company-card-info-name {
                font-size: 18px;
                font-weight: 700;
                color: #000;
                margin-bottom: 12px;
                cursor: pointer;
            }

            .company-card-info-desc {
                color: #999;
                font-size: 12px;
            }
        }

        .company-card-num {
            flex: 1;
            font-size: 14px;
            text-align: left;

            .company-card-num-item {
                margin-bottom: 4px;
                color: #999;

                &:last-child {
                    margin-bottom: 0;
                }
            }
            .num-label {
                margin-right: 4px;
            }

            .num-value {
                color: $highlight-color;
            }
        }
    }
}
</style>
