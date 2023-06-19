interface BoxProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    style?: React.CSSProperties;
}



const Box = ({id, className, children, ref, style}: BoxProps) => {
    return ( 
        <div ref={ref} id={id} className={`p-5 shadow-ext bg-white rounded-ext ${className ? className : ""}` } style={style}>
            {children}
        </div>
     );
}
 
export default Box;