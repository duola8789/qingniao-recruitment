<template>
    <el-avatar
        class="company-icon"
        shape="square"
        :size="size"
        :src="props.icon"
        :style="{ backgroundColor: props.iconColor || 'unset' }"
    >
        {{ props.name[0] }}
    </el-avatar>
</template>

<script
    setup
    lang="ts"
>
const props = defineProps<{
    icon?: string;
    name: string;
    size: number;
    iconColor?: string;
}>();
</script>

<style lang="scss">
.company-icon {
    border: 1px solid #eee;
}
</style>
