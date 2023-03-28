import { NavLink } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from "../Icon";
import { Admin } from '../secondNav/Admin';
import { optionalContent } from '@/interfaces';
import { Tactica } from '../secondNav/Tactica';
import { DatePicker, Input } from 'antd';

interface OptBarProps{
    optBarVisible: boolean;
    setOptBarVisible: (optBarVisible: boolean) => void;
    optionalContent: optionalContent;
}


export const SecondNav = ({optBarVisible, setOptBarVisible, optionalContent}:OptBarProps) => {

    const handleBar = () => {
        setOptBarVisible(!optBarVisible);
    }

    const handleSelectIcon = (icon: IconDefinition) => {
        console.log(icon.iconName);
    }

    return (
        <>
            <div className={`${ optBarVisible ? 'w-full z-[1000]' : 'w-0 opacity-0 -z-50' } transition-all duration-500 ease-linear`} style={{  maxWidth: '250px', }}>
                <div className={`dark:bg-dark-gradient bg-white  w-full h-full menu_sidebar relative p-5`} >
                    <button className="absolute right-0 top-5 justify-center flex py-5 rounded-l-lg bg-devarana-blue dark:bg-devarana-graph"> 
                        <Icon iconName="faCaretLeft" className="text-white text-xl pl-1" onClick={ handleBar} />
                    </button>
                    {  optionalContent === 'admin' && ( <Admin handleBar={handleBar}/> ) }
                    {  optionalContent === 'tactica' && ( <Tactica handleBar={handleBar}/> ) }
                </div>
            </div>
        </>
    )
}
