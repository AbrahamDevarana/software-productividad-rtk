import ReactDOM from 'react-dom/client'
import App from './app';
import 'dayjs/locale/es'
import { BrowserRouter } from 'react-router-dom';
window.Smart.License = "7C743E09-8C47-4BFC-9783-7CF87E92D987";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    // </React.StrictMode>
)
