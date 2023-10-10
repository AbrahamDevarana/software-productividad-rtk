import { getColor, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useOperativo } from "@/hooks/useOperativo";
import { OperativoProps, SinglePerfilProps } from "@/interfaces";
import { Prioridad, styles, taskStatusTypes } from "@/types";
import { Avatar, DatePicker, Image, Progress, Tooltip } from "antd";
import dayjs from "dayjs";


interface Props {
    objetivo: OperativoProps
    activeUsuario: SinglePerfilProps
}


const ObjetivoPreview = ({objetivo, activeUsuario}: Props) => {

    const { progresoReal, progresoAsignado } = useOperativo({objetivo})

    return ( 
        <div className="overflow-y-auto"
        style={{
            height: 'calc(100vh - 200px)'
        }}
        >

            <div className='flex gap-x-10 p-5 border shadow-ext rounded-ext justify-between bg-gradient-to-tr from-dark to-dark-light'>
				<div className='flex gap-x-10'>
					<div className='flex flex-col'>
						<h1 className='font-bold text-white'>{objetivo.nombre}</h1>
						<p className='text-white'>{objetivo.meta}</p>
					</div>
				</div>
				<div className='flex items-center gap-x-3'>
					<h2 className='font-light text-lg text-white'>Avance objetivo: </h2>
					<p className='text-2xl text-white'>
                        {
                            objetivo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.progresoReal
                        }
					</p>
				</div>
			</div>
            <div>
                {/* Resultados y sus objetivos */}
                {
                    objetivo.resultadosClave.map((resultado, index) => (
                        <div key={index} className="p-5">
                            <div className="bg-devarana-babyblue bg-opacity-10 px-5 py-2 flex gap-x-10 items-center justify-between">
                                <Tooltip title={resultado.nombre}>
                                    <h1
                                    className="w-1/2"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    >{resultado.nombre} </h1>
                                </Tooltip>
                                <Tooltip title={`${resultado.propietario?.nombre} ${resultado.propietario?.apellidoPaterno}`}>
                                    <Avatar style={{ width: '45px' }} size="large" src={<Image src={`${getStorageUrl(resultado.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                                </Tooltip>
                                <DatePicker size="small" value={dayjs(resultado.fechaFin)} disabled format={'DD-MM-YYYY'}/>
                                <Progress percent={resultado.progreso} className="max-w-xs my-3" />
                            </div>
                            {
                                resultado.task.map((task, index) => (
                                    <div key={index} className="flex gap-x-10 ml-10 py-2 items-center">
                                        <h2 className="w-1/2"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        > {task.nombre} </h2>
                                        <Tooltip title={`${task.propietario?.nombre} ${task.propietario?.apellidoPaterno}`}>
                                            <Avatar size="large" src={<Image src={`${getStorageUrl(task.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                                        </Tooltip>
                                        <p className='text-right py-1' style={{
                                            color: getColor(task.status).color
                                        }}>  { taskStatusTypes[task.status] } </p>
                                            <div
                                                className="flex items-center justify-center py-1 px-2 rounded-sm text-white font-medium drop-shadow-sm"
                                                style={{
                                                    backgroundColor: styles[task.prioridad as Prioridad]
                                                }}
                                            >
                                                { task.prioridad }
                                            </div>
                                        <DatePicker size="small" value={dayjs(task.fechaFin)} disabled format={'DD-MM-YYYY'}/>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default ObjetivoPreview;