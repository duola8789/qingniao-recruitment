<template>
    <div class="jump-link">
        <p
            v-if="props.text"
            class="card-item-more-text"
        >
            {{ props.text }}
        </p>
        <p
            class="card-item-more-link"
            @click="emits('onJump')"
        >
            <span>{{ props.content || '点击查看' }}</span>
            <el-icon><arrow-right /></el-icon>
        </p>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { ArrowRight } from '@element-plus/icons-vue';

const props = defineProps<{ text?: string; content?: string }>();
const emits = defineEmits<{
    (e: 'onJump'): void;
}>();
</script>

<style lang="scss">
.jump-link {
    cursor: pointer;

    &:hover {
        .card-item-more-link {
            color: $highlight-color-hover;
        }
    }

    .card-item-more-text {
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        color: #000;
        margin-bottom: 8px;
    }

    .card-item-more-link {
        width: 100%;
        font-size: 12px;
        transition: 0.1s linear all;
        color: $highlight-color;
    }
}
</style>
