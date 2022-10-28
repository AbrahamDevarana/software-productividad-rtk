import { useEffect } from "react";

const LoginSuccess = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 100)
    })
    return ( 
        <div className="p-5 text-white text-center">
            <h1 className="text-3xl">Inicio de sesión correcto</h1>
            <p className="text-2xl">Esta ventana se cerrará automaticamente</p>
        </div>
    );
}
 
export default LoginSuccess;