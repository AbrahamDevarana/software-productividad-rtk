import { useNavigate } from "react-router-dom";
import { LayoutLoginProps } from "../../interfaces";
import { useGetValidationQuery, validateTokenThunk } from '../../redux/features/auth/authThunks';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useEffect } from 'react';

export default function LayoutLogin({ children }: LayoutLoginProps) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, user } = useAppSelector((state: any) => state.auth);   
    useEffect(() => {
        dispatch(validateTokenThunk())
    }, [dispatch])

    
    if(!loading && user){
        navigate('/')
    }


    return (
        <div className="w-full flex justify-center bg-devarana-midnight bg-login h-screen items-center bg-cover">
            { children }
        </div>
    )
    
};
