import { useEffect } from "react";

const LoginError: React.FC = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1500)
    })
    return ( 
        <div className="p-5 text-devarana-graph text-center">
            <h1 className="text-3xl">Parece que tu usuario aún no está activo.</h1>
            <h2>Por favor, comunícate con capital humano para que te activen.</h2>
        </div>
    );
}
 
export default LoginError;