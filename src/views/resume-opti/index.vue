<template>
    <div class="resume-opti">
        <div
            class="resume-opti-title"
            @click="adDialogVisible = true"
        ></div>
        <div class="resume-opti-intro"></div>
        <el-dialog
            width="700px"
            top="30vh"
            custom-class="resume-dialog"
            v-model="adDialogVisible"
        >
            <img
                class="opti-img"
                :src="adImg"
                alt=""
            />
        </el-dialog>
    </div>
</template>

<script
    setup
    lang="ts"
>
import adImg from '@/assets/resume-opti-contact.png';
import { ref } from 'vue';
const adDialogVisible = ref(true);
</script>

<style lang="scss">
.resume-opti {
    margin: 0 auto;

    .opti-img {
        width: 100%;
    }
    .resume-opti-title {
        width: 100%;
        height: 500px;
        background: url('@/assets/resume-opti.jpg') no-repeat center center;
        cursor: pointer;
    }

    .resume-opti-intro {
        width: 100%;
        height: 500px;
        background: url('@/assets/resume-opti-intro.png') no-repeat center center;
    }
}

.resume-dialog {
    .el-dialog__header {
        line-height: 0;
        height: 0;
        padding-bottom: 0;
        padding-top: 0;
        margin-right: 0;
    }

    .el-dialog__body {
        padding: 0;
        border-radius: 4px;
    }

    .el-dialog__headerbtn {
        font-size: 24px;

        .el-dialog__close {
            color: #fff;
        }
    }
}
</style>
