import ReactDOM from 'react-dom/client'
import App from './app';
import 'dayjs/locale/es'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    // </React.StrictMode>
)
