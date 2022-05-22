<template>
    <div class="base-header-wrapper">
        <div class="base-header">
            <div
                class="header-logo"
                @click="goHome"
            >
                <i class="header-logo-icon"></i>
                <span class="header-logo-label">青鸟招聘</span>
            </div>
            <header-menu :bg-color="bgColor" />
            <header-user-center />
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { useRouter } from 'vue-router';
import HeaderMenu from './components/header-menu.vue';
import HeaderUserCenter from './components/header-user-center.vue';

const router = useRouter();

const bgColor = '#212329';

const goHome = function () {
    router.push('/home');
};
</script>

<style
    lang="scss"
    scoped
>
.base-header-wrapper {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background: v-bind('bgColor');
}

.base-header {
    display: flex;
    align-content: center;
    justify-content: space-between;
    height: 100%;
    width: $main-width;
    margin: 0 auto;

    .header-logo {
        @include flex-center();

        cursor: pointer;
        color: $main-color;

        &:hover {
            color: $highlight-color;
        }

        transition: all linear 0.1s;

        .header-logo-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url('@/assets/logo.png') no-repeat center center;
            background-size: contain;
            margin-right: 12px;
        }

        .header-logo-label {
            font-size: 20px;
        }
    }
}
</style>
