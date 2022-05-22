import { CompanyTypes, CompanyInfo } from '@/config/types';
import iconIt1 from '@/assets/company/it-1/logo.png';
import iconIt2 from '@/assets/company/it-2/logo.png';
import iconIt3 from '@/assets/company/it-3/logo.png';
import iconIt4 from '@/assets/company/it-4/logo.png';
import iconEs1 from '@/assets/company/estate-1/logo.png';
import iconEs2 from '@/assets/company/estate-2/logo.png';
import iconFi1 from '@/assets/company/finance-1/logo.png';
import iconFi2 from '@/assets/company/finance-2/logo.png';

import defaultAvatar from '@/assets/avatar/default.png';
import avatar1 from '@/assets/avatar/1.jpeg';
import avatar2 from '@/assets/avatar/2.jpeg';
import avatar3 from '@/assets/avatar/3.jpeg';
import avatar4 from '@/assets/avatar/4.jpeg';
import avatar5 from '@/assets/avatar/5.jpeg';
import avatar6 from '@/assets/avatar/6.jpeg';
import avatar7 from '@/assets/avatar/7.jpeg';
import avatar8 from '@/assets/avatar/8.jpeg';
import avatar9 from '@/assets/avatar/9.jpeg';
import avatar10 from '@/assets/avatar/10.jpeg';

export const AVATARS = [
    defaultAvatar,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10
];

// 公共路由 Path 常量
export const COMMON_URLS = {
    root: '/',
    home: '/home',
    job: '/job',
    jobs: '/jobs',
    company: '/company',
    resume: '/resume',
    resumeOpti: '/resume-optimize',
    about: '/about',
    forbidden: '/403',
    notFound: '/404'
};

export const MENU_CONFIG = [
    { path: COMMON_URLS.home, name: '首页' },
    { path: COMMON_URLS.jobs, name: '职位' },
    { path: COMMON_URLS.company, name: '公司' },
    { path: COMMON_URLS.resume, name: '我的简历' },
    { path: COMMON_URLS.resumeOpti, name: '简历优化' },
    { path: COMMON_URLS.about, name: '关于' }
];

export const STORAGE_KEY = {
    username: '__username__'
};

export const COMPANY_TYPES = [
    { key: 'it', name: 'IT互联网' },
    { key: 'estate', name: '房地产' },
    { key: 'finance', name: '金融' }
];

export const COMPANY_TAGS = [
    '中国企业500强',
    '世界500强',
    '制造业500强',
    '财富中国500强',
    '弹性工作',
    '年度旅游',
    '领导好',
    '扁平管理',
    '团队聚餐',
    '节日礼物'
];

