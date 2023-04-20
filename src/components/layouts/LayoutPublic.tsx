import { useLocation, useNavigate } from "react-router-dom";
import { LayoutLoginProps } from "@/interfaces";
import { useAppSelector } from '@/redux/hooks';
import Loading from "../antd/Loading";
import { useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";

export default function LayoutLogin({ children }: LayoutLoginProps) {

    const navigate = useNavigate();
    const location = useLocation()
    const { isLoading, userAuth } = useAppSelector((state: any) => state.auth);
    
    useAuth()

    const { from } = location.state || { from: { pathname: "/" } };
    

    useEffect(() => {
        if(!isLoading && userAuth.id !== ''){
            navigate(from)
        }
    }, [isLoading, userAuth])
    
    
    if (isLoading) return <Loading />;
    return (
        <div className="w-full flex justify-center bg-devarana-midnight bg-login h-screen items-center bg-cover bg-center">
            { children }
        </div>
    )
    
};
