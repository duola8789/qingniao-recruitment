import { createRouter, createWebHashHistory } from 'vue-router';
import { COMMON_URLS } from '@/config';

export const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [
        { path: COMMON_URLS.root, redirect: COMMON_URLS.home },
        { path: COMMON_URLS.home, component: () => import('@/views/home/index.vue') },
        { path: COMMON_URLS.company, component: () => import('@/views/company/company-all.vue') },
        { path: `${COMMON_URLS.company}/:id`, component: () => import('@/views/company/company-detail.vue') },
        {
            path: COMMON_URLS.job,
            name: COMMON_URLS.job,
            component: () => import('@/views/job/job-detail.vue'),
            beforeEnter: (to, from, next) => {
                if (to.query?.id) {
                    next();
                } else {
                    next(COMMON_URLS.jobs);
                }
            }
        },
        { path: COMMON_URLS.jobs, component: () => import('@/views/job/job-all.vue') },
        { path: COMMON_URLS.resume, component: () => import('@/views/resume/index.vue') },
        { path: COMMON_URLS.resumeOpti, component: () => import('@/views/resume-opti/index.vue') },
        { path: COMMON_URLS.about, component: () => import('@/views/about/index.vue') },
        { path: COMMON_URLS.forbidden, component: () => import('@/components/error-page/index.vue') },
        { path: COMMON_URLS.notFound, component: () => import('@/components/error-page/index.vue') },
        { path: '/:pathMatch(.*)*', component: () => import('@/components/error-page/index.vue') }
    ]
});
