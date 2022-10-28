import { Spin } from "antd";

const Loading = () => {
    return ( 
        <div className="flex w-full h-screen justify-center align-middle flex-col">
            <Spin size="large" spinning/>
            <p className="text-center">Cargando</p>
        </div>
     );
}
 
export default Loading;