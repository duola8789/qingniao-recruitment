<template>
    <div class="header-menu">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :default-active="route.path"
            :background-color="props.bgColor"
            active-text-color="#5aa7dc"
            text-color="#fff"
            :router="true"
        >
            <el-menu-item
                v-for="it in menus"
                :key="it.path"
                :index="it.path"
            >
                <span class="menu-text">{{ it.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { ref } from 'vue';
import { MENU_CONFIG } from '@/config';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps<{ bgColor: string }>();

const menus = ref(MENU_CONFIG);
</script>

<style
    lang="scss"
    scoped
>
.header-menu {
    width: 50%;
    margin: 0 36px;

    .el-menu {
        height: $header-footer-height;
        border: none;

        .el-menu-item {
            font-size: 16px;
            font-weight: 500;
        }

        .menu-text {
            letter-spacing: 4px;
        }
    }
}
</style>
