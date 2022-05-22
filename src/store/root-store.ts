import { defineStore, _GettersTree } from 'pinia';
import { CompanyInfo, JobInfo } from '@/config/types';

export interface RootStoreStates {
    username: string;
    dialogVisible: boolean;
    jobs: Map<string, JobInfo>;
    companies: Map<string, CompanyInfo>;
}

export interface RootStoreGetters extends _GettersTree<RootStoreStates> {
    isLogin: (state: RootStoreStates) => boolean;
}

export const useRootStore = defineStore<'root', RootStoreStates, RootStoreGetters>('root', {
    state: () => ({
        username: '',
        dialogVisible: false,
        jobs: new Map(),
        companies: new Map()
    }),
    getters: {
        isLogin: (state) => !!state.username
    }
});
