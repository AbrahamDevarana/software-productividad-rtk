interface BoxProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
}



const Box = ({id, className, children, ref}: BoxProps) => {
    return ( 
        <div ref={ref} id={id} className={`p-5 shadow-ext bg-white rounded-ext ${className ? className : ""}` }>
            {children}
        </div>
     );
}
 
export default Box;