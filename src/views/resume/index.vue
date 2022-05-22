<template>
    <div class="resume">
        <el-card
            class="resume-handler"
            shadow="never"
        >
            <el-button
                type="primary"
                :icon="View"
                @click="controlViewer(true)"
            >
                预览
            </el-button>
            <el-button
                :icon="Edit"
                @click="onUnSupport"
            >
                编辑
            </el-button>
            <el-button
                :icon="Upload"
                @click="onUnSupport"
            >
                重新上传
            </el-button>
            <el-button
                type="primary"
                :icon="Share"
                @click="onJumpResumeOptimize"
            >
                简历优化
            </el-button>
            <el-button
                type="primary"
                :icon="Share"
                @click="onJumpJob"
            >
                投递
            </el-button>
            <el-button
                :icon="Delete"
                @click="onUnSupport"
            >
                投递记录
            </el-button>
        </el-card>
        <el-image
            class="resume-image"
            :src="resumeImg"
            :hide-on-click-modal="true"
            :preview-src-list="[resumeImg]"
        />
        <el-image-viewer
            v-if="viewVisible"
            :urlList="[resumeImg]"
            :hide-on-click-modal="true"
            :onClose="() => controlViewer(false)"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
import resumeImg from '@/assets/resume.jpeg';
import { Delete, Edit, Share, Upload, View } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { COMMON_URLS } from '@/config';

const router = useRouter();
const viewVisible = ref(false);

const controlViewer = (visible: boolean) => {
    viewVisible.value = visible;
};

const onUnSupport = () => {
    ElMessage.warning('功能开发中，敬请期待');
};

const onJumpJob = () => {
    router.push(COMMON_URLS.jobs);
};

const onJumpResumeOptimize = () => {
    router.push(COMMON_URLS.resumeOpti);
};
</script>

<style lang="scss">
.resume {
    width: $main-width;
    margin: 0 auto;

    .resume-handler {
        text-align: left;
        margin: 12px 0;
    }
}
</style>
