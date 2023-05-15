import Box from "@/components/ui/Box";
import Logo from '@/assets/img/logos/devarana_login.svg'
import { Button } from "@/components/ui/Button";
export default function Login() {
        
    const redirectToGoogleSSO = async() => {
        const googleLoginUrl = `${import.meta.env.VITE_API_URL}/login`
        window.location.href = googleLoginUrl;
    }


    return (
        <Box className="bg-white max-w-[470px] w-full animate__animated animate__fadeIn animate__faster">
            <Box className="-my-10 mb-3 h-28 bg-gradient-to-tr from-primary to-primary-light flex" >
                <h1 className='text-white text-2xl align-middle m-auto'>Software</h1>
            </Box>
            <div className="px-5 pb-10">
                <img src={Logo} alt="Devarana Logo" className='py-16 max-w-full block mx-auto object-cover' />                 
                    <Button classType="regular" classColor="primary" type="button" className="block w-full my-2" onClick={redirectToGoogleSSO}> Empezar </Button>    
            </div>

        </Box>
    )
};
