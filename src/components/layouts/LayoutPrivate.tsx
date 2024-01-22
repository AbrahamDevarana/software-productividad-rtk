
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Navbar } from "../Menu/Navbar";
import { Sidebar } from "../Menu/Sidebar";
import { SecondNav } from '../Menu/SecondNav';
import { useSocket } from "@/hooks/useSocket";
import { optionalContent } from "@/interfaces";
import { motion } from 'framer-motion';
import { useAuth } from "@/hooks/useAuth";
import { getPermisosThunk } from "@/redux/features/permisos/PermisosThunk";

interface LayoutAppProps{
    children: React.ReactNode | React.ReactNode[];
}

export default function LayoutApp({ children }: LayoutAppProps) {
   
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useAuth()

    const { isLoading, userAuth, isAuthenticated  } = useAppSelector(state => state.auth);
    const [ settingVisible, setSettingVisible ] = useState<boolean>(false);
    const [ optBarVisible, setOptBarVisible ] = useState<boolean>(false);
    const [ navbarClass, setNavbarClass ] = useState<string>('');
    const [ optionalContent, setOptionalContent ] = useState<optionalContent>('admin')

    useEffect(() => {
        if(!isLoading && userAuth.id === ''){
            navigate("/login", { state: { from: window.location.pathname } });
        }
    }, [isLoading, userAuth])

    useSocket(import.meta.env.VITE_SERVER_URL)
    
    useEffect(() => {
        if(isAuthenticated){
            dispatch(getPermisosThunk())
        }
    }, [isAuthenticated])            
    
	const onClose = () => {
		setSettingVisible(false);
	};

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if(e.currentTarget.scrollTop > 30){
            setNavbarClass('bg-opacity-25 bg-white shadow');
        }else{
            setNavbarClass('bg-transparent');
        }
    }

    // TODO: Obtener Permisos de la APP y guardarlos en el store
    // TODO: Pantalla de carga en lo que se obtienen los permisos con un isLoadingPermisos

    if (isLoading && userAuth?.id === '') return <> </>
    
    return (
        <>
        <div className='w-full'>  
            <div className='bg-devarana-background w-full min-h-screen'>
                <div className="flex h-screen">
                    <Sidebar optBarVisible={optBarVisible} setOptBarVisible={setOptBarVisible} setOptionalContent={setOptionalContent}/>
                    <SecondNav optBarVisible={optBarVisible} setOptBarVisible={setOptBarVisible} optionalContent={optionalContent}/>
                    <div className={`transition-all duration-300 ease-in-out w-full overflow-y-scroll`} id="mainEl" onScroll={handleScroll}> 
                        <div className="p-2 relative">
                            <Navbar setSettingVisible={setSettingVisible} navbarClass={navbarClass} />
                            <main className="px-4 overflow-x-hidden"
                                style={{ paddingTop: '80px', paddingBottom: '20px' }}
                                
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ ease: "linear", duration: 0.2 }}
                                >
                                    {children}

                                </motion.div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
        </>
    )
};
