import { useEffect, useMemo, useRef, useState } from 'react';
import { Form, DatePicker, Input, Select, Slider, Skeleton, MenuProps, Dropdown, Divider, Button, Space, Modal, Tabs, TabsProps, message, Tooltip, Switch } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeTypeProgressEstrategicoThunk, deleteEstrategicoThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks';
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
import { Comentarios } from '../general/Comentarios';
import { hasGroupPermission } from '@/helpers/hasPermission';



interface Props {
    handleCloseDrawer: () => void;
}


export const FormEstrategia= ({handleCloseDrawer}:Props) => {
    const dispatch = useAppDispatch()    
    const { currentConfig:{ year } } = useAppSelector(state => state.global)
    const { currentEstrategico, isLoadingCurrent, isLoadingProgress} = useAppSelector(state => state.estrategicos)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { permisos, userAuth } = useAppSelector(state => state.auth)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const [ statusEstrategico, setStatusEstrategico] = useState<statusType>(currentEstrategico.status);
    const [ viewMeta, setViewMeta] = useState<boolean>(false);
    const [ viewIndicador, setViewIndicador] = useState<boolean>(false);
    const [ comentariosCount , setComentariosCount ] = useState<number>(0)
    const [progreso, setProgreso] = useState<number>(0)

    const [form] = Form.useForm();

    
    
    
    const canEdit = useMemo(() => {
        return hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && currentEstrategico.propietario?.id === userAuth?.id
    }, [permisos])

    
    const inputRef = useRef<any>(null)

    const { confirm } = Modal;

    const { tagRender, spanUsuario } = useSelectUser(usuarios)
    

    const handleOnSubmit = () => {
        const query =  {
            ...currentEstrategico,
            ...form.getFieldsValue(),
            rangeDate: form.getFieldValue('rangeDate'),
            year: year,
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
                rangeDate: [dayjs(currentEstrategico.fechaInicio), dayjs(currentEstrategico.fechaFin)],
                tipoProgreso: "MANUAL",
                progreso: value,
                year: year,
            }
            // @ts-ignore
            dispatch(updateEstrategicoThunk(updateEstrategico));  
        }  
    }

    const handleChangeStatus = (value: statusType) => {  
        setStatusEstrategico(value); 
        const updateEstrategico = {
            ...currentEstrategico,
            status: value,
            rangeDate: [dayjs(currentEstrategico.fechaInicio), dayjs(currentEstrategico.fechaFin)],
            year: year,
        }
        
        dispatch(updateEstrategicoThunk(updateEstrategico));       
    }

    const handleChangePerspectiva = (value: string) => {
        const updateEstrategico = {
            ...currentEstrategico,
            perspectivaId: value,
            year: year,
            rangeDate: [dayjs(currentEstrategico.fechaInicio), dayjs(currentEstrategico.fechaFin)],
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
            children: ( <Comentarios comentableType='ESTRATEGICO' comentableId={currentEstrategico.id}/> )
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

    const handleSetTipo = (type: boolean) => {      
        dispatch(changeTypeProgressEstrategicoThunk({ estrategicoId: currentEstrategico.id, typeProgress: type ? 'PROMEDIO' : 'MANUAL' })).unwrap().then(() => {
            message.success('Tipo de progreso cambiado')
        })
    }
  
    
    const marks = {
        [currentEstrategico.suggest]: {
            style: {
                color: getColor(currentEstrategico.status).color,
                opacity: currentEstrategico.tipoProgreso === 'PROMEDIO' ? 1 : .3,
            },
            label: (
                <Tooltip title="Avance de objetivos operativos">
                    <p onClick={ () => handleSetTipo(true) } className='cursor-pointer'>
                        {currentEstrategico.suggest}%
                    </p>
                    
                </Tooltip>
            ),
                
        }
    };

    if(isLoadingCurrent) return <Skeleton paragraph={ { rows: 20 } } />

    
    return (
        <>

            <Form
                layout='vertical'
                initialValues={{
                    ...currentEstrategico,
                    responsables: currentEstrategico.responsables.map(responsable => responsable.id),
                    fechaInicio: dayjs(currentEstrategico.fechaInicio),
                    fechaFin: dayjs(currentEstrategico.fechaFin),
                    propietarioId: currentEstrategico.propietario?.id,
                    rangeDate: [dayjs(currentEstrategico.fechaInicio), dayjs(currentEstrategico.fechaFin)]
                }}
                form={form}
                
                className='w-full grid grid-cols-12 md:gap-x-5 editableForm'
                disabled={
                    canEdit
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
                                            checked = {currentEstrategico.tipoProgreso === 'PROMEDIO' ? true : false}
                                            title='Automatico'     
                                            disabled={isLoadingProgress}                                       
                                            onClick={handleSetTipo}
                                            style={{
                                                backgroundColor: currentEstrategico.tipoProgreso === 'PROMEDIO' ? '#656A76' : '#A6AFC3',
                                            }}
                                        />
                                        <p className='text-devarana-graph'> { currentEstrategico.tipoProgreso === 'PROMEDIO' ? 'Automático' : 'Manual' } </p>
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
                    label="Perspectiva: "
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
                                    className={`rounded-ext px-2 py-1 text-white font-bold transition-all duration-200 hover:scale-105`}
                                    style={{
                                        backgroundColor: currentEstrategico.perspectivaId === perspectiva.id? perspectiva.color: 'rgba(101,106,118, .5)',
                                    }}
                                > <span className='drop-shadow text-xs'>{ perspectiva.nombre }</span>
                                </button>
                            ))
                        }
                    </div>

                </Form.Item>
                <Form.Item
                    label="Duración: "
                    className='col-span-12'
                    name={'rangeDate'}
                >
                    <DatePicker.RangePicker
                        format={"YYYY"}
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
                            usuarios.map(usuario => (
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
                            usuarios.map(usuario => (
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
                <Button onClick={showDeleteConfirm} className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-20 hover:opacity-80' icon={<Icon iconName='faTrash' className='text-white text-sm'/> } /> 
                : null
            }


        </>
    )
}
