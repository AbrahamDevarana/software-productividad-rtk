import { ReactElement } from "react";
import '../../assets/scss/button.scss'
import "../../assets/scss/links.scss";


interface ButtonProps {
    className?: string;
    children: ReactElement | string | string [];
    type?: "button" | "submit" | "reset";
    btnType?: "primary" | "secondary" | "danger" | "success" | "warning" | "primary-outline" | "secondary-outline";
    fn?: () => void;
}

export const Button = ({ children, className, fn, type = "button", btnType }: ButtonProps) => {

    return (
        <button
            type={type}
            className={`btn-${btnType ?? ""} py-2 px-4 rounded-[10px] transition-all duration-300 ease-in-out hover:shadow-ext ${className ?? ""}`}
            onClick={fn}
        >
            {children}
        </button>
    )
}