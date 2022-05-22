<template>
    <div class="about">
        <el-card
            class="intro"
            shadow="never"
        >
            <template #header>
                <p class="about-title">关于本站</p>
            </template>
            <p class="intro-item">
                青鸟招聘网是国内的中高端人才职业发展平台，作为实现企业、猎头和职业经理人三方互动的平台，不同于传统网络招聘形式，改变了传统网络招聘以信息展示为主的广告发布形式，开启以用户体验为主的交易模式。
            </p>
            <p class="intro-item">
                作为职业发展平台，根据用户职业生涯不同阶段的特点，为求职者提供职业辅导等服务。猎聘为企业、猎头、和职业经理人之间沟通，并将与招聘相关的其他角色纳入其中，促进用人方和求职方的互动，建立一个让各方共生的招聘生态。
            </p>
            <p class="intro-item">
                <span class="intro-item-title">为求职者提供服务：</span>

                <br />
                1．高薪职位：每周提供超过10000个高端猎头职位机会；
                <br />
                2．猎头服务：与数万名专业的猎头顾问直接联系，获得高薪职位推荐，获得职业规划建议；
                <br />
                3．隐私保护：创新实名认证系统，16项隐私保护政策全方位保护职业经理人的隐私信息，建立职业经理人与猎头顾问沟通的诚信平台；
                <br />
                4．精准推荐：创新的职位与人才的匹配系统，将职位要求与高端人士的职业期望紧密结合，精准匹配，为招聘方和职业经理人进行最佳的匹配推荐，省时高效；
                <br />
                5．会员尊享：金卡会员享受，猎头第一时间发现，简历搜索排名靠前，转接服务保护隐私，漏接电话短信提醒，与猎头联系不受限，批量发送自荐消息，个性化秘书服务。
                <br />
            </p>
            <p class="intro-item">
                <span class="intro-item-title">为企业提供招聘服务：</span>
                <br />
                1．职位发布：通过精准职位发布、搜索帮助企业找到准确、适合的目标候选人，利用专业的“猎聘通”管理工具，提升招聘组织管理和候选人筛选效率
                ；
                <br />
                2．品牌曝光：通过网站广告和媒体网络覆盖更多优质的候选人，面向各企业、机构的管理决策层及行业内资深专业人员的品牌覆盖
                ；
                <br />
                3．猎头沟通：通过长期的猎头服务经验积累，创立独特的人才精准匹配体系，个性化的候选人意向确认服务，帮助企业拉近与候选人的距离；
                <br />
                4．专业服务：针对个性化的高端人才招聘需求，通过提供综合的招聘流程服务达到招聘目标，降低您的招聘事务成本。
                <br />
            </p>
        </el-card>
        <el-card
            class="intro"
            shadow="never"
        >
            <template #header>
                <p class="about-title">发展历程</p>
            </template>
            <p class="intro-item">2022年3月，架构设计完成</p>
            <p class="intro-item">2022年4月，项目脚手架搭建完成</p>
            <p class="intro-item">2022年5月，V1.0版本开发完成</p>
            <p class="intro-item">2022年6月，V1.0版本正式上线</p>
        </el-card>
        <el-card
            class="intro"
            shadow="never"
        >
            <template #header>
                <p class="about-title">数据说明</p>
            </template>
            <p class="intro-item">
                本站所使用部分数据来自于网络公开数据，部分公司数据系伪造，仅以说明网站功能以及流程。
            </p>
        </el-card>
    </div>
</template>

<script
    setup
    lang="ts"
></script>

<style lang="scss">
.about {
    width: $main-width;
    min-height: calc(100vh - #{$header-footer-height * 2});
    margin: 0 auto;
    color: #999;
    text-align: justify;
    line-height: 24px;
    font-size: 16px;

    .about-title {
        color: #000;
        font-weight: 500;
        font-size: 24px;
    }

    .intro {
        margin: 20px 0;
        padding: 20px 24px;
    }

    .intro-item {
        margin-bottom: 12px;
    }

    .intro-item-title {
        display: inline-block;
        margin-bottom: 4px;
        line-height: 30px;
    }
}
</style>
