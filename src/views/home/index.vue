<template>
    <div class="home">
        <home-carousel />
        <div class="home-content-wrapper">
            <home-content />
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import HomeCarousel from './components/home-carousel.vue';
import HomeContent from './components/home-content.vue';
</script>

<style lang="scss">
.home {
    .home-content-wrapper {
        width: $main-width;
        margin: 0 auto;
    }
}
</style>
