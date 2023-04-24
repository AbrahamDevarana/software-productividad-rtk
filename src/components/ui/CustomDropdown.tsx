import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Icon, IconName } from '../Icon';

interface CustomDropdownProps {
    buttonText: string;
    iconButton: IconName;
    children?: React.ReactNode;
}

interface CustomDropDownContainerProps {
    children?: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const CustomDropdown = ({iconButton, buttonText, children}: CustomDropdownProps) => {

    const [visible, setVisible] = useState(false);

    
    const handleClick = () => {
        setVisible(prevVisible => !prevVisible); // Toggling visibility
    };

    return (
        <>
        <div className='relative'>
            <Button onClick={ handleClick } icon={ <Icon iconName={iconButton} className='px-2' /> } > { buttonText } </Button>
            {
                <CustomDropDownContainer visible={visible} setVisible={setVisible}>
                    { children }
                </CustomDropDownContainer>
            }
        </div>
        </>
    )
}


const CustomDropDownContainer = ({children, visible, setVisible}: CustomDropDownContainerProps) => {

    return (
        <div
            className={`absolute left-0 bg-white shadow-lg min-w-[200px] p-2 rounded-lg transition-all 
            ${ visible ? 'top-full z-10' : 'top-0 -z-10'}`}
        >
            {children}
        </div>
    )
}
