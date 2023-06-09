import { Breadcrumb, Dropdown, Select, Space } from "antd";
import type { MenuProps } from 'antd';
import { LayoutNavbarProps } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutThunk } from "@/redux/features/auth/authThunks";
import { rutaPrivada } from "@/router";
import { FaAngleRight, FaSignOutAlt } from "react-icons/fa";
import MyBreadcrumb from "../ui/Breadcrumb";

export const Navbar = ({setSettingVisible, navbarClass}:LayoutNavbarProps) => {

    const { userAuth } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    const menu: MenuProps['items'] = [
            {
              key: '1',
              label: (
                <button onClick={() => dispatch(logoutThunk())} className="text-devarana-dark-graph">
					Cerrar sesión
                </button>
              ),
            },
		]

    const notificaciones: MenuProps['items'] = [
            {
              key: '1',
              label: (
                <span>
                  Se te ha designado una nueva <a className='font-bold'>tarea</a>
                </span>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  Tu <a className='font-bold'> tarea </a> esta por vencer
                </span>
              ),
            },
            {
              key: '3',
              label: (
                <span>
                    <a className='font-bold'>Fátima Ortiz</a> te ha asignado nueva <a className='font-bold'>tarea</a>
                </span>
              ),
            },
            {
              key: '4',
              label: (
                <span>
                  Se te ha designado una nueva<a className='font-bold'>tarea</a>
                </span>
              ),
            },
		]

    const showDrawer = () => {
        setSettingVisible(true);
    };



  return (
    // glassmorphism
    <div className="relative w-full">
        <div className={`h-16 px-5 rounded-ext mb-4   backdrop-blur-sm border-white border-opacity-25 fixed z-50 left-28 right-8 transition-all duration-200 ease-in-out ${navbarClass}`}>
            <div className="flex h-full items-center">
                <div className="text-devarana-midnight font-light">
                    <MyBreadcrumb />
                </div>
                <div className="sm:ml-auto flex items-center">
                    {/* <Dropdown menu={{ items:notificaciones }} trigger={['click']} className="px-2">
                        <a onClick={(e) => e.preventDefault()} className="items-center flex">
                        <Space>
                            <FaBell className='text-2xl text-devarana-blue' />
                        </Space>
                        </a>
                    </Dropdown> */}
                    {/* <FaSlidersH className='text-2xl ml-2 mr-3 cursor-pointer text-devarana-blue ' onClick={ showDrawer } /> */}
                    <Dropdown menu={{items:menu}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} className="items-center flex">
                            <Space>
                                <FaSignOutAlt className='text-xl font-light text-devarana-graph cursor-pointer'/>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
    
  )
}
