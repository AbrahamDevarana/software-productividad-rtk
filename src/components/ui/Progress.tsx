import { FC } from "react";


interface CustomProgressBarProps {
    value: number;
    showInfo?: boolean;
}

const CustomProgressBar:FC<CustomProgressBarProps> = ({value, showInfo = false}) => {
    
    return (
        <div className="relative">
            <progress className="custom-progress w-full" max="100" value={value} />
            <span className="absolute right-10 text-white drop-shadow-2xl">
                {value}
            </span>
        </div>
    );
}
 
export default CustomProgressBar;