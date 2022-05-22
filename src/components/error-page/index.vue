<template>
    <div class="error-page">
        <div
            class="image-block"
            :class="'image-' + pageType"
        >
            <img
                class="image"
                :src="image"
                alt=""
            />
        </div>
        <div class="text-block">
            <p class="title">{{ pageTitle }}</p>
            <p class="info">如有疑问，请联系管理员</p>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import image403 from './images/403.png';
import image404 from './images/404.png';

const props = defineProps<{ type?: string }>();

const route = useRoute();

const pageType = computed(() => {
    if (props.type) {
        return props.type;
    }
    if (!route) {
        return '404';
    }
    return route.path === '/403' ? '403' : '404';
});

const image = computed(() => {
    return pageType.value === '403' ? image403 : image404;
});

const pageTitle = computed(() => {
    return pageType.value === '404' ? '页面不存在' : '暂无权限访问此页面';
});
</script>

<style lang="scss">
.error-page {
    height: calc(100vh - #{$header-footer-height * 2});
    display: flex;
    justify-content: center;
    align-items: center;

    .text-block {
        display: inline-block;

        .title {
            text-align: left;
            font-size: 32px;
            margin-bottom: 12px;
            font-weight: bold;
            color: #999;
        }

        .info {
            color: #999;
            font-size: 20px;
        }
    }

    .image-block {
        display: inline-block;
        width: 228px;
        height: 170px;
        margin-right: 16px;

        .image {
            width: 100%;
            max-height: 100%;
        }
    }
}
</style>
