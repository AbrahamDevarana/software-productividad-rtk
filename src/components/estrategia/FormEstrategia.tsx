import { useEffect, useRef, useState } from 'react';
import { Form, DatePicker, Input, Select, Slider, Skeleton, MenuProps, Dropdown, Divider, Button, Space, Modal, Tabs, TabsProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteEstrategicoThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import dayjs from 'dayjs';
import { PerspectivaProps } from '@/interfaces';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TabStatus } from '../ui/TabStatus';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { statusType } from '@/types';
import { getColor } from '@/helpers';
import { BsFillCalendarFill } from 'react-icons/bs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { Comentarios } from '../general/Comentarios';
import { hasGroupPermission } from '@/helpers/hasPermission';



interface Props {
    handleCloseDrawer: () => void;
}


export const FormEstrategia= ({handleCloseDrawer}:Props) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { currentEstrategico, isLoadingCurrent } = useAppSelector(state => state.estrategicos)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const {permisos} = useAppSelector(state => state.auth)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const [ statusEstrategico, setStatusEstrategico] = useState<statusType>(currentEstrategico.status);
    const [ viewMeta, setViewMeta] = useState<boolean>(false);
    const [ viewIndicador, setViewIndicador] = useState<boolean>(false);
    const [ comentariosCount , setComentariosCount ] = useState<number>(0)
    const [progreso, setProgreso] = useState<number>(0)

    const [form] = Form.useForm();
    
    const inputRef = useRef<any>(null)
    const { confirm } = Modal;

    const { tagRender, spanUsuario } = useSelectUser(usuarios)
    

    const handleOnSubmit = () => {
        const query =  {
            ...currentEstrategico,
            ...form.getFieldsValue(),
        }

        delete query.status
        delete query.progreso
        
        if(query.id){            
            dispatch(updateEstrategicoThunk(query))
        }
    }

    useEffect(() => {
        dispatch(getUsuariosThunk({})) 
    }, [])

    useEffect(() => {
        if(currentEstrategico.id !== ''){
            setStatusEstrategico(currentEstrategico.status)
            setProgreso(currentEstrategico.progreso)
        }
    }, [currentEstrategico])


    const handleChangeProgreso = (value: number) => {
        
        if(currentEstrategico.id && currentEstrategico.progreso !== value){

            const updateEstrategico = {
                ...currentEstrategico,
                progreso: value
            }
            dispatch(updateEstrategicoThunk(updateEstrategico));  
        }  
    }

    const handleChangeStatus = (value: statusType) => {  
        setStatusEstrategico(value); 
        const updateEstrategico = {
            ...currentEstrategico,
            status: value
        }
        
        dispatch(updateEstrategicoThunk(updateEstrategico));       
    }

    const handleChangePerspectiva = (value: string) => {
        const updateEstrategico = {
            ...currentEstrategico,
            perspectivaId: value
        }
        dispatch(updateEstrategicoThunk(updateEstrategico));
    }

    useEffect(() => {
        setComentariosCount(currentEstrategico.comentarios?.length)
    }, [currentEstrategico.comentarios])
    

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

    const handleView = (id:string) => {
        navigate(`/estrategia/${id}`)
    }

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
            children: ( <Comentarios setComentariosCount={setComentariosCount} comentableType='ESTRATEGICO' comentableId={currentEstrategico.id}/> )
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
                await dispatch(deleteEstrategicoThunk(currentEstrategico.id))
                handleCloseDrawer()
            }
        });
    }

    if(isLoadingCurrent) return <Skeleton paragraph={ { rows: 20 } } />

    return (
        <>

            <Form
                layout='vertical'
                initialValues={{
                    ...currentEstrategico,
                    responsables: currentEstrategico.responsables.map(responsable => responsable.id),
                    fechaInicio: dayjs(currentEstrategico.fechaInicio).add(6, 'hour'),
                    fechaFin: dayjs(currentEstrategico.fechaFin).add(6, 'hour'),
                    propietarioId: currentEstrategico.propietario?.id,
                }}
                form={form}
                onBlur={handleOnSubmit}
                className='w-full grid grid-cols-12 md:gap-x-5 editableForm'
                disabled={
                    hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) ? false : true
                }
            >
        
                <Form.Item
                    label="Objetivo"
                    className='col-span-10'
                    name={'nombre'}
                >
                    <Input
                        className='text-2xl'
                        bordered={false}
                        ref={inputRef}
                        onPressEnter={ () => inputRef.current?.blur() }
                    />
                </Form.Item>
                <Form.Item
                    label="Código"
                    className='col-span-2'
                    name={'codigo'}
                >
                    <Input
                        bordered={false}
                        name="codigo"
                        className='text-2xl'
                        ref={inputRef}
                        onPressEnter={ () => inputRef.current?.blur() }
                    />
                </Form.Item>
                <Space className={`${ form.getFieldValue('id') === ''? 'hidden': 'block'} col-span-12`}>
                    <Divider className='my-3'  />
                    <Form.Item
                    >

                        <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Progreso</p>
                            <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                                    <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                        <TabStatus status={statusEstrategico} />
                                    </button>
                            </Dropdown>
                        </div>
                        <div className='inline-flex w-full'>
                            <p className='text-3xl font-bold pr-2' style={{ 
                                color: getColor(currentEstrategico.status).color,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundImage: `linear-gradient(to top, ${getColor(currentEstrategico.status).lowColor}, ${getColor(currentEstrategico.status).color})`
                            }}> { currentEstrategico.progreso }% </p>
                            <Slider
                                className='drop-shadow progressStyle w-full'
                                min={0}
                                value={progreso}
                                max={100}
                                onChange={ (value ) => {
                                    hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) &&
                                    setProgreso(value)
                                }}
                                onAfterChange={ (value ) => {
                                    hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && handleChangeProgreso(value)
                                    setProgreso(value)
                                } }
                                trackStyle={{
                                    backgroundColor: getColor(currentEstrategico.status).color,
                                    borderRadius: 10,

                                }}
                                railStyle={{
                                    backgroundColor: getColor(currentEstrategico.status, .3).color,
                                    borderRadius: 10,
                                }}
                                handleStyle={{
                                    borderColor: getColor(currentEstrategico.status).color,
                                }}
                            />
                        </div>
                    </Form.Item>
                    <Divider className='my-3' />
                </Space>
                <Form.Item
                    label="Perspectiva"
                    className='col-span-12 mt-5'
                >
                    <div className='flex flex-wrap gap-3'>
                        {
                            perspectivas && perspectivas.map((perspectiva: PerspectivaProps) => (
                                <button 
                                    type='button'
                                    onClick={() => {
                                        hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && handleChangePerspectiva(perspectiva.id)
                                    }}
                                    key={perspectiva.id} 
                                    className={`rounded-ext px-2 py-1 text-white font-bold hover:transform transition-all duration-200 hover:scale-105`}
                                    style={{
                                        backgroundColor: currentEstrategico.perspectivaId === perspectiva.id? perspectiva.color: 'rgba(101,106,118, .5)',
                                    }}
                                > <span className='drop-shadow'>{ perspectiva.nombre }</span>
                                </button>
                            ))
                        }
                    </div>

                </Form.Item>
                <Form.Item
                    label="Fecha de inicio"
                    className='col-span-6'
                    name={'fechaInicio'}
                >
                    <DatePicker
                        format={"DD-MM-YYYY"}
                        className='w-full'
                        clearIcon={false}
                        ref={inputRef}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Fecha de fin"
                    className='col-span-6'
                    name={'fechaFin'}
                >
                    <DatePicker
                        format={"DD-MM-YYYY"}
                        className='w-full'
                        clearIcon={false}
                        ref={inputRef}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Propietario"
                    className='col-span-6'
                    name='propietarioId'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        bordered = {false}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.children!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id}>{ spanUsuario(usuario) }</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Co-Responsables"
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
                        maxLength={3}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.children!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id}>{ spanUsuario(usuario) }</Select.Option>
                            )).filter( usuario => usuario.key !== form.getFieldValue('propietarioId') )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="descripcion"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Meta</p>
                            <button onClick={() => {
                                hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos) && setViewMeta(!viewMeta)
                            }} className='font-bold text-devarana-graph' type='button'>
                                {
                                    viewMeta ? <FaSave /> : <FaEdit />
                                }
                            </button>
                            
                    </div>
                    {
                        viewMeta 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('descripcion')}
                                onChange={(value) => form.setFieldsValue({descripcion: value}) }
                                onBlur={handleOnSubmit}
                                readOnly={!hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' dangerouslySetInnerHTML={{ __html: form.getFieldValue('descripcion')}}></div> )
                    }
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="indicador"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Indicador</p>
                            <button onClick={() => {
                                hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos) && setViewIndicador(!viewIndicador)
                            }} className='font-bold text-devarana-graph' type='button'>
                                {
                                    viewIndicador ? <FaSave /> : <FaEdit />
                                }
                            </button>
                            
                    </div>
                    {
                        viewIndicador 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('indicador')}
                                onChange={(value) => form.setFieldsValue({indicador: value}) }
                                onBlur={handleOnSubmit}
                                readOnly={!hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar estrategias'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' dangerouslySetInnerHTML={{ __html: form.getFieldValue('indicador')}}></div> )
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

                {/* <button onClick={showDeleteConfirm} className='bg-red-500 py-1 px-2 rounded-l-full flex items-center gap-x-2 right-0 absolute top-10 transition-all duration-500 translate-x-[58px] hover:translate-x-0'>
                    
                    <span className='text-white'>Eliminar</span> 
                </button> */}
            {/* <Button onClick={()=>handleView(currentEstrategico.id)} className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-10 hover:opacity-80' icon={<Icon iconName='faArrowLeft' className='text-white' />} />  */}
            <Button onClick={showDeleteConfirm} className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-20 hover:opacity-80' icon={<Icon iconName='faTrash' className='text-white text-xs'/> } /> 


        </>
    )
}
