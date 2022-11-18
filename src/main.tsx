import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd";
import es_ES from 'antd/es/locale/es_ES';
import moment from 'moment';
// import 'moment/locale/es-MX';
import App from './app';
moment.locale('es-MX');


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <ConfigProvider locale={es_ES}>
            <App />
        </ConfigProvider>
    // </React.StrictMode>
)
