import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Box from '../../components/ui/Box';
import { Button } from '../../components/ui';
import Logo from '../../assets/img/logos/devarana_login.svg'
import { loginThunk } from '../../redux/features/auth/authThunks';
import { useAppDispatch } from '../../redux/hooks';

export const Loginv2 = () => {

    const dispatch = useAppDispatch();
    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            const tokens = await axios.post(`${import.meta.env.VITE_API_URL}/login/google`, {
                code: codeResponse.code,
                
            });
            console.log(tokens);
            dispatch(loginThunk(tokens.data));
        },
        onError: error => console.log(error)
        
    });
    
      return (
        <Box className="bg-white max-w-[470px] w-full animate__animated animate__fadeIn animate__faster">
            <Box className="-my-10 mb-3 h-28 bg-gradient-to-tr from-custom-blue to-custom-blue2 flex" >
                <h1 className='text-white text-2xl align-middle m-auto'>Software</h1>
            </Box>
            <div className="px-5 pb-10">
                <img src={Logo} alt="Devarana Logo" className='py-16 max-w-full block mx-auto object-cover' />                 
                    <Button type="button" btnType="secondary" className="block w-full my-2" fn={login}> Empezar </Button>    
            </div>

        </Box>
      )
}
