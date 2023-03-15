import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd";
import es_ES from 'antd/es/locale/es_ES';
import App from './app';
import { Settings } from "luxon";
import 'dayjs/locale/es'
Settings.defaultLocale = "es";




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <ConfigProvider locale={es_ES}>
            <App />
        </ConfigProvider>
    // </React.StrictMode>
)
