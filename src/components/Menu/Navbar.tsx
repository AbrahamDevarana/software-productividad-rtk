import { Dropdown, Menu, Space } from "antd";
import { useDispatch } from "react-redux";
import { LayoutNavbarProps } from "../../interfaces"
import { logOut } from "../../redux/features/auth/authSlice";
import Box from "../ui/Box";
import {AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import {FiLogOut } from 'react-icons/fi'
import { FaBell } from 'react-icons/fa';
import { GoSettings} from 'react-icons/go'



export const Navbar = ({active, isActive, setSettingVisible}:LayoutNavbarProps) => {

    const dispatch = useDispatch()

    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <button onClick={() => dispatch(logOut())}>
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
    <Box className='h-16 p-5 mb-4'>
        <div className="flex">
            <div className='sm:ml-0 ml-auto'>
                <button onClick={ () => isActive(!active) }> {!active? <AiOutlineMenuFold className='text-2xl'/> : <AiOutlineMenu className='text-2xl'/> } </button>
            </div>
            <div className="sm:ml-auto flex">
                <Dropdown overlay={notificaciones} trigger={['click']} className="px-2">
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <FaBell className='text-2xl hover:text-custom-dark2 text-custom-dark2'/>
                    </Space>
                    </a>
                </Dropdown>
                <GoSettings className='text-2xl ml-2 mr-3 cursor-pointer hover:text-custom-dark2 text-custom-dark2' onClick={ showDrawer } />
                <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <FiLogOut className='text-2xl hover:text-custom-dark2 text-custom-dark2'/>
                    </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    </Box>
  )
}
