import { Dropdown, Input, Menu, Select, Space } from "antd";

import { LayoutNavbarProps } from "../../interfaces"
import { useAppDispatch } from "../../redux/hooks";
import { logoutThunk } from "../../redux/features/auth/authThunks";
import { Icon } from '../Icon';

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
    <div className='h-16 dark:bg-dark-gradient bg-white px-5 mb-4 drop-shadow-md shadow-devarana-graph 
                    transition-all duration-200 ease-in-out'>
        <div className="flex h-full items-center">
            <div>
                <Select placeholder="Buscar" showSearch suffixIcon={<Icon iconName={"faMagnifyingGlass"} />} className='transition-all duration-200 ease-in-out w-32'
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
                        <Icon iconName="faBell" className='text-2xl dark:text-white text-devarana-blue' />
                    </Space>
                    </a>
                </Dropdown>
                <Icon iconName="faSliders" className='text-2xl ml-2 mr-3 cursor-pointer dark:text-white text-devarana-blue ' onClick={ showDrawer } />
                <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()} className="items-center flex">
                        <Space>
                            <Icon iconName="faArrowRightFromBracket" className='text-2xl dark:text-white text-devarana-blue '/>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    </div>
  )
}
