import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin(),
        checker({
            typescript: true,
            vls: false,
            eslint: false,
            enableBuild: false
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "./src/styles/mixins" as *;`
            }
        }
    }
});
