import { Random } from 'mockjs';
import { CompanyInfo, CompanyTypes, JobInfo } from '@/config/types';
import { COMPANY_INFO_MAP, COMPANY_INFOS, COMPANY_TAGS, COMPANY_TYPES } from '@/config';
import { getRandomAvatar } from '@/util';

const JOB_NAMES = [
    '云计算运维工程师',
    'BMS算法工程师',
    '售前解决方案专家',
    '库管员',
    '项目经理',
    '会计',
    '验证工程师',
    '大客户销售经理'
];

const EXPERIENCES = ['无限制', '0-1年', '1-3年', '3-5年', '5年以上'];

const EDUCATIONS = ['无限制', '专科', '本科', '硕士', '博士'];

const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF'];

const JOB_CONTENT_DESC = [
    // 1
    '1、严格按照公司制度，保证物资入库、收货数量的准确性、真实性，坚决杜绝、防备“虚数量入库”现象；\n' +
        '2、严格执行“送货单签收制度”，并在送货单上、入库单上清楚注明使用的楼栋号；\n' +
        '3、严格按照合同、计划、库房管理制度、样板标准等收货；\n' +
        '4、严格按计划、合同、领料单等进行“管理员、班组使用人签字”出库管理；\n' +
        '5、妥善、有序的堆放各类物资并做好相关记录；\n' +
        '6、对物资的领用、借用等情况，做好相关记录，确保有据可查；\n' +
        '7、完成领导交办的其它工作。\n',
    // 2
    '1）熟悉Linux操作系统的和管理与维护，有Linux操作系统性能监控和优化工作经验；\n' +
        '2）熟悉日常服务器的数据备份、迁移、扩容等技术工作，能够解决相应运维工作里面遇到的各种技术问题；\n' +
        '3）熟悉Python/Shell一种语言，能独立编写运维脚本；\n' +
        '4）云平台系统运维，有云计算相关经验（拥有阿里云经验者***）；\n' +
        '5）善于沟通，能承受压力。',
    // 3
    '1. 根据公司发展需要，制定符合公司战略、组织成长和员工个人发展的区域培训计划,协同相关部门，带领团队实施并闭环培训效果;\n' +
        '2.不断参与迭代现有员工发展的体系和流程;\n' +
        '3.主动发掘培训真需求，推荐有效落地方案，开发培训内容和形式满足需求；\n' +
        '4.带领和引导团队向学习型组织演变;\n' +
        '5.发展内部培训师，在区域推动讲师选用育留举措；\n' +
        '6.实现培训知识可沉淀，线上化和闭环。',
    // 4
    '1. 负责新能源客车整车平台化设计及规划工作；\n' +
        '2.负责车型开发平台化符合度评估及把控；\n' +
        '3.负责已开发车型平台化整合策划；\n' +
        '4.负责平台化总布置方案图输出；\n' +
        '5.负责平台化方案策划报告输出；\n' +
        '6.负责平台化相关零部件应用策划评估；\n' +
        '7.负责领导安排的其他工作。',
    // 5
    '1. 负责日常产品报价；\n' +
        '2.半成品以及成品成本维护以及分析；\n' +
        '3.月度存货盘点；\n' +
        '4.存货跌价准备的计提以及分析；'
];

const JOB_REQUIRES = [
    // 1
    '1. 5年以上培训相关工作经验;\n' +
        '2.成熟的规划、组织、沟通和协调能力;\n' +
        '3.有课程开发与编写、公众演讲能力;\n' +
        '4.热爱培训工作，有很强的责任感。',
    // 2
    '1、专科及以上学历；熟悉office相关办公软件。\n' + '2、对待工作认真负责、能吃苦、有上进心、能够接受值夜班。',
    // 3
    '本科及以上学历，熟练运用office软件、CAD、UG（或其他三维设计软件）。\n' + '有客车相关总布置工作经验者优先。',
    // 4
    '1. 全日制大专以及以上学历，财会相关专业，有助理会计师证件更佳；\n' + '2.2-5年财务工作经验\n',
    // 5
    '1. 熟悉MS办公软件；\n' +
        '2.英语CET-4,看读写无障碍，会简单说更佳。\n' +
        '3.对数据敏感，有耐心，有工厂成本管理工作经验优先'
];

const RECRUITER_POSTS = ['行政', '副经理', 'HR', '人事招聘', '招聘负责人', '招聘经理', '项目负责人'];

export const getMockOneJob = (jobId?: string, type?: CompanyTypes, companyId?: string): JobInfo => {
    const company = companyId ? getMockOneCompany(companyId, type) : null;
    return {
        id: jobId || Random.id(),
        name: Random.pick(JOB_NAMES),
        salary: Random.boolean() ? `${Random.integer(3, 5)}-${Random.integer(10, 30)}k` : '面议',
        location: `${Random.region()}-${Random.city()}`,
        tags: [Random.pick(EXPERIENCES), Random.pick(EDUCATIONS)],
        company: company || getMockCompany(Random.boolean(), type),
        isEmergency: Random.boolean(),
        content: {
            desc: Random.pick(JOB_CONTENT_DESC),
            require: Random.pick(JOB_REQUIRES)
        },
        recruiter: {
            name: Random.cname().slice(0) + Random.pick(['先生', '小姐']),
            icon: getRandomAvatar(),
            post: Random.pick(RECRUITER_POSTS),
            onlineTime: Random.pick(['', Random.integer(1, 23)]),
            isAuthentication: Random.boolean()
        }
    };
};

export const getMockJob = (jobId?: string, type?: CompanyTypes, companyId?: string): JobInfo[] => {
    const length = Random.integer(10, 20);
    return Array.from({ length }).map(() => getMockOneJob(jobId, type, companyId));
};

export const mockCompany = (companyId?: string, type?: CompanyTypes) => ({
    name: Random.cword(3, 5) + '有限公司',
    id: companyId || Random.id(),
    desc: Array.from({ length: Random.integer(3, 5) })
        .map(() => Random.cword(3, 5))
        .join(' · '),
    iconColor: Random.pick(COLORS),
    type: type || Random.pick(COMPANY_TYPES),
    slogan: Random.csentence(5, 15),
    evaluateNum: Random.integer(10, 100),
    jobNum: Random.integer(50, 200),
    resumeHandleRete: Random.float(0, 1, 2),
    tags: COMPANY_TAGS.slice(Random.integer(0, 2), Random.integer(3, COMPANY_TAGS.length - 1)),
    detail: Random.cparagraph(50, 100)
});

export const getMockCompany = (useConfig: boolean, type?: CompanyTypes, companyId?: string): CompanyInfo => {
    return useConfig ? Random.pick(COMPANY_INFOS) : mockCompany(companyId, type);
};

export const getMockOneCompany = (companyId: string, jobType?: CompanyTypes): CompanyInfo => {
    const target = jobType ? COMPANY_INFO_MAP[jobType] : COMPANY_INFOS;
    const config = target.find((v) => v.id === companyId);
    if (config) {
        return config;
    }
    return mockCompany(companyId);
};
