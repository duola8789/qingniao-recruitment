<template>
    <el-carousel
        :interval="5000"
        type="card"
        height="350"
        class="home-carousel"
    >
        <el-carousel-item
            v-for="item in pics"
            :key="item.path"
            @click="onJump(item.path)"
        >
            <img
                :src="item.src"
                alt=""
                class="home-carousel-img"
            />
        </el-carousel-item>
    </el-carousel>
</template>

<script
    setup
    lang="ts"
>
import pic1 from '@/assets/carousel/1.png';
import pic2 from '@/assets/carousel/2.jpg';
import pic3 from '@/assets/carousel/3.jpg';
import { ref } from 'vue';

const pics = ref([
    { src: pic1, path: 'https://vip.liepin.com/13185177/' },
    { src: pic2, path: 'https://zhuanti.lagou.com/page40.html?utm_source=page40' },
    { src: pic3, path: 'https://edu.lagou.com/growth/sem/pm__0basic.html' }
]);

const onJump = (path: string) => {
    window.open(path);
};
</script>

<style lang="scss">
.home-carousel {
    padding: 20px 0 8px;
    background: rgba(154, 171, 195, 0.5);

    .el-carousel__mask {
        opacity: 0;
    }

    .el-carousel__indicators--outside button {
        background-color: #636b79;
    }
}

.home-carousel-img {
    width: auto;
    height: 100%;
}
</style>