export const COMPANY_INFO_MAP: Record<CompanyTypes, CompanyInfo[]> = {
    it: [
        {
            id: 'it-1',
            name: '小米科技集团',
            shortName: '小米',
            desc: '智能硬件/电商平台 · 10000人以上 · 港股上市',
            type: 'it',
            slogan: '有些工作只是工作，有些工作却是你人生的使命， 那些工作会让你满怀热情、全心投入你的智慧和才能',
            icon: iconIt1,
            evaluateNum: 172,
            jobNum: 310,
            resumeHandleRete: 0.12,
            tags: COMPANY_TAGS,
            detail: '小米集团正式成立于2010年4月，是一家以手机、智能硬件和 IoT 平台为核心的互联网公司。小米的使命是，始终坚持做“感动人心、价格厚道”的好产品，让全球每个人都能享受科技带来的美好生活。2019年美国《财富》杂志发布世界500强排行榜，小米集团成为最快上榜的中国互联网以及科技企业，在上榜的全球互联网企业中排名第7。'
        },
        {
            id: 'it-2',
            name: '深圳市腾讯计算机系统有限公司',
            shortName: '腾讯',
            desc: '互联网/电商/社交/游戏 · 10000人以上 · 已上市',
            type: 'it',
            slogan: '用户为本，科技向善',
            icon: iconIt2,
            evaluateNum: 113,
            jobNum: 210,
            resumeHandleRete: 0.32,
            tags: COMPANY_TAGS,
            detail: '腾讯公司成立于1998年11月，是目前中国最大的互联网综合服务提供商之一，也是中国服务用户最多的互联网企业之一。成立十年多以来，腾讯一直秉承“一切以用户价值为依归”的经营理念，始终处于稳健发展的状态。'
        },
        {
            id: 'it-3',
            name: '百度在线科技有限公司',
            shortName: '百度',
            desc: '互联网/电商 · IT服务 · 计算机软件 · 10000人以上 ·  美股上市',
            type: 'it',
            slogan: '用科技让复杂的世界更简单',
            icon: iconIt3,
            evaluateNum: 1172,
            jobNum: 330,
            resumeHandleRete: 0.51,
            tags: COMPANY_TAGS,
            detail:
                '百度，全球最大的中文搜索引擎、最大的中文网站。2000年1月创立于北京中关村。\n' +
                '    百度拥有数千名研发工程师，这是中国乃至全球最为优秀的技术团队，这支队伍掌握着世界上最为先进的搜索引擎技术，使百度成为中国掌握世界尖端科学核心技术的中国高科技企业，也使中国成为美国、俄罗斯、和韩国之外，全球仅有的4个拥有搜索引擎核心技术的国家之一。\n' +
                '    从创立之初，百度便将“让人们最便捷地获取信息，找到所求”作为自己的使命，成立以来，公司秉承“以用户为导向”的理念，不断坚持技术创新，致力于为用户提供“简单，可依赖”的互联网搜索产品及服务，其中包括：以网络搜索为主的功能性搜索，以贴吧为主的社区搜索，针对各区域、行业所需的垂直搜索，Mp3搜索，以及门户频道、IM等，全面覆盖了中文网络世界所有的搜索需求，根据第三方权威数据，百度在中国的搜索份额超过80%。'
        },
        {
            id: 'it-4',
            name: '北京字节跳动科技有限公司',
            shortName: '字节跳动',
            desc: '互联网/电商 · 10000人以上',
            type: 'it',
            slogan: '激发创造，丰富生活',
            icon: iconIt4,
            evaluateNum: 158,
            jobNum: 123,
            resumeHandleRete: 0.72,
            tags: COMPANY_TAGS,
            detail:
                '字节跳动成立于2012年3月，公司使命为“Inspire Creativity, Enrich Life（激发创造，丰富生活）”。公司业务覆盖150个国家和地区、75个语种，拥有超过6万名员工。\n' +
                '字节跳动在全球推出了多款有影响力的产品，包括今日头条、抖音、西瓜视频、飞书、TikTok、Lark、Helo等。截至2020年1月，字节跳动旗下产品全球月活跃用户数超过15亿。'
        }
    ],
    estate: [
        {
            id: 'estate-1',
            name: '绿地控股集团股份有限公司',
            shortName: '绿地集团',
            desc: '房地产/建筑 · 500-999人',
            type: 'estate',
            slogan: '绿地，让生活更美好',
            icon: iconEs1,
            evaluateNum: 66,
            jobNum: 85,
            resumeHandleRete: 0.92,
            tags: COMPANY_TAGS,
            detail: '绿地控股集团股份有限公司（简称为“绿地”或“绿地集团”）是一家全球经营的多元化企业集团，创立于 1992 年 7 月 18 日，总部设立于中国上海，在中国 A股实现整体上市（600606.SH），并控股多家香港上市公司。'
        },
        {
            id: 'estate-2',
            name: '碧桂园控股有限公司',
            shortName: '碧桂园',
            desc: '房地产/建筑 · 10000人以上',
            type: 'estate',
            slogan: '碧桂园，给您一个五星的家',
            icon: iconEs2,
            evaluateNum: 23,
            jobNum: 11,
            resumeHandleRete: 0.91,
            tags: COMPANY_TAGS,
            detail:
                '碧桂园：中国房地产十强 \n' +
                '碧桂园创建于1992年；2006年，获中国工商行政管理局认定为“中国驰名商标”；2007年，在香港联交所主板上市。\n' +
                '作为国内著名的综合性企业集团，碧桂园以房地产为主营业务，已在全国开发了逾百个高品质地产项目；同时，涵盖酒店、教育、休闲娱乐等多个行业。\n' +
                '碧桂园及其创始人热心于社会公益慈善事业，历年捐赠约17亿元。'
        }
    ],
    finance: [
        {
            id: 'finance-1',
            name: '香港上海汇丰银行有限公司',
            shortName: '汇丰银行',
            desc: '银行 · 2000-5000人',
            type: 'finance',
            slogan: 'world finance, local wisdom',
            icon: iconFi1,
            evaluateNum: 64,
            jobNum: 85,
            resumeHandleRete: 0.74,
            tags: COMPANY_TAGS,
            detail: '汇丰是具有全球规模的金融服务机构。我们通过三大环球业务：财富管理及个人银行、工商金融、环球银行及资本市场，为超过4,000万名客户提供服务。我们的业务网络遍及欧洲、亚洲、中东及非洲、北美和拉美，覆盖全球64个国家和地区。'
        },
        {
            id: 'finance-2',
            name: '招商银行股份有限公司 ',
            shortName: '招商银行',
            desc: '房地产/建筑 · 10000人以上',
            type: 'finance',
            slogan: '一亿人的财富生活',
            icon: iconFi2,
            evaluateNum: 69,
            jobNum: 210,
            resumeHandleRete: 0.32,
            tags: COMPANY_TAGS,
            detail:
                '招商银行1987 年在深圳蛇口成立，是中国境内第一家完全由企业法人持股的股份制商业银行，也是国家从体制外推动银行业改革的第一家试点银行。\n' +
                '截至2016年末，招商银行在中国大陆的130 余个城市设有136家分行及1672家支行，1 家分行级专营机构（信用卡中心），1 家代表处，3495家自助银行，在香港、纽约、新加坡、卢森堡、伦敦设有分行，在纽约、伦敦、台北设有代表处。此外，招商银行还在境内全资拥有招银金融租赁有限公司，控股招商基金管理有限公司，持有招商信诺人寿保险有限公司50%股权、招联消费金融公司50%股权；在香港全资控股永隆银行有限公司和招银国际金融有限公司。招商银行已成为一家拥有商业银行、金融租赁、基金管理、人寿保险、境外投行等金融牌照的银行集团。'
        }
    ]
};

export const COMPANY_INFOS = (Object.keys(COMPANY_INFO_MAP) as CompanyTypes[]).reduce<CompanyInfo[]>(
    (total, current) => {
        total.push(...COMPANY_INFO_MAP[current]);
        return total;
    },
    []
);
