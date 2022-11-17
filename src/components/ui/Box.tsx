interface BoxProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}


const Box = ({id, className, children}: BoxProps) => {
    return ( 
        <div id={id} className={`p-5 shadow-ext bg-white rounded-ext ${className ? className : ""}` }>
            {children}
        </div>
     );
}
 
export default Box;