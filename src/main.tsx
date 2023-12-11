import React from 'react';
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd";
import es_ES from 'antd/es/locale/es_ES';
import App from './app';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider locale={es_ES}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>
)
