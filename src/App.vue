<template>
    <div class="header-wrapper">
        <common-header />
    </div>
    <div class="main-wrapper">
        <router-view />
    </div>
    <div class="footer-wrapper">
        <common-footer />
    </div>
</template>

<script
    setup
    lang="ts"
>
import CommonHeader from '@/views/header/index.vue';
import CommonFooter from '@/views/footer/index.vue';
import { onMounted } from 'vue';
import { STORAGE_KEY } from '@/config';
import { useRootStore } from '@/store/root-store';

const store = useRootStore();

onMounted(() => {
    const username = window.localStorage.getItem(STORAGE_KEY.username);
    if (username) {
        store.username = username;
    }
});
</script>

<style lang="scss">
html,
body {
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin: 0 auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $main-color;
    min-width: $main-width;
}

.header-wrapper,
.footer-wrapper {
    height: $header-footer-height;
    flex-grow: 0;
    flex-shrink: 0;
    background: #fff;
}

.footer-wrapper {
    border-top: 1px solid #e4e7ed;
}

.main-wrapper {
    color: $main-color-2;
    flex: 1;
    background-color: #faf9f9;
}
</style>
