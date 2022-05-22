import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface TypeCustomSuccessData<T> {
    code: number;
    message?: string;
    data?: T;
}
// 业务相关响应对象
export interface TypeCustomResponse extends AxiosResponse {
    data: TypeCustomSuccessData<any>;
}

export interface TypeRequest {
    <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<TypeCustomSuccessData<T>>;
}

export interface TypeInterceptorHandler<V> {
    onFulfilled?(value: V): V | Promise<V>;
    onRejected?(err: any): any;
}

export type TypeInterceptorReqHandler = TypeInterceptorHandler<AxiosRequestConfig>;
export type TypeInterceptorResHandler = TypeInterceptorHandler<TypeCustomResponse>;
