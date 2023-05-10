import ReactDOM from 'react-dom/client'
import App from './app';
import 'dayjs/locale/es'
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
        </BrowserRouter>
    // </React.StrictMode>
)
