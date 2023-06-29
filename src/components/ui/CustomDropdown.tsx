import { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode
    buttonChildren: React.ReactNode
    buttonClass?: string
    containerClass?: string
    preferredPosition?: 'top' | 'bottom' | 'left' | 'right'
}

const CustomDropdown = ({children, buttonChildren, buttonClass, containerClass, preferredPosition}: Props) => {

    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = () => {
        setOpen(false)
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
  
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);


    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const overflowRight = window.innerWidth - (rect.left + rect.width);
            const overflowBottom = window.innerHeight - (rect.top + rect.height);

            if (overflowRight < 0) {
                dropdownRef.current.style.right = '0px';
            }
            if (overflowBottom < 0 && preferredPosition === 'bottom') {
                dropdownRef.current.style.bottom = '0px';
            }
        }
    }, [open, preferredPosition]);

    return ( 
        <div className="relative">
            <button className={`p-1 ${buttonClass}`} onClick={() => setOpen(!open)} >
                { buttonChildren }
            </button>
            <div className={`absolute ${preferredPosition === 'bottom' ? 'mt-2' : 'mb-2'} mt-2 bg-white rounded-md shadow-md transition-all duration-300 ease-in-out ${
                open ? "opacity-100 max-h-96 z-50" : "opacity-0 max-h-0 -z-50"} ${preferredPosition === 'top' ? 'bottom' : ''}`}
                ref={dropdownRef} >
                <div className={`p-2 rounded-md  ${containerClass}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default CustomDropdown;