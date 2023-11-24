import LogoBlanco from "@/components/svg/LogoBlanco";
import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";

export default function Login() {
        
    const redirectToGoogleSSO = async() => {
        const googleLoginUrl = `${import.meta.env.VITE_API_URL}/login`
        window.location.href = googleLoginUrl;
    }


    return (
        <div className="grid grid-cols-2">
            <div className="h-screen w-full flex items-center justify-center col-span-1">
                <div className="flex flex-col text-left">
                    <h1 className="text-3xl text-devarana-midnight">Iniciar Sesión</h1>
                    <p className="text-sm text-devarana-graph py-5">Tu cuenta está ligada a tu correo de DEVARANA</p>
                    <Button classType="regular" width={'100%'} classColor="dark" type="button" className="block w-full my-2" onClick={redirectToGoogleSSO}>
                        Acceder
                    </Button>    
                </div>
            </div>

            <div className="col-span-1 p-5" >
                <Box className="bg-primary-light w-full col-span-1 bg-login bg-cover flex items-center justify-center relative" style={{
                height: 'calc(100vh - 40px)',
            }}>
                <div className="bg-black bg-opacity-30 absolute inset-0 rounded-ext"/>
                    <div className="z-50">

                        <LogoBlanco className="w-96"/>
                        <p className="text-white font-light">
                            Somos creadores, arquitectos y diseñadores de lo extraordinario  <sup>&reg;</sup>
                        </p>
                    </div>

                </Box>
            </div>
        </div>
    )

};
