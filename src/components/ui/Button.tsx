import '@/assets/scss/button.scss'
import { ReactElement } from "react";

interface ButtonProps {
    className?: string;
    children: ReactElement | string | string [];
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    classType: "regular" | "outline" | "icon"
    classColor: "default" | "dark" | "primary" | "secondary" | "success" | "info" | "warning" | "error"
    width?: number | '100%' | 'auto';
}

 

export const Button = ({ children, onClick, type = "button", classType, classColor, width = '100%' }: ButtonProps) => {


    return (
        <button
            type={type}
            className={`customButton customButton__${classType} customButton__${classType}-${classColor}`}
            onClick={onClick}
            style={{
                width: width
            }}
        >
            {children}
        </button>
    )
}