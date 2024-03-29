import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';
import * as path from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify'

import { splitVendorChunkPlugin } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
    cacheDir: 'node_modules/.vite',
    plugins: [
        react(),
        viteCompression(),
        splitVendorChunkPlugin(), 
        ViteMinifyPlugin({}),
    ],
    
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/socket.io': {
                target: 'http://localhost:5010',
                ws: true
            }
        },
        host: true,
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },

        cssCodeSplit: true,
        rollupOptions: { 
            treeshake: true,
            output: {
                entryFileNames: `assets/js/[name]-[hash].js`,
                chunkFileNames: `assets/js/[name]-[hash].js`,
                assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
                //  manualChunks: {
                //     "smart-webcomponents-react/ganttchart": ["smart-webcomponents-react/ganttchart"],
                //     "react-dom": ["react-dom"],
                //     "@fortawesome/fontawesome-svg-core": ["@fortawesome/fontawesome-svg-core"],
                //     "@fortawesome/free-regular-svg-icons": ["@fortawesome/free-regular-svg-icons"],
                //     "@fortawesome/free-solid-svg-icons": ["@fortawesome/free-solid-svg-icons"],
                //     "@fortawesome/react-fontawesome": ["@fortawesome/react-fontawesome"],
                //     "react-icons": ["react-icons"],
                //     "antd": ["antd"],
                //     "antd-img-crop": ["antd-img-crop"],
                //     "axios": ["axios"],
                //     "framer-motion": ["framer-motion"],
                //     "react-quill": ["react-quill"],
                //     "swiper": ["swiper"],
                //     "react-dropzone": ["react-dropzone"],
                //     "react-countup": ["react-countup"],
                //     "react-chartjs-2": ["react-chartjs-2"],
                //     "dompurify": ["dompurify"],
                //     "chart.js": ["chart.js"],
                //     "react-gauge-chart": ["react-gauge-chart"],
                //     "react-simple-star-rating": ["react-simple-star-rating"],
                //     "chartjs-plugin-datalabels": ["chartjs-plugin-datalabels"],
                //     "@dnd-kit/core": ["@dnd-kit/core"],
                //     "@dnd-kit/sortable": ["@dnd-kit/sortable"],
                // },
                compact: true,
                minifyInternalExports: true,

            },
            onwarn(warning, warn) {
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                  return
                }
                warn(warning)
            }
        },
        chunkSizeWarningLimit: 1500,
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
    },
})
