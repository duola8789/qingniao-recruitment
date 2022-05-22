import { fetcher } from '@/util';
import { LoginInfoPayload, LoginInfoRes, PagePayload, RecommendJobsRes } from '@/server/types';
import urls from '@/server/urls';
import { CompanyInfo, CompanyTypes, JobInfo } from '@/config/types';
import { TypeCustomSuccessData } from '@/util/types';
import { useRootStore } from '@/store/root-store';

export const request = {
    login(params: LoginInfoPayload): Promise<TypeCustomSuccessData<LoginInfoRes>> {
        return fetcher.post(urls.login, params);
    },
    async getRecommendJobs(): Promise<TypeCustomSuccessData<RecommendJobsRes>> {
        const result = await fetcher.get<RecommendJobsRes>(urls.recommendJobs);
        if (result.data) {
            const store = useRootStore();
            store.jobs.clear();
            (Object.keys(result.data) as CompanyTypes[]).forEach((key) => {
                if (result.data && result.data[key]) {
                    result.data[key].forEach((v) => {
                        store.jobs.set(v.id, v);
                    });
                }
            });
            console.log(store.jobs);
        }
        return result;
    },
    async getCompanyList(params: PagePayload): Promise<TypeCustomSuccessData<CompanyInfo[]>> {
        const result = await fetcher.get<CompanyInfo[]>(urls.companyList, params);
        if (result.data) {
            const store = useRootStore();
            store.companies.clear();
            result.data.forEach((v) => {
                store.companies.set(v.id, v);
            });
        }
        return result;
    },
    async getCompany(params: {
        companyId: string;
        companyType?: CompanyTypes;
    }): Promise<TypeCustomSuccessData<CompanyInfo>> {
        const store = useRootStore();
        const inStore = store.companies.get(params.companyId);
        if (inStore) {
            return {
                code: 0,
                data: inStore
            };
        }
        return fetcher.get(urls.company, params);
    },
    async getJobList(
        params: { jobType: CompanyTypes | ''; companyId: string | '' } & PagePayload
    ): Promise<TypeCustomSuccessData<JobInfo[]>> {
        const result = await fetcher.get<JobInfo[]>(urls.jobList, params);
        if (result.data) {
            const store = useRootStore();
            store.jobs.clear();
            result.data.forEach((v) => {
                store.jobs.set(v.id, v);
            });
            console.log(store.jobs);
        }
        return result;
    },
    async getJob(params: {
        type?: CompanyTypes;
        companyId?: string;
        jobId: string;
    }): Promise<TypeCustomSuccessData<JobInfo>> {
        const store = useRootStore();
        const inStore = store.jobs.get(params.jobId);
        if (inStore) {
            return {
                code: 0,
                data: inStore
            };
        }
        return fetcher.get(urls.job, params);
    }
};
