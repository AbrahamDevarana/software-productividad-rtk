import { useNavigate } from "react-router-dom";
import { LayoutLoginProps } from "../../interfaces";
import { useGetValidationQuery } from "../../redux/features/auth/authThunks";
import { useAppSelector } from "../../redux/hooks";

export default function LayoutLogin({ children }: LayoutLoginProps) {

    const navigate = useNavigate();
    useGetValidationQuery('')
    const { loading, user } = useAppSelector((state: any) => state.auth);   

    if(!loading && user){
        navigate('/')
    }


    return (
        <div className="w-full flex justify-center bg-devarana-midnight bg-login h-screen items-center bg-cover">
            { children }
        </div>
    )
    
};
