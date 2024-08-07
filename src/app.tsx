import { Routes, Route, useLocation  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import routes from './router';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { AnimatePresence } from "framer-motion";
import './app.scss'
import './index.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'dayjs/locale/es'
import { Toaster } from 'sonner';


// process.env.NODE_ENV === 'development' ?  styleDevelopment : styleProduction 


dayjs.locale('es')
dayjs.extend(quarterOfYear)
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(duration);


export default function App() {
    const location = useLocation();

    return (
        
        <Provider store={store} >
            <Toaster richColors position='top-left' duration={2000}/>
            <AnimatePresence mode='wait' initial={false}>
                    <Routes location={location} key={location.pathname}>
                        {
                        routes.map((route, index) =>  (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                <route.layout>
                                    <route.component />
                                </route.layout>
                                }
                            />
                        ))
                        }
                    </Routes>
            </AnimatePresence>
        </Provider>
    )
};

