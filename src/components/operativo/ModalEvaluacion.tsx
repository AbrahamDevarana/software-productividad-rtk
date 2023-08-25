import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { PerfilProps } from "@/interfaces";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Image, Modal, Rate, Segmented, Space } from "antd";
import { useMemo, useState } from "react";
import { FaUserAlt } from "react-icons/fa";


interface Props {
    perfil: PerfilProps
    visible: boolean
    handleCancel: () => void
}

const ModalEvaluacion = ({perfil, visible, handleCancel,}: Props) => {

    const [activeEvaluate, setActiveEvaluate] = useState<string | number>('user1')
    const {userAuth} = useAppSelector(state => state.auth)
    const [evaluacion, setEvaluacion] = useState<any>({
        usuarioId: '',
        preguntas: []
    })
      

    const usuariosEvaluar = useMemo(() => {
        return perfil.evaluacionesRecibidas?.map((evaluacion) => {
            if(evaluacion.usuarioEvaluador.id !== userAuth.id){
                return evaluacion.usuarioEvaluador
            }
        })
    }, [perfil])

    // const usuariosEvaluadores = useMemo(() => {
    //     return perfil.evaluacionesRealizadas?.map((evaluacion) => {
    //         if(evaluacion.usuarioEvaluador.id !== userAuth.id){
    //             return evaluacion.usuarioEvaluador
    //         }
    //     })
    // }, [perfil])
            
    
    const options = usuariosEvaluar.map((usuario) => {
        if(usuario){
            return {
                label: (
                    <div style={{ padding: 4 }}>
                        <Avatar 
                            src={<Image src={`${getStorageUrl(usuario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                            className=''
                        >
                            {usuario?.iniciales}
                        </Avatar>
                        <div>{ usuario.nombre }</div>
                    </div>
                ),
                value: usuario.id
            }
        }else{
            return {
                label: 'Sin usuarios',
                value: 'user1'
            }
        }
    })

    return (
    <>
        <Modal
            open={visible}
            footer={null}
            width={800}
            closable={false}
            destroyOnClose={true}
            onCancel={handleCancel}
            title={  <h1 className='font-medium'> Evaluación competitiva </h1> }
        >
            <div>
                <div className="gap-5 grid">
                    <Space direction="vertical" align="center" size={12}>
                        <Segmented
                            options={options}
                            value={activeEvaluate}
                            onChange={setActiveEvaluate}

                        />
                    </Space>
                   <div className="border rounded-ext">
                        <table className="w-full">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="w-1/2">Competencia</th>
                                    <th className="w-1/2">Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="p-2">
                                    <td className="px-2">Competencia 1</td>
                                    <td>
                                        <Rate />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2">Competencia 2</td>
                                    <td>
                                        <Rate />
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td className="px-2">Competencia 3</td>
                                    <td>
                                        <Rate />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2">Competencia 4</td>
                                    <td>
                                        <Rate />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
                </div>
            </div>
        </Modal>
    </> );
}
 
export default ModalEvaluacion;