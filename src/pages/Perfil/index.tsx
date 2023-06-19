import { useEffect, useState } from "react";
import { clearProfileThunk, getProfileThunk } from "@/redux/features/profile/profileThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Actividad from "./actividad";
import Header from "../../components/perfil/HeaderPerfil";
import Profile from "./perfil";
import { EditarPerfil } from "./editarPerfil";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "@/components/antd/Loading";

const Perfil: React.FC = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams<{id: string}>()
    const [ segment, setSegment ] = useState('Perfil');
    const { userAuth } = useAppSelector(state => state.auth)
    const { perfil, isLoading } = useAppSelector(state => state.profile)

    const [ visitante, setVisitante ] = useState(false)

    useEffect(() => {
        if(id){
            setVisitante(true)
            dispatch(getProfileThunk(id))
        }else{
            setVisitante(false)
            if(userAuth){   
                dispatch(getProfileThunk(userAuth.id))
            }
        }

        return () => {
            dispatch(clearProfileThunk())
        }
    }, [userAuth, id])    
    

    
    if(isLoading){
        <Loading />
    }

    return ( 
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Header usuarioActivo={ perfil } segment={segment} setSegment={setSegment} visitante={visitante}  />
                { segment === 'Perfil' 
                    ? <Profile usuarioActivo={ perfil } visitante={visitante} /> 
                    : segment === 'Actividad' 
                    ? <Actividad visitante={visitante}/>
                    : segment === 'Configuración' 
                    ? <EditarPerfil usuarioActivo={ perfil } visitante={visitante}/> 
                    : null 
                }
            </motion.div>
        </>
    );
}
 
export default Perfil;