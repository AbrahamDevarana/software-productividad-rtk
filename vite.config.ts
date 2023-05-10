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
        },
    },
    build: {
        rollupOptions: { 
            treeshake: true,
            experimentalCacheExpiry: 1000 * 60 * 60 * 24 * 7, // 7 days
            manualChunks: {
                "smart-webcomponents-react/ganttchart": ["smart-webcomponents-react/ganttchart"],
                "react-dom": ["react-dom"],
                "animate.css": ["animate.css"],
                "font-awesome": ["@fortawesome/fontawesome-svg-core", "@fortawesome/free-regular-svg-icons", "@fortawesome/free-solid-svg-icons", "@fortawesome/react-fontawesome"],
                "sweetalert2": ["sweetalert2"],
                "react-icons": ["react-icons"],
                "antd": ["antd"],
                "axios": ["axios"],
                "framer-motion": ["framer-motion"],
                "yup": ["yup"],
                "react-quill": ["react-quill"],
            }
        },
        chunkSizeWarningLimit: 1500
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
    },
})
