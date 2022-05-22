export type CompanyTypes = 'it' | 'estate' | 'finance';

export type CompanyInfo = {
    id: string;
    name: string;
    shortName?: string;
    desc: string;
    type: CompanyTypes;
    slogan: string;
    icon?: string;
    iconColor?: string;
    evaluateNum: number;
    jobNum: number;
    resumeHandleRete: number;
    detail: string;
    tags: string[];
};

export interface JobInfo {
    id: string;
    name: string;
    salary: string;
    location: string;
    company: CompanyInfo;
    isEmergency?: boolean;
    isCommunicate?: boolean;
    isSubmit?: boolean;
    isCollect?: boolean;
    tags: [string, string];
    content: {
        desc: string;
        require: string;
    };
    recruiter: {
        name: string;
        icon: string;
        post: string;
        onlineTime: string;
        isAuthentication: boolean;
    };
}
