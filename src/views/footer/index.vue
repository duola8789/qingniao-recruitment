<template>
    <div class="base-footer-wrapper">
        <p class="footer-item">
            <span>京ICP备02012345号-3</span>
            <span>ICP经营许可证：合字D1-1234567</span>
            <span>人力资源服务许可证：12345678901263</span>
            <span>营业执照：京公网安备110123456789号</span>
        </p>
        <p class="footer-item">>2006-2022 qingniao.com All Rights Reserved</p>
    </div>
</template>

<style
    lang="scss"
    scoped
>
.base-footer-wrapper {
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 0 auto;
    height: 100%;
    width: $main-width;
    font-size: 12px;
    color: $main-color-2;
    flex-wrap: wrap;

    .footer-item {
        width: 100%;
        margin-bottom: 8px;

        span {
            margin-right: 8px;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
