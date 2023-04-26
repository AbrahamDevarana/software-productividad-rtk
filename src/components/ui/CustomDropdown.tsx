import { Button } from 'antd'
import React, { useCallback, useState } from 'react'
import { Icon, IconName } from '../Icon';

interface CustomDropdownProps {
    buttonText?: string;
    iconButton?: IconName;
    children?: React.ReactNode;
    buttonChildren?: React.ReactNode;
    bordered?: boolean;
    className?: string;
    classNameRoot?: string;
}

interface CustomDropDownContainerProps {
    children?: React.ReactNode;
    className?: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const CustomDropdown = ({iconButton, buttonChildren, children, bordered = true, classNameRoot, className}: CustomDropdownProps) => {

    const [visible, setVisible] = useState(false);

    
    const handleClick = useCallback(() => {
        setVisible(prevVisible => !prevVisible);
    }, []);

    return (
        <>
        <div className='relative'>
            <Button onClick={ handleClick } icon={ iconButton ? <Icon iconName={iconButton} className={`px-2 ${classNameRoot}`} /> : null } > { buttonChildren } </Button>
            {
                <CustomDropDownContainer visible={visible} setVisible={setVisible} className={className}>
                    { children }
                </CustomDropDownContainer>
            }

        </div>
        { visible ? <div className="fixed inset-0 bg-transparent z-[100]" onClick={() => setVisible(false)}></div> : null }
        </>
    )
}


const CustomDropDownContainer = ({children, visible, className}: CustomDropDownContainerProps) => {

    return (
        <div
            className={`absolute left-0 bg-white shadow-lg min-w-[200px] p-2 rounded-lg transition-all ${ visible ? 'top-full z-[110]' : 'top-0 -z-10'} ${className}`}
        >
            {children}
        </div>
    )
}
