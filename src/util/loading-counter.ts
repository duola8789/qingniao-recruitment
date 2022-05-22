/**
 * 全局 loading 计数器
 */
import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

class LoadingCounter {
    private count = 0;
    private loadingInstance!: LoadingInstance;

    getLoadings() {
        return this.count;
    }

    addLoading() {
        this.count++;
        if (this.getLoadings() <= 1) {
            this.loadingInstance = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.85)'
            });
        }
    }

    subLoading() {
        this.count--;
        setTimeout(() => {
            if (this.getLoadings() === 0 && this.loadingInstance) {
                this.loadingInstance.close();
            }
        }, 200);
    }

    clearLoading() {
        this.count = 0;
        this.loadingInstance && this.loadingInstance.close();
    }
}

export const loadingCounter = new LoadingCounter();
