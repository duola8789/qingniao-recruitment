import Mock, { Random } from 'mockjs';
import urls from '@/server/urls';
import { LoginInfoPayload, LoginInfoRes, MockPayload } from '@/server/types';
import { TypeCustomSuccessData } from '@/util/types';
import { CompanyInfo, CompanyTypes, JobInfo } from '@/config/types';
import { getMockCompany, getMockJob, getMockOneCompany, getMockOneJob } from '@/server/mocker';
import { getQuery } from '@/util';
import { COMPANY_INFO_MAP, COMPANY_INFOS } from '@/config';

// Mock.setup({
//     timeout: 1000
// });

Mock.mock(urls.login, function ({ body }: MockPayload): TypeCustomSuccessData<LoginInfoRes> {
    const bodyPayload: LoginInfoPayload = JSON.parse(body);
    if (bodyPayload.username === 'admin' && bodyPayload.password === '123456') {
        return {
            code: 0,
            data: {
                username: 'admin'
            }
        };
    }
    return {
        code: 1,
        message: '用户名或密码错误'
    };
});

Mock.mock(urls.recommendJobs, function (): TypeCustomSuccessData<Record<CompanyTypes, JobInfo[]>> {
    return {
        code: 0,
        data: {
            it: getMockJob(undefined, 'it'),
            estate: getMockJob(undefined, 'estate'),
            finance: getMockJob(undefined, 'finance')
        }
    };
});

Mock.mock(RegExp(urls.companyList + '*'), function ({ url }: MockPayload): TypeCustomSuccessData<CompanyInfo[]> {
    const page = getQuery(url, 'page') || 1;
    const size = getQuery(url, 'size') || 10;
    return {
        code: 0,
        data: Array.from({ length: +size }).map((_v, index) => {
            if (+page === 1) {
                return COMPANY_INFOS[index] || getMockCompany(false);
            }
            return getMockCompany(false);
        })
    };
});

Mock.mock(RegExp(urls.company + '*'), function ({ url }: MockPayload): TypeCustomSuccessData<CompanyInfo> {
    const companyId = getQuery(url, 'companyId') || '';
    const companyType = (getQuery(url, 'companyType') as CompanyTypes) || undefined;
    return {
        code: 0,
        data: getMockOneCompany(companyId, companyType)
    };
});

Mock.mock(RegExp(urls.jobList + '*'), function ({ url }: MockPayload): TypeCustomSuccessData<JobInfo[]> {
    const jobType = (getQuery(url, 'jobType') as CompanyTypes) || undefined;
    const companyId = (getQuery(url, 'companyId') as string) || undefined;
    const page = getQuery(url, 'page') || 1;
    const size = getQuery(url, 'size') || 10;
    return {
        code: 0,
        data: Array.from({ length: +size }).map(() => {
            if (+page === 1) {
                return getMockOneJob(
                    undefined,
                    jobType,
                    companyId || (jobType ? Random.pick(COMPANY_INFO_MAP[jobType]).id : Random.pick(COMPANY_INFOS).id)
                );
            }
            return getMockOneJob(undefined, jobType, companyId);
        })
    };
});

Mock.mock(RegExp(urls.job + '*'), function ({ url }: MockPayload): TypeCustomSuccessData<JobInfo> {
    const jobId = (getQuery(url, 'jobId') as string) || undefined;
    const jobType = (getQuery(url, 'jobType') as CompanyTypes) || undefined;
    const companyId = (getQuery(url, 'companyId') as CompanyTypes) || undefined;
    return {
        code: 0,
        data: getMockOneJob(jobId, jobType, companyId)
    };
});

Mock.mock(urls.recommendJobs, function (): TypeCustomSuccessData<Record<CompanyTypes, JobInfo[]>> {
    return {
        code: 0,
        data: {
            it: getMockJob(undefined, 'it'),
            estate: getMockJob(undefined, 'estate'),
            finance: getMockJob(undefined, 'finance')
        }
    };
});
