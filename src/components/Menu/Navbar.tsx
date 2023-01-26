import { Dropdown, Input, Menu, Select, Space } from "antd";

import { LayoutNavbarProps } from "../../interfaces"
import Box from "../ui/Box";
import {AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import {FiLogOut } from 'react-icons/fi'
import { FaBell } from 'react-icons/fa';
import { GoSettings} from 'react-icons/go'

import { useAppDispatch } from "../../redux/hooks";
import { logoutThunk } from "../../redux/features/auth/authThunks";
import { SearchOutlined } from "@ant-design/icons";



export const Navbar = ({setSettingVisible}:LayoutNavbarProps) => {

    const dispatch = useAppDispatch()

    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <button onClick={() => dispatch(logoutThunk())} >
                  Logout
                </button>
              ),
            },
          ]}
        />
    );

    const notificaciones = (
        <Menu
          items={[
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
          ]}
        />
    );

    const showDrawer = () => {
        setSettingVisible(true);
      };


  return (
    <div className='h-16 bg-white dark:bg-dark-gradient px-5 mb-4 drop-shadow-md shadow-devarana-graph 
                    transition-all duration-200 ease-in-out'>
        <div className="flex h-full items-center">
            <div>
                <Select placeholder="Buscar" showSearch suffixIcon={<SearchOutlined />} className='transition-all duration-200 ease-in-out w-32'
                    style={{
                        maxWidth: '300px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.width = '300px'}
                    onMouseLeave={(e) => e.currentTarget.style.width = '120px'}
                />
            </div>
            <div className="sm:ml-auto flex items-center">
                <Dropdown overlay={notificaciones} trigger={['click']} className="px-2">
                    <a onClick={(e) => e.preventDefault()} className="items-center flex">
                    <Space>
                        <FaBell className='text-2xl text-devarana-blue dark:text-white'/>
                    </Space>
                    </a>
                </Dropdown>
                <GoSettings className='text-2xl ml-2 mr-3 cursor-pointer text-devarana-blue dark:text-white' onClick={ showDrawer } />
                <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()} className="items-center flex">
                        <Space>
                            <FiLogOut className='text-2xl text-devarana-blue dark:text-white'/>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    </div>
  )
}
