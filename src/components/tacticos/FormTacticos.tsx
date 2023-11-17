
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks';
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { changeTypeProgressThunk, deleteTacticoThunk, updateTacticoThunk, updateTacticoTypeThunk } from '@/redux/features/tacticos/tacticosThunk';
import { PerspectivaProps, UsuarioProps } from '@/interfaces';
import { Form, Input, Select, Radio, Divider, RadioChangeEvent, Skeleton, Dropdown, Slider, MenuProps, TabsProps, Tabs, Button, Modal, DatePicker, message, Switch, Tooltip, Spin } from 'antd';
import dayjs from 'dayjs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { TabStatus } from '../ui/TabStatus';
import { getColor } from '@/helpers';
import { statusType } from '@/types';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import ReactQuill from 'react-quill';
import { Comentarios } from '../general/Comentarios';
import { Icon } from '../Icon';
import { DefaultOptionType } from 'antd/es/select';
import { BsFillCalendarFill } from 'react-icons/bs';

interface FormTacticoProps {
    handleCloseDrawer: () => void
    year: number
    slug?: string
}

export const FormTactico:React.FC<FormTacticoProps> = ({handleCloseDrawer, year, slug}) => {

    const inputRef = useRef<any>(null)
    const  dispatch = useAppDispatch()
    const { currentTactico, isLoadingCurrent, isLoadingProgress} = useAppSelector(state => state.tacticos)
    const { comentarios } = useAppSelector(state => state.comentarios)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { estrategicos, isLoading:isLoadingEstrategico } = useAppSelector(state => state.estrategicos)
    const { permisos} = useAppSelector(state => state.auth)
    const [ selectedPerspectiva, setSelectedPerspectiva] = useState<string>()
    const [ isEstrategico, setIsEstrategico] = useState(false)
    const [ viewMeta, setViewMeta] = useState<boolean>(false);
    const [ viewIndicador, setViewIndicador] = useState<boolean>(false);
    const [ suggest, setSuggest ] = useState<number>(99)


    const [progreso, setProgreso] = useState<number>(0)
    const [ statusTactico, setStatusTactico] = useState<statusType>('SIN_INICIAR');

    const [form] = Form.useForm()
    const { confirm } = Modal;

    const { tagRender, spanUsuario } = useSelectUser(usuarios)

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
        dispatch(getEstrategicosThunk({year}))
        dispatch(getPerspectivasThunk({}))
    }, [])
    
    useEffect(() => {
        if(currentTactico.id === '') return
        setSelectedPerspectiva(currentTactico.estrategico?.perspectivaId)
    }, [currentTactico])
    
    const handleOnSubmit = () => {        
        if(hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true) return


        if(form.getFieldsError().filter(({ errors }) => errors.length).length) return

        
        const query = {
            ...currentTactico,
            ...form.getFieldsValue(),
            year,
            slug,
        }
        if(!isEstrategico){
            query.estrategicoId = null
        }

        delete query.status
        delete query.progreso
    
        dispatch(updateTacticoThunk(query))
    }

    const optEstrategicos = useMemo(() => {

        // buscar estrategicos que sean de la perspectiva seleccionada
        const estrategicosFiltrados = estrategicos.filter(estrategico => estrategico.perspectivaId === selectedPerspectiva)

        return estrategicosFiltrados.map(estrategico => {
            return {
                label: <p className='text-devarana-graph'>{estrategico.nombre}</p>,
                value: estrategico.id,
                dataName: estrategico.nombre
            }
        })

    }, [selectedPerspectiva, isLoadingEstrategico])
   
    const handleChangeTipoEstrategia =  async (e: RadioChangeEvent) => {

        if(!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)) return

        if(!e.target.value){
            confirm({
                title: (<p className='text-devarana-graph'>¿Estas seguro de cambiar el tipo de objetivo?</p>),
                content: (<p className='text-devarana-graph'>Al cambiar el tipo de objetivo se perderá la relación con el objetivo estratégico</p>),
                okText: 'Si',
                okType: 'danger',
                cancelText: 'No',
                async onOk() {
                    setIsEstrategico(e.target.value)
                    setSelectedPerspectiva(undefined)
                    await dispatch(updateTacticoTypeThunk({ tacticoId: currentTactico.id, type: 'CORE' })).unwrap().then(() => {
                        message.success('Tipo de objetivo cambiado')
                    })
                }
            });
        }else{
            setIsEstrategico(e.target.value)
        }

    }

    useEffect(() => {
        if(!currentTactico.id) return

        if(currentTactico.estrategicoId){
            setIsEstrategico(true)
        }
        
        setStatusTactico(currentTactico.status);
        setProgreso(currentTactico.progreso)

    }, [currentTactico])

    const handleChangeProgreso = (value: number) => {
        
        if(currentTactico.id && currentTactico.progreso !== value){
            const updateTactico = {
                ...currentTactico,
                ...form.getFieldsValue(),
                tipoProgreso: 'MANUAL',
                progreso: value,
                year,
                slug
            }
            dispatch(updateTacticoThunk(updateTactico));  
        }  
    }

    const handleChangeStatus = (value: statusType) => {  
        setStatusTactico(value); 
        const updateTactico = {
            ...currentTactico,
            ...form.getFieldsValue(),
            status: value,
            year,
            slug
        }
        
        dispatch(updateTacticoThunk(updateTactico));       
    }

    const handleSelectPerspectiva = (value: string) => {
        form.setFieldsValue({estrategicoId: undefined})
        setSelectedPerspectiva(value)
    }

    const handleChangePerspectiva = async (e: string) => {
        await dispatch(updateTacticoTypeThunk({ tacticoId: currentTactico.id, type: 'ESTRATEGICO', estrategicoId: e })).unwrap().then(() => {
            message.success('Tipo de objetivo cambiado')
        })
    }
    

    const comentariosCount = useMemo(() => {
        return comentarios.length || 0
    }, [comentarios])

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
            children: ( <Comentarios comentableType='TACTICO' comentableId={currentTactico.id}/> )
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
                await dispatch(deleteTacticoThunk(currentTactico.id))
                handleCloseDrawer()
            }
        });
    }


    if ( isLoadingCurrent || isLoadingEstrategico ){
        return <div className='flex justify-center items-center h-full'> <Spin size='large' /> </div>
    }
    

    const handleSetTipo = (type: boolean) => {        
        dispatch(changeTypeProgressThunk({ tacticoId: currentTactico.id, type: type ? 'PROMEDIO' : 'MANUAL' })).unwrap().then(() => {
            message.success('Tipo de progreso cambiado')
        })
        
    }
  
    
    const marks = {
        [currentTactico.suggest]: {
            style: {
                color: getColor(currentTactico.status).color,
                opacity: currentTactico.tipoProgreso === 'PROMEDIO' ? 1 : .3,
            },
            label: (
                <Tooltip title="Avance de objetivos operativos">
                    <p onClick={ () => handleSetTipo(true) } className='cursor-pointer'>
                        {currentTactico.suggest}%
                    </p>
                    
                </Tooltip>
            ),
                
        }
    };


    return (
        <>
            <Form
                onFinish={handleOnSubmit}
                layout='vertical'
                className='grid grid-cols-12 gap-x-5'
                form={form}
                scrollToFirstError
                disabled={
                    hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true
                }
                initialValues={{
                    ...currentTactico,
                    propietarioId: currentTactico.propietarioId,
                    fechaInicio: dayjs(currentTactico.fechaInicio),
                    fechaFin: dayjs(currentTactico.fechaFin),
                    responsables: currentTactico.responsables?.map(responsable => responsable.id),
                    proyeccion: [dayjs(currentTactico.fechaInicio), dayjs(currentTactico.fechaFin)],
                    tipoProgreso: currentTactico.tipoProgreso,
                }}
            >
                <Form.Item
                    label="Objetivo:"
                    className='col-span-10'
                    name='nombre'
                >
                    <Input 
                        className='text-xl'
                        ref={inputRef}
                        onPressEnter={ (e) => e.currentTarget.blur() }
                        onBlur={handleOnSubmit}
                        bordered={false}
                    />
                </Form.Item>
                <Form.Item
                    label="Clave:"
                    className='col-span-2'
                    name="codigo" 
                >
                    <Input 
                        className='text-xl'
                        ref={inputRef}
                        onPressEnter={ (e) => e.currentTarget.blur() }
                        onBlur={handleOnSubmit}
                        bordered={false}
                    />
                </Form.Item>

                <div className={`col-span-12`}>
                    <Divider className='my-3' />
                        <Form.Item
                        >
                            <div className='flex gap-10 justify-between'>
                                <p className='text-devarana-graph font-medium'>Progreso:</p>
                                <div className='ml-auto flex gap-x-5'>
                                    <div className='flex gap-2 items-center ml-auto'>
                                        <Switch 
                                            size='small'
                                            className='disabled:cursor-wait'
                                            checked = {currentTactico.tipoProgreso === 'PROMEDIO' ? true : false}
                                            title='Automatico'     
                                            disabled={isLoadingProgress}                                       
                                            onClick={handleSetTipo}
                                            
                                        />
                                        <p className='text-devarana-graph'> { currentTactico.tipoProgreso === 'PROMEDIO' ? 'Automático' : 'Manual' } </p>
                                    </div>
                                    <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                                            <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                                <TabStatus status={statusTactico} />
                                            </button>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='inline-flex w-full'>
                                <p className='text-3xl font-bold pr-4' style={{ 
                                    color: getColor(currentTactico.status).color,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundImage: `linear-gradient(to top, ${getColor(currentTactico.status).lowColor}, ${getColor(currentTactico.status).color})`
                                }}> { currentTactico.progreso }% </p>
                                <Slider
                                    marks={marks}
                                    className='drop-shadow progressStyle w-full'
                                    min={0}
                                    max={100}
                                    value={progreso}
                                    onChange={ (value ) => {
                                        hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) &&
                                        setProgreso(value)
                                    }}
                                    onAfterChange={ (value ) => {
                                        hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && handleChangeProgreso(value)
                                        setProgreso(value)
                                    } }
                                    trackStyle={{
                                        backgroundColor: getColor(currentTactico.status).color,
                                        borderRadius: 10,

                                    }}
                                    railStyle={{
                                        backgroundColor: getColor(currentTactico.status, .3).color,
                                        borderRadius: 10,
                                    }}
                                    handleStyle={{
                                        borderColor: getColor(currentTactico.status).color,
                                    }}
                                />
                            </div>
                        </Form.Item>
                    <Divider className='my-3' />
                </div>
            
                <div className='pb-5 col-span-12'>
                    <label className='block pb-3'>Contribuye a: </label>
                    <Radio.Group
                        value={ isEstrategico ? true : false}
                        onChange={handleChangeTipoEstrategia}
                    >
                        <Radio value={true}>Estrategia</Radio>
                        <Radio value={false}>Operación</Radio>
                    </Radio.Group>

                </div>
                { ( isEstrategico )  && (

                    <>
                    
                    <label className='block pb-3'>Perspectiva: </label>
                    <div className='flex flex-wrap gap-3 col-span-12'>
                        {
                            perspectivas && perspectivas.map((perspectiva: PerspectivaProps) => (
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) &&
                                        handleSelectPerspectiva(perspectiva.id)
                                    }}
                                    key={perspectiva.id} 
                                    className={`rounded-ext px-2 py-1 text-white font-bold transition-all duration-200 hover:scale-105`}
                                    style={{
                                        backgroundColor: selectedPerspectiva === perspectiva.id? perspectiva.color: 'rgba(101,106,118, .5)',
                                    }}
                                > <span className='drop-shadow  text-xs'>{ perspectiva.nombre }</span>
                                </button>
                            ))
                        }
                    </div>

                <Form.Item
                    label="Objetivo Estratégico"
                    name="estrategicoId"
                    className='col-span-12 pt-4'
                    rules={[{ required: true, message: 'Selecciona el objetivo estratégico' }]}
                >
                    <Select
                        placeholder="Selecciona el objetivo estratégico"
                        
                        disabled={
                            hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true
                        }
                        allowClear
                        showSearch
                        onChange={handleChangePerspectiva}
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                        options={optEstrategicos}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    >
                    </Select>
                </Form.Item>
                    </>
                )}

                <Divider className='col-span-12'/>

                <Form.Item
                    label="Proyección"
                    name="proyeccion"
                    className='col-span-12'
                >
                
                        <DatePicker.RangePicker
                            picker='quarter'
                            className='w-full'
                            onChange={handleOnSubmit}
                            suffixIcon={ <BsFillCalendarFill className='text-devarana-babyblue' /> }
                        />

                </Form.Item>

                <Divider className='col-span-12'/>

                <Form.Item
                    label="Responsable"
                    name="propietarioId"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        onChange={handleOnSubmit}
                        size='large'
                        bordered = {false}
                        showSearch
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                        
                    >
                        {
                            usuarios.map((usuario: UsuarioProps) => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} 
                                > { spanUsuario(usuario) } </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Co-Responsables"
                    name="responsables"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"                      
                        allowClear
                        mode="multiple"
                        bordered = {false}
                        tagRender={tagRender}
                        maxLength={3}
                        onChange={handleOnSubmit}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios.map((usuario: UsuarioProps) => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{
                                    spanUsuario(usuario)}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                        
                <Form.Item
                    className='col-span-12'
                    name="meta"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Meta</p>  
                    </div>
                    {
                        viewMeta 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('meta')}
                                onChange={(value) => form.setFieldsValue({meta: value}) }
                                onBlur={() =>{ handleOnSubmit(); setViewMeta(false)}}
                                readOnly={!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' dangerouslySetInnerHTML={{ __html: form.getFieldValue('meta')}}
                            onClick={() => { 
                                hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && setViewMeta(!viewMeta)
                            }}
                        ></div> )
                    }
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="indicador"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Indicador</p>
                    </div>
                    {
                        viewIndicador 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('indicador')}
                                onChange={(value) => form.setFieldsValue({indicador: value}) }
                                onBlur={() =>{ handleOnSubmit(); setViewIndicador(false)}}
                                readOnly={!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' dangerouslySetInnerHTML={{ __html: form.getFieldValue('indicador')}}
                            onClick={() => { hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && setViewIndicador(!viewIndicador)}}
                        ></div> )
                    }
                </Form.Item>
                
            </Form>
            <div className='col-span-12'>
                <Tabs defaultActiveKey='1' items={itemTab} className='text-devarana-graph active:text-devarana-dark-graph'
                    onClick={ ( e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                </Tabs>
            </div>

        {
            hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && (
                <Button onClick={showDeleteConfirm} className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-20 hover:opacity-80' icon={<Icon iconName='faTrash' className='text-white text-xs'/> } /> 
            )
        } 
        </>
    )
}
