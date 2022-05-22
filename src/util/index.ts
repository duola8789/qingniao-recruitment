import axios, { AxiosInstance } from 'axios';
import { TypeRequest, TypeInterceptorReqHandler, TypeInterceptorResHandler } from '@/util/types';
import { loadingCounter } from '@/util/loading-counter';
import { Random } from 'mockjs';
import { AVATARS } from '@/config';

// 请求拦截 - 处理 loading
export const loadingRequestHandler: TypeInterceptorReqHandler = {
    // 正常请求添加 loading
    onFulfilled: (config) => {
        loadingCounter.addLoading();
        return config;
    },
    // 异常请求直接拒绝，由响应拦截器统一处理
    onRejected(err) {
        return Promise.reject(err);
    }
};

// 响应拦截 - 处理 loading
export const loadingResponseHandler: TypeInterceptorResHandler = {
    // 成功响应去除 loading
    onFulfilled: (response) => {
        loadingCounter.subLoading();
        return Promise.resolve(response);
    },
    // 异常响应消除 loading
    onRejected(err) {
        // 对于 noGlobalLoading 为 true 的情况，不必处理 loading
        if (!(err.config.extraInfo && err.config.extraInfo.noGlobalLoading)) {
            loadingCounter.subLoading();
        }
        return Promise.reject(err);
    }
};

// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
    timeout: 15000
});

// 请求拦截器，后添加的先执行
// axiosInstance.interceptors.request.use(loadingRequestHandler.onFulfilled, loadingRequestHandler.onRejected);

// 响应拦截器，后添加的后执行
// axiosInstance.interceptors.response.use(loadingResponseHandler.onFulfilled, loadingResponseHandler.onRejected);

// 封装 get 方法
const get: TypeRequest = async (url, params = {}, config) => {
    const response = await axiosInstance.get(url, {
        params,
        ...config
    });
    return response.data;
};

// 封装 post 方法
const post: TypeRequest = async (url, data = {}, config) => {
    const response = await axiosInstance.post(url, data, {
        ...config
    });
    return response.data;
};

// 使用 request 统一调用
export const fetcher = { get, post };

export const getQuery = (url: string, key: string) => {
    const query = url.split('?')[1];
    if (!query) {
        return undefined;
    }

    const map = query.split('&').reduce<Map<string, string>>((total, current) => {
        const [key, value] = current.split('=');
        total.set(key, value);
        return total;
    }, new Map());

    return map.get(key);
};

export const getRandomAvatar = () => Random.pick(AVATARS);
