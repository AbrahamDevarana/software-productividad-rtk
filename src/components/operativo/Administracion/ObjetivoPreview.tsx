import { Comentarios } from "@/components/comentarios/Comentarios";
import { getColor, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useOperativo } from "@/hooks/useOperativo";
import { OperativoProps, SinglePerfilProps, TaskProps } from "@/interfaces";
import { Prioridad, styles, taskStatusTypes } from "@/types";
import { Avatar, Badge, DatePicker, Divider, Drawer, Image, Progress, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import { PiChatCircleDotsLight } from "react-icons/pi";


interface Props {
    objetivo: OperativoProps
    activeUsuario: SinglePerfilProps
}


const ObjetivoPreview = ({objetivo, activeUsuario}: Props) => {

    const { progresoReal, progresoAsignado } = useOperativo({objetivo})
    

    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);

    const handleCloseComentarios = () => {
        setSelectedTask(null)
    }

    return ( 
        <>
            <div className="overflow-y-auto"
            style={{
                height: 'calc(100vh - 200px)'
            }}
            >

                <div className='grid grid-cols-12 gap-x-10 p-5 border shadow-ext rounded-ext justify-between bg-gradient-to-tr from-dark to-dark-light'>
                    <div className='flex gap-x-10 col-span-9'>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-white'>{objetivo.nombre}</h1>
                            <p className='text-white'>{objetivo.meta}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-3 col-span-3 justify-end'>
                        <h2 className='font-light text-lg text-white'>Avance objetivo: </h2>
                        <p className='text-xl text-white'>
                            {
                                (objetivo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.progresoReal)?.toFixed(2)
                            } %
                        </p>
                    </div>
                </div>
                <div>
                    {/* Resultados y sus objetivos */}
                    {
                        objetivo.resultadosClave.map((resultado, index) => (
                            <>
                            <div key={index} className="p-3">
                                <div className='flex items-center gap-x-5 shadow p-2 rounded-ext'>
                                    <div className='flex flex-col w-full'>
                                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Resultado Clave</p>
                                        <p className="font-medium text-lg" style={{ color: resultado.color }}>{resultado.nombre}</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Responsable</p>
                                        <Tooltip title={`${resultado.propietario?.nombre} ${resultado.propietario?.apellidoPaterno}`} placement='top' >
                                            <Avatar src={<Image src={`${getStorageUrl(resultado.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                                {resultado.propietario?.iniciales} 
                                            </Avatar>
                                        </Tooltip>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Progreso</p>
                                        <Progress
                                            style={{
                                                width: '150px'
                                            }}
                                            className='drop-shadow progressStyle' strokeWidth={15} percent={Number(resultado.progreso.toFixed(2))}
                                            strokeColor={{
                                                '0%': getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').lowColor,
                                                '100%': getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').color,
                                                direction: 'to top',
                                            }}
                                            trailColor={ getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO', .5).color}                                       
                                        />
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Fecha Fin</p>
                                        <DatePicker
                                            format={"DD-MM-YYYY"}
                                            defaultValue={ dayjs(resultado.fechaFin)  }
                                            placeholder={ `${dayjs(resultado.fechaFin)}`}
                                            suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                                            className='w-[130px]'
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {
                                    resultado.task.map((task, index) => (
                                        <div key={index} className="flex gap-x-10 mx-5 py-2 items-center">
                                            <div className='flex items-center w-1/2'>
                                                <div className='border-2 rounded-full mr-2 h-10' style={{ borderColor: getColor(task.status).color }}/> 
                                                <div className="flex items-center w-full justify-between">
                                                    <h2 style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}
                                                    > {task.nombre} </h2>
                                                     <button onClick={() => setSelectedTask(task)} className='text-devarana-graph'>
                                                        <Badge 
                                                            count={task.comentarios?.length}
                                                            offset={[0, 20]}
                                                            size="small"
                                                            className="flex items-center justify-center"
                                                            styles={{
                                                                indicator: {
                                                                    display: 'flex',
                                                                    alignItems: 'end',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: '#56739B',
                                                                    height: '14px',
                                                                },
                                                            }}
                                                        >
                                                            <PiChatCircleDotsLight size={22} />
                                                        </Badge>
                                                    </button>
                                               </div>
                                            </div>
                                            <div className="flex items-center justify-end w-1/2 gap-x-10">
                                                <Tooltip title={`${task.propietario?.nombre} ${task.propietario?.apellidoPaterno}`}>
                                                    <Avatar src={<Image src={`${getStorageUrl(task.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                                                </Tooltip>
                                                <DatePicker
                                                    format={"DD-MM-YYYY"}
                                                    defaultValue={ dayjs(task.fechaFin)  }
                                                    showToday
                                                    clearIcon={null}
                                                    placeholder="Fecha Fin"
                                                    bordered={false}
                                                    name="fechaFin"
                                                    disabled={true}
                                                    suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                                                />
                                                <div
                                                    className="flex items-center justify-center py-1 px-2 rounded-sm cursor-pointer text-white font-medium drop-shadow-sm"
                                                    style={{
                                                        backgroundColor: styles[task.prioridad as Prioridad],
                                                        width: '100px'
                                                    }}
                                                >
                                                    { task.prioridad }
                                                </div>
                                                <div className="flex items-center justify-end gap-2 py-1 cursor-pointer">
                                                <div className={`shadow`}
                                                    style={{
                                                        width: '6px',
                                                        height: '6px',
                                                        borderRadius: '25%',
                                                        backgroundImage: `linear-gradient(to right, ${getColor(task.status).lowColor}, ${getColor(task.status).color})`,
                                                    }}
                                                >  </div>
                                                <p className='text-right py-1' style={{
                                                    color: getColor(task.status).color
                                                }}>  { taskStatusTypes[task.status] } </p>
                                                </div>  
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Divider />
                            </>
                        ))
                    }
                </div>
            </div>
            <Drawer
                title={<p className='text-devarana-graph'>Comentarios</p>}
                placement="right"
                closable={true}
                onClose={handleCloseComentarios}
                open={selectedTask !== null}
                width={ window.innerWidth > 768 ? 600 : '100%' }
            >
                {
                    selectedTask && <Comentarios comentableId={selectedTask?.id} comentableType={'TASK'} maxSize={'auto'}/>
                }
            </Drawer>
        </>
    );
}
 
export default ObjetivoPreview;