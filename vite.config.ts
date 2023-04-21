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
        sourcemap: false,
        rollupOptions: {
            maxParallelFileOps: 2,
            cache: false,            
            manualChunks: {
                "react-dom": ["react-dom"],
                "animate.css": ["animate.css"],
                "formik": ["formik"],
                "font-awesome-svg-core": ["@fortawesome/fontawesome-svg-core"],
                "font-free-regular-svg-icons": ["@fortawesome/free-regular-svg-icons"],
                "font-free-solid-svg-icons": ["@fortawesome/free-solid-svg-icons"],
                "react-fontawesome": ["@fortawesome/react-fontawesome"],
                "sweetalert2": ["sweetalert2"],
                "react-icons": ["react-icons"],
                "antd": ["antd"],
                "axios": ["axios"],
                "framer-motion": ["framer-motion"],
                "yup": ["yup"],
                "ckeditor": ["@ckeditor/ckeditor5-react", "@ckeditor/ckeditor5-build-classic"],
                "@fullcalendar/core": ["@fullcalendar/core"],
                "@fullcalendar/daygrid" : ["@fullcalendar/daygrid"],
                "@fullcalendar/interaction": ["@fullcalendar/interaction"],
                "@fullcalendar/react": ["@fullcalendar/react"],
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
