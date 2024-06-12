import { useEffect, useMemo, useRef, useState } from 'react';
import { Form, DatePicker, Input, Select, Slider, Skeleton, MenuProps, Dropdown, Divider, Button, Space, Modal, Tabs, TabsProps, message, Tooltip, Switch } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import { useChangeTypeProgressEstrategicoMutation, useDeleteEstrategicoMutation, useGetEstrategicoQuery, useUpdateEstrategicoMutation } from '@/redux/features/estrategicos/estrategicosThunk';
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks';
import { PerspectivaProps } from '@/interfaces';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TabStatus } from '@/components/ui/TabStatus';
import { Icon } from '@/components/Icon';
import { statusType } from '@/types';
import { getColor } from '@/helpers';
import { BsFillCalendarFill } from 'react-icons/bs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { Comentarios } from '@/components/general/Comentarios';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { useGetPerspectivasQuery } from '@/redux/features/perspectivas/perspectivasThunk';



interface Props {
    handleCloseDrawer: () => void;
    estrategicoId?: string;
}


export const FormEstrategia= ({handleCloseDrawer, estrategicoId}:Props) => {

    const { permisos, userAuth } = useAppSelector(state => state.auth)
    
    const { currentConfig:{ year } } = useAppSelector(state => state.global)
    const { data: perspectivas } = useGetPerspectivasQuery({year})
    const {  data: objetivosEstrategico, isLoading} = useGetEstrategicoQuery(estrategicoId as string, {
        skip: estrategicoId === undefined
    })
    
    const {data: usuarios} = useGetUsuariosQuery({status: 'ACTIVO'})
    const [ updateEstrategicoMutation, { isLoading: isUpdating } ] = useUpdateEstrategicoMutation()
    const [ changeTypeProgressEstrategicoMutation,{ isLoading: isChangingTypeProgress }] = useChangeTypeProgressEstrategicoMutation()
    const [ deleteEstrategicoMutation, { isLoading: isDeleting }] = useDeleteEstrategicoMutation()

    const [ statusEstrategico, setStatusEstrategico] = useState<statusType>(objetivosEstrategico?.status || 'SIN_INICIAR')
    const [ viewMeta, setViewMeta] = useState<boolean>(false);
    const [ viewIndicador, setViewIndicador] = useState<boolean>(false);
    const [ comentariosCount , setComentariosCount ] = useState<number>(0)
    const [progreso, setProgreso] = useState<number>(0)
    const [form] = Form.useForm();
    const inputRef = useRef<any>(null)
    const { confirm } = Modal;
    
    const canEdit = useMemo(() => {
        return hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && objetivosEstrategico?.propietario?.id === userAuth?.id
    }, [permisos, objetivosEstrategico])
    
    const { tagRender, spanUsuario } = useSelectUser(usuarios)


    const handleOnSubmit = () => {
        const query =  {
            ...objetivosEstrategico,
            ...form.getFieldsValue(),
            year: dayjs(form.getFieldValue('year')).year(),
        }

        delete query.status
        delete query.progreso
        
        if(query.id){            
            updateEstrategicoMutation(query).unwrap().then(() => {
                message.success('Estrategia actualizada')
            })
        }
    }

    useEffect(() => {
        if(objetivosEstrategico){
            setStatusEstrategico(objetivosEstrategico.status)
            setProgreso(objetivosEstrategico.progreso)
        }
    }, [objetivosEstrategico])

    useEffect(() => {
        objetivosEstrategico && setComentariosCount(objetivosEstrategico?.comentarios?.length)
    }, [objetivosEstrategico])

    if(!objetivosEstrategico) return <Skeleton paragraph={ { rows: 20 } } />
    
    const handleChangeProgreso = (value: number) => {
        
        if(objetivosEstrategico.id && objetivosEstrategico.progreso !== value){

            const updateEstrategico = {
                ...objetivosEstrategico,
                tipoProgreso: "MANUAL",
                progreso: value,
                year: dayjs(form.getFieldValue('year')).year(),
            }
            // @ts-ignore
            updateEstrategicoMutation(updateEstrategico).unwrap().then(() => {
                message.success('Progreso actualizado')
            })
        }  
    }

    const handleChangeStatus = (value: statusType) => {  
        setStatusEstrategico(value); 
        const updateEstrategico = {
            ...objetivosEstrategico,
            status: value,
            year: dayjs(form.getFieldValue('year')).year(),
        }
        
        updateEstrategicoMutation(updateEstrategico).unwrap().then(() => {
            message.success('Estatus actualizado')
        })   
    }

    const handleChangePerspectiva = (value: string) => {
        const updateEstrategico = {
            ...objetivosEstrategico,
            perspectivaId: value,
            year: dayjs(form.getFieldValue('year')).year(),
        }

        updateEstrategicoMutation(updateEstrategico).unwrap().then(() => {
            message.success('Perspectiva actualizada')
        })
    }


    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <button onClick={() => handleChangeStatus('SIN_INICIAR')}> <TabStatus status={'SIN_INICIAR'} /> </button>
          ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => handleChangeStatus('EN_TIEMPO')}> <TabStatus status={'EN_TIEMPO'} /> </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => handleChangeStatus('FINALIZADO')}> <TabStatus status={'FINALIZADO'} /> </button>
            ),
        },
        {
            key: '4',
            label: (
                <button onClick={() => handleChangeStatus('EN_PAUSA')}> <TabStatus status={'EN_PAUSA'} /> </button>
            ),
        },
        {
            key: '5',
            label: (
                <button onClick={() => handleChangeStatus('RETRASADO')}> <TabStatus status={'RETRASADO'} /> </button>
            ),
        },
        {
            key: '6',
            label: (
                <button onClick={() => handleChangeStatus('CANCELADO')}> <TabStatus status={'CANCELADO'} /> </button>
            ),
        },
    ]

    const itemTab: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <div className='flex gap-2 items-center justify-center'>
                    <p> Comentarios </p>
                    <div className='bg-gradient-to-t h-4 w-4 from-primary to-primary-light text-white rounded-full text-[11px] shadow-sm flex  items-center justify-center'>
                        {comentariosCount} 
                    </div>
                </div>
            ),
            children: ( <Comentarios comentableType='ESTRATEGICO' comentableId={objetivosEstrategico.id}/> )
        }
    ]

    const showDeleteConfirm = () => {
        confirm({
            title: (<p className='text-devarana-graph'>¿Estas seguro de eliminar esta estrategia?</p>),
            content: (<p className='text-devarana-graph'>Una vez eliminado no podras recuperarlo</p>),
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                deleteEstrategicoMutation(objetivosEstrategico.id).unwrap().then(() => {
                    message.success('Estrategia eliminada')
                    handleCloseDrawer()
                })
            }
        });
    }

    const handleSetTipo = (type: boolean) => {      
        const typeProgress = type ? 'PROMEDIO' : 'MANUAL'

        changeTypeProgressEstrategicoMutation({estrategicoId: objetivosEstrategico.id, typeProgress}).unwrap().then(() => {
            message.success('Tipo de progreso actualizado')
        })
    }
  
    
    const marks = {
        [objetivosEstrategico.suggest]: {
            style: {
                color: getColor(objetivosEstrategico.status).color,
                opacity: objetivosEstrategico.tipoProgreso === 'PROMEDIO' ? 1 : .3,
            },
            label: (
                <Tooltip title="Avance de objetivos operativos">
                    <p onClick={ () => handleSetTipo(true) } className='cursor-pointer'>
                        {objetivosEstrategico.suggest}%
                    </p>
                    
                </Tooltip>
            ),
                
        }
    };

    if(isLoading) return <Skeleton paragraph={ { rows: 20 } } />
    

    return (
        <>

            <Form
                layout='vertical'
                initialValues={{
                    ...objetivosEstrategico,
                    responsables: objetivosEstrategico.responsables.map(responsable => responsable.id),
                    propietarioId: objetivosEstrategico.propietario?.id,
                    year: dayjs(`${objetivosEstrategico.year}-01-01`)
                }}
                form={form}
                className='w-full grid grid-cols-12 md:gap-x-5 editableForm'
                disabled={
                    canEdit || isUpdating
                }
            >
        
                <Form.Item
                    label="Objetivo: "
                    className='col-span-10'
                    name={'nombre'}
                >
                    <Input
                        className='text-2xl'
                        bordered={false}
                        ref={inputRef}
                        onPressEnter={ () => inputRef.current?.blur() }
                        onBlur={handleOnSubmit}
                    />
                </Form.Item>
                <Form.Item
                    label="Código: "
                    className='col-span-2'
                    name={'codigo'}
                >
                    <Input
                        bordered={false}
                        name="codigo"
                        className='text-2xl'
                        ref={inputRef}
                        onPressEnter={ () => inputRef.current?.blur() }
                        onBlur={handleOnSubmit}
                    />
                </Form.Item>
                <Space className={`${ form.getFieldValue('id') === ''? 'hidden': 'block'} col-span-12`}>
                    <Divider className='my-3'  />
                    <Form.Item
                    >

                        <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Progreso: </p>
                            <div className='flex gap-x-2'>
                                <div className='ml-auto flex gap-x-5'>
                                    <div className='flex gap-2 items-center ml-auto'>
                                        <Switch size='small'
                                            className='disabled:cursor-wait'
                                            checked = {objetivosEstrategico.tipoProgreso === 'PROMEDIO' ? true : false}
                                            title='Automatico'     
                                            disabled={isUpdating}                                       
                                            onClick={handleSetTipo}
                                            style={{
                                                backgroundColor: objetivosEstrategico.tipoProgreso === 'PROMEDIO' ? '#656A76' : '#A6AFC3',
                                            }}
                                        />
                                        <p className='text-devarana-graph'> { objetivosEstrategico.tipoProgreso === 'PROMEDIO' ? 'Automático' : 'Manual' } </p>
                                    </div>
                                    <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                                            <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                                <TabStatus status={statusEstrategico} />
                                            </button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className='inline-flex w-full'>
                            <p className='text-3xl font-bold pr-2' style={{ 
                                color: getColor(objetivosEstrategico.status).color,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundImage: `linear-gradient(to top, ${getColor(objetivosEstrategico.status).lowColor}, ${getColor(objetivosEstrategico.status).color})`
                            }}> { objetivosEstrategico.progreso }% </p>
                            <Slider
                                className='drop-shadow progressStyle w-full'
                                min={0}
                                value={progreso}
                                max={100}
                                marks={marks}
                                onChange={ (value ) => {
                                    hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) &&
                                    setProgreso(value)
                                }}
                                onAfterChange={ (value ) => {
                                    hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && handleChangeProgreso(value)
                                    setProgreso(value)
                                } }
                                trackStyle={{
                                    backgroundColor: getColor(objetivosEstrategico.status).color,
                                    borderRadius: 10,

                                }}
                                railStyle={{
                                    backgroundColor: getColor(objetivosEstrategico.status, .3).color,
                                    borderRadius: 10,
                                }}
                                handleStyle={{
                                    borderColor: getColor(objetivosEstrategico.status).color,
                                }}
                            />
                        </div>
                    </Form.Item>
                    <Divider className='my-3' />
                </Space>
                <Form.Item
                    label="Perspectiva: "
                    className='col-span-12 mt-5'
                >
                    <div className='flex flex-wrap gap-3'>
                        {
                            perspectivas && perspectivas.map((perspectiva: PerspectivaProps) => (
                                <button 
                                    type='button'
                                    disabled={isUpdating}
                                    onClick={() => {
                                        hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && handleChangePerspectiva(perspectiva.id)
                                    }}
                                    key={perspectiva.id} 
                                    className={`rounded-ext px-2 py-1 text-white font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    style={{
                                        backgroundColor: objetivosEstrategico.perspectivaId === perspectiva.id? perspectiva.color: 'rgba(101,106,118, .5)',
                                    }}
                                > <span className='drop-shadow text-xs'>{ perspectiva.nombre }</span>
                                </button>
                            ))
                        }
                    </div>

                </Form.Item>
                <Form.Item
                    label="Periodo: "
                    className='col-span-12'
                    name='year'
                >
                    <DatePicker
                        className='w-1/2'
                        picker='year'
                        clearIcon={false}
                        ref={inputRef}
                        suffixIcon={ <BsFillCalendarFill className='text-devarana-babyblue' /> }
                        onChange={handleOnSubmit}
                    />
                </Form.Item>
                <Form.Item
                    label="Responsable:"
                    className='col-span-6'
                    name='propietarioId'
                >
                    <Select
                        style={{ height: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        showSearch
                        size='large'
                        bordered = {false}
                        onChange={handleOnSubmit}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Co-Responsables:"
                    className='col-span-6'
                    name='responsables'
                >

                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"                      
                        allowClear
                        bordered = {false}
                        tagRender={tagRender}
                        onChange={handleOnSubmit}
                        maxLength={3}
                        showSearch
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            )).filter( usuario => usuario.key !== form.getFieldValue('propietarioId') )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="descripcion"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Meta:</p>                            
                    </div>
                    {
                        viewMeta 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('descripcion')}
                                onChange={(value) => form.setFieldsValue({descripcion: value}) }
                                onBlur={ () => {
                                    handleOnSubmit(); setViewMeta(false)
                                }}
                                readOnly={!hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' 
                        dangerouslySetInnerHTML={{ __html: form.getFieldValue('descripcion')}}
                        onClick={() => {
                            hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos) && setViewMeta(!viewMeta)
                        }}
                        ></div> )
                    }
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="indicador"
                >
                    <div className='flex justify-between items-center'>
                        <p className='text-devarana-graph font-medium'>Indicador:</p>
                    </div>
                    {
                        viewIndicador 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('indicador')}
                                onChange={(value) => form.setFieldsValue({indicador: value}) }
                                onBlur={ () => {
                                    handleOnSubmit(); setViewIndicador(false)
                                }}
                                
                                readOnly={!hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' 
                            dangerouslySetInnerHTML={{ __html: form.getFieldValue('indicador')}}
                            onClick={() => {
                                hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos) && setViewIndicador(!viewIndicador)
                            }}
                            ></div> )
                    }
                </Form.Item>
                <div className='col-span-12'>
                    <Tabs defaultActiveKey='1' items={itemTab} className='text-devarana-graph active:text-devarana-dark-graph'
                        onClick={ ( e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                    </Tabs>
                </div>

                
            </Form>

            {
                hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) ?
                <Button onClick={showDeleteConfirm} className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-20 group transition-all duration-200 ease-in-out hover:scale-110 z-50' icon={<Icon iconName='faTrash' className='text-white group-hover:text-error-light  text-sm'/> } /> 
                : null
            }


        </>
    )
}
