import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { PerfilProps } from "@/interfaces";
import { getEvaluacionThunk } from "@/redux/features/perfil/perfilThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Image, Rate, Segmented, Skeleton, Space, Steps } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useEffect, useState } from "react";
import { StepEvaluacion } from "./StepEvaluacion";


interface Props {
    perfil: PerfilProps
    year: number
    quarter: number
}

const FormEvaluacion = ({perfil, year, quarter}: Props) => {

    const [ activeEvaluate, setActiveEvaluate ] = useState<string | number>('')
    const { isLoadingEvaluation } = useAppSelector(state => state.profile)
    const [current, setCurrent] = useState(0);


    const dispatch = useAppDispatch()

    if(isLoadingEvaluation) return <Skeleton active={true} paragraph={{ rows: 4 }} />

    const usuariosAEvaluar = [...perfil.evaluaciones.usuariosColaborador, ...perfil.evaluaciones.usuariosLider]

    const options = usuariosAEvaluar?.map((usuario) => {
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


    const handleSelectUser = (value: SegmentedValue) => {        
        dispatch(getEvaluacionThunk({usuarioId: perfil.id, year, quarter, asignadorId: value as string }))
        setActiveEvaluate(value)
    }

    const items = perfil.evaluaciones.evaluacion?.preguntasEvaluacion.map((pregunta) => {
        let count = 0
        return {
            title: 'Pregunta', count: count++,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            value: count
        }
    })

    const next = () => {
        setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };


    return (
    <>
        <div>
            <div className="gap-5 grid">
                <Space align="center" size={12}>
                    <Segmented
                        options={options}
                        value={activeEvaluate}
                        onChange={handleSelectUser}

                    />
                </Space>
                {

                    perfil.evaluaciones.evaluacion.preguntasEvaluacion.length > 0 &&
                    <>
                        <div className="border rounded-ext">
                            <div className="p-5 shadow-ext rounded-ext from-dark to-dark-light bg-gradient-to-tr flex justify-between items-center">
                                <h1 className="text-white">{perfil.evaluaciones.evaluacion? perfil.evaluaciones.evaluacion.nombre : 'Sin evaluación'}</h1>
                                <Steps
                                    direction="vertical"
                                    initial={0}
                                    items={items}
                                    type="inline"
                                    current={0}
                                    onChange={(current) => setCurrent(current)}
                            />
                        </div>
                        <div className="p-5">
                            <StepEvaluacion pregunta={perfil.evaluaciones.evaluacion.preguntasEvaluacion[current]} />
                        </div>
                    </div>
                    </>
                }
            </div>
        </div>
    </> );
}
 
export default FormEvaluacion;