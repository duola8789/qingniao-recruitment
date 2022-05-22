import { CompanyTypes, JobInfo } from '@/config/types';

export interface LoginInfoPayload {
    username: string;
    password: string;
}

export interface PagePayload {
    size: number;
    page: number;
}

export interface LoginInfoRes {
    username: string;
}

export type RecommendJobsRes = Record<CompanyTypes, JobInfo[]>;

export interface MockPayload {
    body: string;
    type: 'get' | 'post';
    url: string;
}
