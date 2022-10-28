interface LayoutEmptyProps {
    children: React.ReactNode | React.ReactNode[];
}

const LayoutEmpty = ({children}:LayoutEmptyProps) => {
    return ( 
        <div className="w-full flex justify-center bg-devarana-midnight h-screen items-center bg-cover">
            {children}
        </div>
      );
}
 
export default LayoutEmpty;