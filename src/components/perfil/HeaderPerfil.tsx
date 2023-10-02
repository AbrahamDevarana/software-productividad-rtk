import { Avatar, Drawer, Image, Segmented, Spin } from "antd";
import Box from "@/components/ui/Box";
import { PerfilProps } from "@/interfaces";
import { FaCog, FaEye } from "react-icons/fa";
import { getStorageUrl } from "@/helpers";
import { useMemo, useState } from "react";
import { Galeria } from "../ui/Galeria";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getGaleriaDevaranaThunk } from "@/redux/features/galeria/galeriaThunk";
import { updatePortraitThunk, updateProfileConfigThunk } from "@/redux/features/perfil/perfilThunk";

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


    const {  galeriaDevarana, isLoading: isLoadingGaleria } = useAppSelector(state => state.galeria)
    const { isLoadingConfiguration } = useAppSelector(state => state.profile)

    const [panel, setPanel] = useState(false)
    const [picture, setPicture] = useState(usuarioActivo.configuracion?.portadaPerfil)
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
        

    const handlePanel = async () => {
        await dispatch(getGaleriaDevaranaThunk({}))
        setPanel(!panel)
    }

    const handleGallery = () => {
        dispatch(updatePortraitThunk({ id:usuarioActivo.id,  portadaPerfil: picture }))
        
    }

    return ( 
        <>

            <div className="shadow-ext bg-white rounded-ext h-80 overflow-hidden">
                <div className="relative overflow-hidden w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="relative h-80">
                            {
                                isLoadingConfiguration ? 
                                <Spin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> 
                                :
                                <Image
                                    src={`${getStorageUrl(usuarioActivo.configuracion?.portadaPerfil)}`}
                                    fallback={getStorageUrl('portadas/portada-default.jpg')}
                                    preview={false}
                                    wrapperStyle={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                    }}
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '350px'
                                    }}
                                /> 
                            }
                            
                        </div>
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
                        <Avatar 
                            className="w-16 h-16" 
                            src={
                                <Image src={`${getStorageUrl(usuarioActivo.foto)}`} 
                                fallback={getBrokenUser()}
                                preview={{
                                    mask: <FaEye className="text-white text-xs"/>
                                }}
                            />} 
                        />
                    </div>
                    <div className="my-auto px-5 text-center md:text-left">
                        <p className="text-devarana-dark-graph lg:text-lg font-bold">{`
                            ${usuarioActivo.nombre ? usuarioActivo.nombre : ''}
                            ${usuarioActivo.apellidoPaterno ? usuarioActivo.apellidoPaterno : ''}
                            ${usuarioActivo.apellidoMaterno ? usuarioActivo.apellidoMaterno : ''}
                        `}</p>
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
                <Galeria galeria={galeriaDevarana} picture={picture} isLoading={isLoadingGaleria} setPicture={setPicture} handleGallery={handleGallery} />
            </Drawer>
        </> 
    );
}
 
export default Header;