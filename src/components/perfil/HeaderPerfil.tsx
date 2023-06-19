import { Avatar, Drawer, Image, Segmented } from "antd";
import Box from "@/components/ui/Box";
import { PerfilProps } from "@/interfaces";
import { FaCog } from "react-icons/fa";
import { getStorageUrl } from "@/helpers";
import { useMemo, useState } from "react";
import { Galeria } from "../ui/Galeria";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useAppDispatch } from "@/redux/hooks";

interface HeaderProps {
    usuarioActivo: PerfilProps;
    segment: string;
    setSegment: React.SetStateAction<any>;
    visitante?: boolean;
}

interface PictureProps {
    id: string;
    url: string;
}

const Header: React.FC<HeaderProps> = ({ usuarioActivo, segment, setSegment, visitante = false}) => {


    // const { configuracion } = usuarioActivo

    const [panel, setPanel] = useState(false)
    const [picture, setPicture] = useState<PictureProps>({
        id: '',
        url: ''
    })
    const dispatch = useAppDispatch();

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
        console.log('galeria', picture);

        // dispatch(updateConfiguracionThunk())
        
    }

    return ( 
        <>

            <div className="shadow-ext bg-white rounded-ext h-80 overflow-hidden">
                <div className="relative overflow-hidden w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <Image 
                            className="w-full h-80 object-cover object-center" 
                            src={`${getStorageUrl(usuarioActivo.configuracion?.portadaPerfil)}`}
                            preview={false}
                            fallback={getStorageUrl('portadas/portada-default.jpg')}
                            wrapperStyle={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                            }}
                        />
                    </div>

                   {
                        !visitante && (   
                        <button className="z-50 absolute top-3 right-3" onClick={handlePanel}>
                            <FaCog className=" text-2xl text-white drop-shadow-md"/>
                        </button> )
                   }
                </div>
            </div>
            <div className="w-full px-4 z-20 relative">
                <Box className="w-full -mt-8 flex flex-row mb-5 flex-wrap gap-y-5 py-2 px-5 mr-5 justify-center lg:h-20 items-center z-50" >
                    <div className="justify-center align-middle flex items-center">
                        <Avatar className="w-16 h-16" src={<Image src={`${getStorageUrl(usuarioActivo.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                    </div>
                    <div className="my-auto px-5 text-center md:text-left">
                        <p className="text-devarana-dark-graph lg:text-lg font-bold">{`${usuarioActivo.nombre} ${usuarioActivo.apellidoPaterno} ${usuarioActivo.apellidoMaterno}`} </p>
                        <p className="lg:text-sm font-light text-devarana-graph"> { usuarioActivo.puesto }</p>
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
                width={ window.innerWidth < 768 ? '100%' : 600 }
            >
                <Galeria galeria={[]} setPicture={setPicture} picture={picture} handleGallery={handleGallery} />
            </Drawer>
        </> 
    );
}
 
export default Header;