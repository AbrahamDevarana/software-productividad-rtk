import { useEffect } from "react";
import Loading from "@/components/antd/Loading";
import { loginThunk } from "@/redux/features/auth/authThunks";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

const LoginSuccess: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    // Get params from url
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    
    if(accessToken && refreshToken){
        dispatch(loginThunk({accessToken, refreshToken}))
        // sin regresar a la pagina anterior
    }

    useEffect(() => {
        setTimeout(() => {
            navigate("/", {
                replace: true,
            })
        }, 500)
    }, [])

    
    return ( 
        <Loading texto="Iniciando Sesión" />
    );
}
 
export default LoginSuccess;