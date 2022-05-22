<template>
    <div class="header-user-center">
        <el-dropdown
            v-if="store.isLogin"
            trigger="click"
            @command="onCommand"
        >
            <div class="avatar-wrapper">
                <el-avatar
                    :src="avatar"
                    shape="square"
                    :size="32"
                />
                <span class="username-label">你好，{{ store.username }}</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="jumpResume">我的简历</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span
            v-else
            class="login-label"
            @click="dialogVisible = true"
        >
            登录
        </span>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="登录"
        width="30%"
        custom-class="user-center-dialog"
    >
        <el-form
            ref="ruleFormRef"
            :model="formData"
            label-width="80px"
            :rules="rules"
        >
            <el-form-item
                label="用户名"
                prop="username"
            >
                <el-input
                    v-model="formData.username"
                    :prefix-icon="User"
                />
            </el-form-item>
            <el-form-item
                label="密码"
                prop="password"
            >
                <el-input
                    v-model="formData.password"
                    show-password
                    :prefix-icon="Key"
                />
            </el-form-item>
        </el-form>
        <p class="user-center-tip">默认用户名 admin，密码 123456</p>
        <template #footer>
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button
                type="primary"
                @click="onLogin(ruleFormRef)"
            >
                Confirm
            </el-button>
        </template>
    </el-dialog>
</template>

<script
    setup
    lang="ts"
>
import { useRootStore } from '@/store/root-store';
import { computed, reactive, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { User, Key } from '@element-plus/icons-vue';
import { request } from '@/server/request';
import { COMMON_URLS, STORAGE_KEY } from '@/config';
import { useRouter } from 'vue-router';
import { getRandomAvatar } from '@/util';

const store = useRootStore();
const router = useRouter();

const dialogVisible = computed({
    get: () => store.dialogVisible,
    set: (val: boolean) => (store.dialogVisible = val)
});

const avatar = getRandomAvatar();

const formData = reactive({
    username: '',
    password: ''
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'change'
        }
    ]
});

watch(dialogVisible, (visible) => {
    if (!visible) {
        if (ruleFormRef.value) {
            ruleFormRef.value?.resetFields();
        }
    }
});

const onCommand = (command: string) => {
    if (command === 'logout') {
        store.username = '';
        window.localStorage.removeItem(STORAGE_KEY.username);
    }
    if (command === 'jumpResume') {
        router.push(COMMON_URLS.resume);
    }
};

const onLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
    formEl.validate((valid) => {
        if (valid) {
            request.login(formData).then((v) => {
                if (+v.code === 0 && v.data) {
                    store.username = v.data.username;
                    window.localStorage.setItem(STORAGE_KEY.username, store.username);
                    ElMessage.success('登录成功');
                    dialogVisible.value = false;
                } else {
                    ElMessage.error({
                        message: v.message || '用户名或密码错误',
                        duration: 1500
                    });
                }
            });
        }
    });
};
</script>

<style
    lang="scss"
    scoped
>
.header-user-center {
    @include flex-center();

    .user-center-dropdown {
        font-size: 14px;
    }

    .login-label {
        cursor: pointer;
        transition: all linear 0.1s;

        &:hover {
            color: $highlight-color;
        }
    }
    .avatar-wrapper {
        cursor: pointer;
        transition: all linear 0.1s;

        &:hover {
            .username-label {
                color: $highlight-color;
            }
        }
    }

    .username-label {
        font-weight: 500;
        font-size: 14px;
        color: $main-color;
        margin-left: 8px;
    }
}
</style>

<style lang="scss">
.user-center-dialog {
    text-align: left;

    .user-center-tip {
        color: #aaa;
        font-style: italic;
        margin: 20px 0 0 80px;
    }
}
</style>
