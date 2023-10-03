import Box from "@/components/ui/Box";
import Logo from '@/assets/img/logos/devarana_login.svg'
import { Button } from "@/components/ui/Button";
export default function Login() {
        
    const redirectToGoogleSSO = async() => {
        const googleLoginUrl = `${import.meta.env.VITE_API_URL}/login`
        window.location.href = googleLoginUrl;
    }


    return (
        <div className="grid grid-cols-2">
            <div className="h-screen w-full flex items-center justify-center col-span-1">
                <Box className="bg-white max-w-[470px] w-full">
                    <Box className="-my-10 mb-3 h-28 bg-gradient-to-tr from-primary to-primary-light flex" >
                        <h1 className='text-white text-2xl align-middle m-auto'> DevaranApp </h1>
                    </Box>
                    <div className="px-5 pb-10">
                        <img src={Logo} alt="Devarana Logo" className='py-16 max-w-full block mx-auto object-cover' />                 
                        <Button classType="regular" classColor="primary" type="button" className="block w-full my-2" onClick={redirectToGoogleSSO}>
                            Iniciar Sesión
                        </Button>    
                    </div>
                </Box>
            </div>

            <div className="col-span-1 p-5" >
                <Box className="bg-primary-light w-full col-span-1 bg-login bg-cover flex items-center justify-center relative" style={{
                height: 'calc(100vh - 40px)',
            }}>
                <div className="bg-black bg-opacity-30 absolute inset-0"/>
                    <div className="z-50">
                        <h1 className="text-white text-5xl font-playfair drop-shadow">
                            DEVARANA
                        </h1>
                        <p className="text-white font-light">
                            Somos arquitectos de lo extraordinario.
                        </p>
                    </div>

                </Box>
            </div>
        </div>
    )

    // return (
    //     <Box className="bg-white max-w-[470px] w-full animate__animated animate__fadeIn animate__faster">
    //         <Box className="-my-10 mb-3 h-28 bg-gradient-to-tr from-primary to-primary-light flex" >
    //             <h1 className='text-white text-2xl align-middle m-auto'>Software</h1>
    //         </Box>
    //         <div className="px-5 pb-10">
    //             <img src={Logo} alt="Devarana Logo" className='py-16 max-w-full block mx-auto object-cover' />                 
    //                 <Button classType="regular" classColor="primary" type="button" className="block w-full my-2" onClick={redirectToGoogleSSO}> Empezar </Button>    
    //         </div>

    //     </Box>
    // )
};
