import Loading from "../antd/Loading";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useNavigate } from "react-router-dom";
import { validateTokenThunk } from '../../redux/features/auth/authThunks';
import { Drawer, Dropdown, Menu, Modal } from "antd";
import { useState, useEffect } from 'react';
import { Sidebar } from "../Menu/Sidebar";
import { Navbar } from "../Menu/Navbar";

import 'animate.css';
import { NewSidebar } from "../Menu/NewSidebar";

interface LayoutAppProps{
    children: React.ReactNode | React.ReactNode[];
}

export default function LayoutApp({ children }: LayoutAppProps) {
   
    const navigate = useNavigate();
    // useGetValidationQuery(null)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(validateTokenThunk())
    }, [dispatch])

    const { loading, user } = useAppSelector((state: any) => state.auth); 

    const [settingVisible, setSettingVisible] = useState(false);
    const [active, isActive] = useState(false)

    if(!loading && !user){
        navigate('/login')
    }
    
	const onClose = () => {
		setSettingVisible(false);
	};

   
    if (loading) return <Loading />;
    return (
        <>
        <div className='w-full'>  
            <div className='bg-devarana-background w-full min-h-screen'>
                <div className="flex h-screen">
                    {/* <Sidebar active={active} /> */}
                    <NewSidebar />
                    <div className={`transition-all duration-300 ease-in-out w-full overflow-hidden`}> 
                        <div className="p-4">
                            <Navbar active={active} isActive={isActive} settingVisible={settingVisible} setSettingVisible={setSettingVisible} />
                            <main  className="animate__animated animate__fadeIn overflow-y-auto"
                                style={{ height: 'calc(100vh - 100px)' }}
                            >{children}</main>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Drawer title="Configuración" placement="right" onClose={onClose} open={settingVisible}>
            {/* <Settings/> */}
        </Drawer>
        </>
    )
};
