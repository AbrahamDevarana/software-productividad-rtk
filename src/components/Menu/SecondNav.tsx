
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Admin } from '../secondNav/Admin';
import { optionalContent } from '@/interfaces';
import { Tactica } from '../secondNav/Tactica';
import { FaCaretLeft } from 'react-icons/fa';

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
                <div className={`bg-dark-gradient  w-full h-full menu_sidebar relative p-5`} >
                    <button className="absolute right-0 top-5 justify-center flex py-5 rounded-l-lg bg-devarana-graph"> 
                        <FaCaretLeft className="text-white text-xl pl-1" onClick={ handleBar} />
                    </button>
                    {  optionalContent === 'admin' && ( <Admin handleBar={handleBar}/> ) }
                    {  optionalContent === 'tactica' && ( <Tactica handleBar={handleBar}/> ) }
                </div>
            </div>
        </>
    )
}
