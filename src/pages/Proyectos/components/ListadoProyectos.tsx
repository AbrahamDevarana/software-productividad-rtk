import React, { useMemo } from 'react'
import { useCreateHitoMutation, useDeleteHitoMutation, useGetHitosQuery, useUpdateHitoMutation } from '@/redux/features/hitos/hitosThunk'
import { HitosProps, ProyectosProps, TaskProps } from '@/interfaces'
import { Collapse, ColorPicker, FloatButton, Form, Input, message, Popconfirm } from 'antd'
import Loading from '@/components/antd/Loading'
import { Icon } from '@/components/Icon'
import { TablaTask } from './TablaTask'

interface TableProyectosProps {
    currentProyecto: ProyectosProps
    setSelectedTask: (task: TaskProps) => void
    selectedTask: TaskProps | null
}


export const ListadoProyectos = ({currentProyecto, selectedTask, setSelectedTask}: TableProyectosProps) => {
        
    const [ createHito, { isLoading: isCreatingHito, error: createHitoError }] = useCreateHitoMutation()
    const [ updateHito, { isLoading: isUpdatingHito, error: updateHitoError }] = useUpdateHitoMutation()
    const [ deleteHito, { isLoading: isDeletingHito, error: deleteHitoError }] = useDeleteHitoMutation()
    
    const { data: hitos, isLoading} = useGetHitosQuery({proyectoId: currentProyecto.id})
    const { Panel } = Collapse;


    const handleChangeHito = async (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => {

        const { value } = e.target as HTMLInputElement

        if(value === hito.titulo) return
        if(value === '') return e.currentTarget.focus()
        if(!value) return e.currentTarget.focus()

        const query = {
            ...hito,
            titulo: value
        }

        await updateHito(query).unwrap().then(() => {
            message.success('Hito Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el hito')
        })
    };

    const handleCreateHito = async () => {
        const query = {
            proyectoId: currentProyecto.id,
        }
        await createHito(query).unwrap().then(() => {
            message.success('Hito Creado')
        }).catch((error) => {
            message.error('Error al crear el hito')
        })

    };

    const handleDeleteHito = async (hito: HitosProps) => {
        await deleteHito({hitoId: hito.id, proyectoId: currentProyecto.id}).unwrap().then(() => {
            message.success('Hito Eliminado')
        }).catch((error) => {
            message.error('Error al eliminar el hito')
        })
    }
    
    const activeHitos = useMemo(() => {
        if (!hitos) return []
        return hitos.map((hito: HitosProps) => hito.id)
    }, [hitos])

    const handleChangeColor = (hito: HitosProps, color: string) => {
      
        const query = {
            ...hito,
            color: color
        }


        

        updateHito(query).unwrap().then(() => {
            message.success('Color Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el color')
        })
    }

    const genHeader = (hito: HitosProps) => (
            <div className='flex items-center justify-between'>
                <Form 
                    layout='vertical'
                    className='w-[350px]'
                    onClick={ e => e.stopPropagation()}
                >
                    <Form.Item
                        name='titulo'
                        className='mb-0'
                        >
                        <Input
                            style={{
                                color: hito.color
                            }}
                            className="rs-input border-none bg-transparent hover:bg-white hover:drop-shadow-sm font-medium text-lg disabled:bg-transparent"
                            onBlur={ e => handleChangeHito(hito, e) } 
                            defaultValue={hito.titulo}
                            name='titulo'
                            onPressEnter={ (e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    e.currentTarget.blur()
                                }
                            }
                        />
                    </Form.Item>
                </Form>
                
                
                <div className='flex gap-10'>
                    {/* <div className='flex flex-col items-start'>
                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Progreso</p>
                        <Progress
                            style={{
                                width: '150px',
                            }}
                            className='drop-shadow progressStyle' strokeWidth={15} percent={Number(hito.progreso?.toFixed(2))}
                            strokeColor={{
                                '0%': getColor(hito.progreso === 0 ? 'SIN_INICIAR' : hito.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').lowColor,
                                '100%': getColor(hito.progreso === 0 ? 'SIN_INICIAR' : hito.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').color,
                                direction: 'to top',
                            }}
                            trailColor={ getColor(hito.progreso === 0 ? 'SIN_INICIAR' : hito.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO', .5).color}      
                            format={() => <CountUp style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#fff'
                            }} end={hito.progreso} duration={1} suffix='%' decimals={2} decimal='.' />}                                 
                        />
                    </div> */}
                    <div className='flex flex-col items-center'>
                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Color</p>
                        <ColorPicker onChange={(color) => handleChangeColor(hito, color.toHexString())} defaultValue={hito.color} />
                    </div>
                    <div className='flex items-center justify-start flex-col'>
                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Acciones</p>
                        <Popconfirm 
                            title="¿Estás seguro de eliminar este Hito?"
                            onConfirm={ () => handleDeleteHito(hito)}
                            okText="Si"
                            cancelText="No"
                        >
                            <button className='text-devarana-midnight'>
                                <Icon iconName='faTrash' className='text-lg pt-1'/>
                            </button>
                        </Popconfirm>
                    </div>
                </div>
            </div>
    )

    if(isLoading) return ( <Loading /> )
    return (
        <>
        <Collapse
            defaultActiveKey={activeHitos}
            ghost
        >
            {
                hitos && hitos.map((hito: HitosProps, index: number) => (
                    <Panel 
                        className="customResultadosPanel"
                        key={hito.id}
                        collapsible='icon'
                        id={`hitos-${hito.id}`}
                        header={genHeader(hito)}>
                        <TablaTask hito={hito} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                    </Panel>
                )) 
            }
        </Collapse>


        <FloatButton
            onClick={handleCreateHito}
            icon={<Icon iconName='faPlus' />}
            type="primary"
        />
        </>
    )
}
