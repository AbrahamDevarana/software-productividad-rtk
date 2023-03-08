import { Spin } from "antd";

const Loading = ({ texto = "Cargando" }) => {
    return ( 
        <div className="flex w-full h-screen justify-center align-middle flex-col">
            <Spin size="large" spinning/>
            <p className="text-center"> {texto} </p>
        </div>
     );
}
 
export default Loading;