import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';
import * as path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCompression()
    ],
    server: {
    port: 5173,
    proxy: {
        '/api': {
            target: 'http://localhost',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        rollupOptions: {
            manualChunks: {
                "react-dom": ["react-dom"],
                "chart.js": ["chart.js"],
                "animate.css": ["animate.css"],
                "formik": ["formik"],
                // font awesome
                "font-awesome": ["@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/react-fontawesome"],
            }
        },
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
           
           
    },
})
