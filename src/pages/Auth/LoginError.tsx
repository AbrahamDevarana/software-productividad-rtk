import { useEffect } from "react";

const LoginError = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1500)
    })
    return ( 
        <div className="p-5 text-white text-center">
            <h1 className="text-3xl">Tu correo no está activo porfavor contacta a DH</h1>
            <p className="text-2xl">Esta ventana se cerrará automáticamente</p>
        </div>
    );
}
 
export default LoginError;