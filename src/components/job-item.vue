<template>
    <el-card
        shadow="hover"
        class="job-item-card"
        @click="emits('onJump')"
    >
        <div class="job-item">
            <div class="job-item-top">
                <p class="job-item-title job-item-line">
                    <span class="item-job-name">{{ item.name }}</span>
                    <span class="item-job-salary">{{ item.salary }}</span>
                </p>
                <p class="job-item-location job-item-line">{{ item.location }}</p>
                <p class="job-item-tags job-item-line">
                    <el-tag
                        v-for="tag in item.tags"
                        :key="tag"
                        class="job-item-tag"
                        size="small"
                        type="info"
                    >
                        {{ tag }}
                    </el-tag>
                </p>
            </div>
            <div
                v-if="itemBottomVisible"
                class="sep-line"
            ></div>
            <div
                v-if="itemBottomVisible"
                class="job-item-bottom"
            >
                <company-icon
                    class="job-item-company-icon"
                    :icon="item.company.icon"
                    :name="item.company.name"
                    :icon-color="item.company.iconColor"
                    :size="50"
                />
                <div class="job-item-company-info">
                    <p class="job-item-company-name">{{ item.company.name }}</p>
                    <p class="job-item-company-desc">{{ item.company.desc }}</p>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script
    setup
    lang="ts"
>
import { computed } from 'vue';
import { JobInfo } from '@/config/types';
import CompanyIcon from '@/components/company-icon.vue';

const props = defineProps<{
    jobInfo: JobInfo;
    showCompany?: boolean;
}>();

const emits = defineEmits<{
    (e: 'onJump'): void;
}>();

const item = computed(() => props.jobInfo);
const itemBottomVisible = computed(() => props.showCompany);
</script>

<style lang="scss">
.job-item-card {
    width: 308px;
    margin-right: 16px;
    margin-bottom: 16px;
    cursor: pointer;

    &:nth-child(4n) {
        margin-right: 0;
    }
}
.job-item {
    .job-item-top {
        .job-item-line {
            display: flex;
            align-content: center;
            justify-content: space-between;
            margin-bottom: 12px;
        }

        .job-item-title {
            .item-job-name {
                font-size: 18px;
                font-weight: 500;
                line-height: 25px;
                color: #000;
            }

            .item-job-salary {
                font-size: 18px;
                line-height: 25px;
                font-weight: 500;
                color: #ff6400;
            }
        }

        .job-item-location {
            font-size: 12px;
            font-weight: 400;
            color: #999;
        }

        .job-item-tags {
            justify-content: flex-start;
            margin-bottom: 0;

            .job-item-tag {
                margin-right: 8px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .sep-line {
        height: 1px;
        background: #e4e7ed;
        margin: 16px 0;
    }

    .job-item-bottom {
        display: flex;
        align-content: center;

        .job-item-company-icon {
            font-size: 32px;
            flex-shrink: 0;
            flex-grow: 0;
            border: 1px solid #eee;
        }

        .job-item-company-info {
            text-align: left;
            margin-left: 12px;
            flex: 1 0;
            overflow: hidden;

            .job-item-company-name {
                font-size: 14px;
                font-weight: 500;
                color: #666;
                line-height: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 8px;
            }

            .job-item-company-desc {
                font-size: 12px;
                font-weight: 400;
                color: #999;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 8px;
            }
        }
    }
}
</style>
