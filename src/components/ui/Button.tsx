import '@/assets/scss/button.scss'
import { ReactElement } from "react";

interface ButtonProps {
    className?: string;
    children: any;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    classType: "regular" | "outline" | "icon"
    classColor: "default" | "dark" | "primary" | "secondary" | "success" | "info" | "warning" | "error"
    width?: number | '100%' | 'auto';
    disabled?: boolean;
    form?: 'square' | 'circle'
}

 

export const Button = ({ children, onClick, type = "button", classType, classColor, width = '100%', disabled, form = 'square' }: ButtonProps) => {


    return (
        <button
            type={type}
            className={`customButton customButton__${classType} customButton__${classType}-${classColor} disabled:opacity-50 disabled:cursor-not-allowed text-center ${ form === 'circle' ? 'rounded-full' : ''}`}
            onClick={onClick}
            style={{
                width: width
            }}
            disabled={disabled}
        >
            { children }
        </button>
    )
}