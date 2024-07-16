import React, { useMemo, useState } from 'react'
import { useCreateHitoMutation, useDeleteHitoMutation, useGetHitosQuery, useUpdateHitoMutation } from '@/redux/features/hitos/hitosThunk'
import { HitosProps, ProyectosProps, TaskProps } from '@/interfaces'
import { Checkbox, Collapse, ColorPicker, FloatButton, Form, Input, message, Popconfirm, Popover, Select, Tooltip } from 'antd'
import Loading from '@/components/antd/Loading'
import { Icon } from '@/components/Icon'
import { TablaTask } from './TablaTask'
import { BsThreeDots } from 'react-icons/bs'
import { BiTrash } from 'react-icons/bi'
import { FaCopy } from 'react-icons/fa'
import { priorityItems } from '@/components/tasks'

interface TableProyectosProps {
    currentProyecto: ProyectosProps
    setSelectedTask: (task: TaskProps) => void
    selectedTask: TaskProps | null
}

interface Options {
    responsables: string[];
    estatus: string[];
    prioridad: string[];
}


export const ListadoProyectos = ({currentProyecto, selectedTask, setSelectedTask}: TableProyectosProps) => {
    
    const [ createHito, { isLoading: isCreatingHito, error: createHitoError }] = useCreateHitoMutation()
    const [ updateHito, { isLoading: isUpdatingHito, error: updateHitoError }] = useUpdateHitoMutation()
    const [ deleteHito, { isLoading: isDeletingHito, error: deleteHitoError }] = useDeleteHitoMutation()

    // Filtros
    const [activeAll, setActiveAll] = useState<boolean>(true)
    const [search, setSearch] = useState<string>('')
    const [options, setOptions] = useState<Options>({
        responsables: [],
        estatus: [],
        prioridad: [],

    })

    
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
        await createHito(query).unwrap().then(( data ) => {
            message.success('Sección Creado')
            const element = document.getElementById(`hitos-${data.id}`)
            if(element) element.scrollIntoView({ behavior: 'smooth', block: 'end' })
            if(element) element.classList.add('ant-collapse-item-active')
        }).catch((error) => {
            message.error('Error al crear la sección')
        })

    };

    const handleDeleteHito = async (hito: HitosProps) => {
        await deleteHito({hitoId: hito.id, proyectoId: currentProyecto.id}).unwrap().then(() => {
            message.success('Sección Eliminada')
        }).catch((error) => {
            message.error('Error al eliminar la sección')
        })
    }
    
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
            <div className='flex items-center gap-x-5'>
                <Form 
                    layout='vertical'
                    className='w-full'
                    onClick={ e => e.stopPropagation()}
                >
                    <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Sección</p>
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
                
                
                <div className='flex items-center'>
                    <div className='flex flex-col items-center'>
                        <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Color</p>
                        <ColorPicker onChange={(color) => handleChangeColor(hito, color.toHexString())} defaultValue={hito.color} />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                <Popover
                    trigger="click"
                    content={<div className='flex gap-x-5'>
                        <Tooltip title="Eliminar Sección" >
                            <Popconfirm
                                title="¿Estás seguro de eliminar esta Sección?"
                                    onConfirm={() => handleDeleteHito(hito)}
                                    onCancel={() => {}}
                                    okText="Si"
                                    cancelText="No"
                                    placement="left"
                                    okButtonProps={{
                                        className: 'rounded-full mr-2 bg-primary'
                                    }}
                                    cancelButtonProps={{
                                        className: 'rounded-full mr-2 bg-error-light text-white'
                                    }}
                                >
                                    <BiTrash className='text-default text-right hover:text-error-light text-xl cursor-pointer' />
                                    
                                </Popconfirm>        
                            </Tooltip> 
                    </div>}
                >
                    <BsThreeDots className='text-devarana-babyblue text-2xl cursor-pointer' />
                </Popover>
                
                </div>
            </div>
    )

    const activeHitos = useMemo(() => {
        if (!hitos) return []

        if(activeAll) return hitos.map((hito: HitosProps) => hito.id)
        else return []

    }, [hitos, activeAll])

    const searchHitos = useMemo(() => {
        if(!hitos) return []

        if(search === '') return hitos
        // con regex que incluya mayusculas y minusculas, acentos y ñ
        const regex = new RegExp(search, 'i')
        return hitos.filter((hito: HitosProps) => regex.test(hito.titulo))
        
    }, [hitos, search])

    if(isLoading) return ( <Loading /> )
        
    return (
        <>
        <div className='flex gap-x-5 gap-y-1 items-center justify-end flex-wrap'>
            <div style={{width: 180}}>
                <Checkbox checked={activeAll} onChange={e => setActiveAll(e.target.checked)}>{ activeAll ? 'Ocultar' : 'Mostrar' } Secciones</Checkbox>
            </div>
            <Input placeholder='Buscar Sección' style={{width: 280}} onChange={e => setSearch(e.target.value)} />
            {/* <div style={{width: 280}}>
                <Select
                    dropdownStyle={{maxHeight: 400, overflow: 'auto', width: 150}}
                    style={{width: '100%'}}
                    mode='multiple'
                    maxTagCount={2}
                    placeholder='Filtrar por Prioridad'
                    className='w-full items-end justify-end cursor-pointer'
                    options={priorityItems}
                    suffixIcon={false}
                    maxTagPlaceholder={(omittedValues) => (
                        <span className='text-devarana-graph'>+{omittedValues.length}</span>
                    )}
                />

            </div>
            <Select placeholder='Filtrar por Estado'  style={{width: 280}}/>
            <Select placeholder='Filtrar por Responsable' style={{width: 280}} /> */}
        </div>
        <Collapse
            activeKey={activeHitos}
            ghost
        >
            {
                searchHitos && searchHitos.map((hito: HitosProps, index: number) => (
                    <Panel 
                        className="customResultadosPanel"
                        key={hito.id}
                        collapsible='icon'
                        id={`hitos-${hito.id}`}
                        header={genHeader(hito)}>
                        <TablaTask hito={hito} selectedTask={selectedTask} setSelectedTask={setSelectedTask} options={options} />
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
