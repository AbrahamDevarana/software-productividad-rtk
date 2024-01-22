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
                manualChunks(id: string) {
                    if (id.includes('node_modules')) {
                        const moduleMatch = id.match(/node_modules\/([^/]+)(?:\/|$)/);
                            if (moduleMatch) {
                            const module = moduleMatch[1];
                            return `vendor-${module}`;
                        }
                    }
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
