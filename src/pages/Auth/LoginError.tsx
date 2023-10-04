import { useEffect } from "react";

const LoginError: React.FC = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1500)
    })
    return ( 
        <div className="p-5 text-devarana-graph text-center">
            <h1 className="text-3xl">El lanzamiento está cerca...</h1>
            <h2>Estamos afinando los últimos detalles de tu perfil, por lo que no aún está activo.</h2>
            <p>Prepárate.</p>
        </div>
    );
}
 
export default LoginError;