import { createRoot } from 'react-dom/client'
import { ConfigProvider } from "antd";
import es_ES from 'antd/es/locale/es_ES';
import App from './app';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root') as HTMLElement).render(
    // <StrictMode>
        <ConfigProvider locale={es_ES}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    // </StrictMode>
)
