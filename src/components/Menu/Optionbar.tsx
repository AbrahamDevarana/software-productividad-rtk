import { CaretLeftOutlined } from "@ant-design/icons";

interface OptBarProps{
    optBarVisible: boolean;
    setOptBarVisible: (optBarVisible: boolean) => void;
}



export const OptBar = ({optBarVisible, setOptBarVisible}:OptBarProps) => {

    const handleBar = () => {
        
        setOptBarVisible(!optBarVisible);
        console.log(optBarVisible);
    }
    return (
        <>
            <div className={`${ optBarVisible ? 'w-full z-50' : 'w-0 opacity-0 -z-50' } transition-all duration-500 ease-linear`} style={{  maxWidth: '250px', }}>
                <div className={`dark:bg-dark-gradient bg-white  w-full h-full menu_sidebar relative`} >
                    <button className="absolute right-0 top-5 justify-center flex py-5 rounded-l-lg bg-devarana-blue dark:bg-devarana-graph"> 
                        <CaretLeftOutlined className="text-white" onClick={ handleBar} />
                    </button>
                </div>
            </div>
        </>
    )
}
