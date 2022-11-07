import Loading from "../antd/Loading";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useGetValidationQuery } from "../../redux/features/auth/authThunks";
import { Drawer, Dropdown, Menu, Modal } from "antd";
import {useState} from 'react'
import { Sidebar } from "../Menu/Sidebar";
import { Navbar } from "../Menu/Navbar";

interface LayoutAppProps{
    children: React.ReactNode | React.ReactNode[];
}

export default function LayoutApp({ children }: LayoutAppProps) {
   
    const navigate = useNavigate();
    useGetValidationQuery('')
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
                <div className="flex relative">
                    <Sidebar active={active} />
                    <div className={`p-4 transition-all duration-300 ease-in-out ml-auto ${active? "layout-size-90 group-hover:layout-size-260":"layout-size-260"} w-full relative `}> 
                        <Navbar active={active} isActive={isActive} settingVisible={settingVisible} setSettingVisible={setSettingVisible} />
                        {children}
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
