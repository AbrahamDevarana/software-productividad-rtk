import Loading from "../antd/Loading";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useNavigate } from "react-router-dom";
import { Drawer, FloatButton } from "antd";
import { useState, useEffect } from 'react';
import { Navbar } from "../Menu/Navbar";
import { Sidebar } from "../Menu/Sidebar";
import 'animate.css';
import { SecondNav } from '../Menu/SecondNav';
import { useSocket } from "@/hooks/useSocket";
import { connectSocketThunk } from '@/redux/features/socket/socketThunk';
import { useAuth } from "@/hooks/useAuth";
import { optionalContent } from "@/interfaces";
import { Icon } from "../Icon";
import { motion } from 'framer-motion';

interface LayoutAppProps{
    children: React.ReactNode | React.ReactNode[];
}

export default function LayoutApp({ children }: LayoutAppProps) {
   
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useAuth()

    const { isLoading, userAuth } = useAppSelector((state: any) => state.auth); 
    const [ settingVisible, setSettingVisible ] = useState<boolean>(false);
    const [ optBarVisible, setOptBarVisible ] = useState<boolean>(false);
    const [ navbarClass, setNavbarClass ] = useState<string>('');
    const [ optionalContent, setOptionalContent ] = useState<optionalContent>('admin')

    useEffect(() => {
        if(!isLoading && !userAuth){
            navigate("/login", { state: { from: window.location.pathname } });
        }
    }, [isLoading, userAuth])

    const {socket, online} = useSocket(import.meta.env.VITE_SERVER_URL)
    
    useEffect(() => {
        if(socket){
            
            dispatch(connectSocketThunk(socket,  online))
        }
    }, [socket])
            
    
	const onClose = () => {
		setSettingVisible(false);
	};

    const setTheme = (e: any) => {

        if (e.target.checked) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark')
        }else{
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
    }, [])
    

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if(e.currentTarget.scrollTop > 30){
            setNavbarClass('bg-opacity-25');
        }else{
            setNavbarClass('');
        }
    }

   
    if (isLoading && !userAuth) return <Loading />;
    return (
        <>
        <div className='w-full'>  
            <div className='bg-devarana-background w-full min-h-screen'>
                <div className="flex h-screen">
                    <Sidebar optBarVisible={optBarVisible} setOptBarVisible={setOptBarVisible} setOptionalContent={setOptionalContent}/>
                    <SecondNav optBarVisible={optBarVisible} setOptBarVisible={setOptBarVisible} optionalContent={optionalContent}/>
                    <div className={`transition-all duration-300 ease-in-out w-full overflow-y-scroll`} id="mainEl" onScroll={handleScroll}> 
                        <div className="p-2">
                            <Navbar setSettingVisible={setSettingVisible} navbarClass={navbarClass} />
                            <main className="px-4 overflow-x-hidden relative"
                                style={{ paddingTop: '80px', paddingBottom: '20px' }}
                                
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ ease: "linear" }}
                                >
                                    {children}

                                </motion.div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Drawer title="Configuración" placement="right" onClose={onClose} open={settingVisible} contentWrapperStyle={{ width: '300px' }}
        >
            <div className="flex">
                <p> Modo Oscuro </p>
                <input type="checkbox" className="ml-2" onChange={setTheme} defaultChecked={localStorage.getItem('theme') == "dark" ? true : false} />
            </div>
        </Drawer>

        <FloatButton 
            icon={<Icon iconName="faPlus"/>} 
        />
        </>
    )
};
