import { Avatar, Drawer, Segmented } from "antd";
import Box from "@/components/ui/Box";
import { PerfilProps } from "@/interfaces";
import { FaCog, FaRegUserCircle } from "react-icons/fa";
import { BsActivity } from "react-icons/bs";
import { getStorageUrl } from "@/helpers";
import { useMemo, useState } from "react";
import { Galeria } from "../ui/Galeria";

interface HeaderProps {
    usuarioActivo: PerfilProps;
    segment: string;
    setSegment: React.SetStateAction<any>;
    visitante?: boolean;
}


const Header: React.FC<HeaderProps> = ({ usuarioActivo, segment, setSegment, visitante = false}) => {


    // const { configuracion } = usuarioActivo

    const [panel, setPanel] = useState(false)
    const [picture, setPicture] = useState()

    const options = [
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
    ]

    const options2 = useMemo(() => {
        if(visitante){
            return options.filter((option) => option.label !== 'Configuración')
        }else{
            return options
        }
    }, [visitante])
        

    const handlePanel = () => {
        setPanel(!panel)
    }

    const handleGallery = () => {
    }


    return ( 
        <>
            <Box className="h-80 w-full bg-cover bg-center bg-no-repeat z-auto bg-[url('https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/portadas/IMG_4805.jpg')]">
                <div className="relative">
                   {
                        !visitante && (   
                        <button className="z-50 absolute top-0 right-0" onClick={handlePanel}>
                            <FaCog className=" text-2xl text-white drop-shadow-md"/>
                        </button> )
                   }
                </div>
            </Box>
            <div className="w-full px-4 z-10">
                <Box className="w-full -mt-8 flex flex-row mb-5 flex-wrap gap-y-5 py-2 px-5 mr-5 justify-center h-20 items-center" >
                    <div className="justify-center align-middle flex items-center">
                        <Avatar className="w-16 h-16" src={`${getStorageUrl(usuarioActivo.foto)}`} />
                    </div>
                    <div className="my-auto px-5 text-center md:text-left">
                        <p className="text-devarana-dark-graph text-lg font-bold">{`${usuarioActivo.nombre} ${usuarioActivo.apellidoPaterno} ${usuarioActivo.apellidoMaterno}`} </p>
                        <p className="text-sm font-light text-devarana-graph"> { usuarioActivo.puesto }</p>
                    </div>
                    
                        <div className="bg-devarana-background my-auto flex max-w-[400px] w-full ml-auto rounded relative z-0">
                            <Segmented
                                block={true}
                                options={options2}
                                className="w-full"                                
                                value={segment} 
                                onChange={setSegment}
                            />
                        </div>
                </Box>
            </div>

            <Drawer
                title={<p className="text-devarana-dark-graph text-bold"> Galería </p>}
                placement="right"
                closable={false}
                destroyOnClose={true}
                onClose={handlePanel}
                open={panel}
                width={600}
            >
                <Galeria galeria={[]} setPicture={setPicture} picture={picture}/>
            </Drawer>
        </> 
    );
}
 
export default Header;