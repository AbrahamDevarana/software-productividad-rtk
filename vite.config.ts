import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';
import * as path from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import {VitePWA} from 'vite-plugin-pwa'

import { splitVendorChunkPlugin } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
    cacheDir: 'node_modules/.vite',
    plugins: [
        react(),
        viteCompression(),
        // splitVendorChunkPlugin(), 
        ViteMinifyPlugin({}),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                // api y login no se cachean
                navigateFallbackDenylist: [ new RegExp('^/api'), new RegExp('^/login')],
                runtimeCaching: [
                    {
                        urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            }
                        }
                    },
                ]
            },
            manifest: {
                name: 'DevaranApp',
                short_name: 'DevaranApp',
                theme_color: '#fff',
                icons: [
                    {
                        src: '/img/favicon/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/img/favicon/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
            }
        })
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
                 manualChunks: {
                    "smart-webcomponents-react/ganttchart": ["smart-webcomponents-react/ganttchart"],
                    "react-dom": ["react-dom"],
                    "@fortawesome/fontawesome-svg-core": ["@fortawesome/fontawesome-svg-core"],
                    "@fortawesome/free-regular-svg-icons": ["@fortawesome/free-regular-svg-icons"],
                    "@fortawesome/free-solid-svg-icons": ["@fortawesome/free-solid-svg-icons"],
                    "@fortawesome/react-fontawesome": ["@fortawesome/react-fontawesome"],
                    "react-icons": ["react-icons"],
                    "antd": ["antd"],
                    "antd-img-crop": ["antd-img-crop"],
                    "axios": ["axios"],
                    "framer-motion": ["framer-motion"],
                    "react-quill": ["react-quill"],
                    "swiper": ["swiper"],
                    "react-dropzone": ["react-dropzone"],
                    "react-countup": ["react-countup"],
                    "react-chartjs-2": ["react-chartjs-2"],
                    "dompurify": ["dompurify"],
                    "chart.js": ["chart.js"],
                    "react-gauge-chart": ["react-gauge-chart"],
                    "react-simple-star-rating": ["react-simple-star-rating"],
                    "chartjs-plugin-datalabels": ["chartjs-plugin-datalabels"],
                    "@dnd-kit/core": ["@dnd-kit/core"],
                    "@dnd-kit/sortable": ["@dnd-kit/sortable"],
                    "@tiptap": ['@tiptap/extension-color', '@tiptap/extension-image', '@tiptap/extension-link', '@tiptap/extension-text-align', '@tiptap/extension-text-style', '@tiptap/extension-underline', '@tiptap/react', '@tiptap/starter-kit']
                },
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
