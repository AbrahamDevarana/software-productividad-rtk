import '@/assets/scss/button.scss'
import { ReactElement } from "react";

interface ButtonProps {
    className?: string;
    children: ReactElement | string | string [];
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    classType: "regular" | "outline" | "icon"
    classColor: "default" | "dark" | "primary" | "secondary" | "success" | "info" | "warning" | "error"
}

 

export const Button = ({ children, onClick, type = "button", classType, classColor }: ButtonProps) => {


    return (
        <button
            type={type}
            className={`customButton w-full customButton__${classType} customButton__${classType}-${classColor}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}