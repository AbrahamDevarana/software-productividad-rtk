import { Avatar, Segmented } from "antd";
import Box from "@/components/ui/Box";
import { PerfilProps } from "@/interfaces";
import { FaCog, FaRegUserCircle } from "react-icons/fa";
import { BsActivity } from "react-icons/bs";

interface HeaderProps {
    usuarioActivo: PerfilProps;
    segment: string;
    setSegment: React.SetStateAction<any>;
    visit?: boolean;
}


const Header: React.FC<HeaderProps> = ({ usuarioActivo, segment, setSegment, visit = false}) => {
    return ( 
        <>
            <Box className="h-60 w-full z-auto bg-[url('http://picsum.photos/2000/244')]">
            
            </Box>
            <div className="w-full px-4 z-10">
                <Box className="w-full -mt-8 flex flex-row mb-5 flex-wrap gap-y-5 py-3 px-5 mr-5 justify-center" >
                    <div className="justify-center align-middle flex">
                        <Avatar src={`${import.meta.env.VITE_STORAGE_URL}${usuarioActivo.foto}`} />
                    </div>
                    <div className="my-auto px-5 text-center md:text-left">
                        <h1 className="text-devarana-dark-graph">{`${usuarioActivo.nombre} ${usuarioActivo.apellidoPaterno} ${usuarioActivo.apellidoMaterno}`} </h1>
                        <p className="text-sm font-light text-devarana-graph"> { usuarioActivo.puesto }</p>
                    </div>
                    { !visit ?
                        <div className="bg-devarana-background my-auto flex max-w-[400px] w-full ml-auto rounded relative z-0">
                            <Segmented
                                block={true}
                                options={[
                                    {
                                        label: 'Perfil',
                                        value: 'Perfil',
                                        // icon: <FaRegUserCircle/>
                                    },
                                    {
                                        label: 'Actividad',
                                        value: 'Actividad',
                                        // icon: <BsActivity/>
                                    },
                                    {
                                        label: 'Configuración',
                                        value: 'Configuración',
                                        // icon: <FaCog/>
                                    }
                                ]}
                                className="w-full"                                
                                value={segment} 
                                onChange={setSegment}
                            />
                        </div>
                        : null  
                    }
                </Box>
            </div>
        </> 
    );
}
 
export default Header;