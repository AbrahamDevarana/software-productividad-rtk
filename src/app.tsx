import { Routes, Route, useLocation  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import routes from './router';
import './app.scss'
import '@fortawesome/fontawesome-svg-core/styles.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
dayjs.extend(quarterOfYear)
dayjs.extend(customParseFormat)

import { AnimatePresence } from "framer-motion";


export default function App() {
    const location = useLocation();
    
    return (
        
        <Provider store={store} >
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

