
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { updateTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import { PerspectivaProps, UsuarioProps } from '@/interfaces';
import { Form, DatePicker, Input, Select, Radio, Divider, RadioChangeEvent, Skeleton, Dropdown, Slider, MenuProps, TabsProps, Tabs } from 'antd';
import dayjs from 'dayjs';
import { BsFillCalendarFill } from 'react-icons/bs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { TabStatus } from '../ui/TabStatus';
import { getColor } from '@/helpers';
import { statusType } from '@/types';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { FaEdit, FaSave } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { Comentarios } from '../general/Comentarios';


interface FormTacticoProps {
    setShowEdit: (value: boolean) => void
    showEdit?: boolean
}

export const FormTactico:React.FC<FormTacticoProps> = ({showEdit, setShowEdit}) => {

    const inputRef = useRef<any>(null)
    const  dispatch = useAppDispatch()
    const { currentTactico, isLoadingCurrent } = useAppSelector(state => state.tacticos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { estrategicos } = useAppSelector(state => state.estrategicos)
    const {permisos} = useAppSelector(state => state.auth)
    const [selectedPerspectiva, setSelectedPerspectiva] = useState<string>()
    const [isEstrategico, setIsEstrategico] = useState(false)
    const [ viewMeta, setViewMeta] = useState<boolean>(false);
    const [ viewIndicador, setViewIndicador] = useState<boolean>(false);
    const [ comentariosCount , setComentariosCount ] = useState<number>(0)

    const [progreso, setProgreso] = useState<number>(0)
    const [ statusTactico, setStatusTactico] = useState<statusType>('SIN_INICIAR');

    const [form] = Form.useForm()

    const { tagRender, spanUsuario } = useSelectUser(usuarios)

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
        dispatch(getEstrategicosThunk({}))
        dispatch(getPerspectivasThunk({}))
    }, [])
    
    useEffect(() => {
        if(currentTactico.id === '') return
        setSelectedPerspectiva(currentTactico.estrategico?.perspectivaId)
    }, [currentTactico])
    
    
    const handleOnSubmit = () => {

        if(hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true) return

        const query = {
            ...currentTactico,
            ...form.getFieldsValue(),
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
                value: estrategico.id
            }
        })

    }, [selectedPerspectiva])
   


    const handleChangeTipoEstrategia = (e: RadioChangeEvent) => {

        if(!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)) return
        setIsEstrategico(e.target.value)
        form.setFieldsValue({estrategicoId: undefined})
        setSelectedPerspectiva(undefined)

        if(e.target.value === false){
            handleOnSubmit()
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
                progreso: value
            }
            dispatch(updateTacticoThunk(updateTactico));  
        }  
    }

    const handleChangeStatus = (value: statusType) => {  
        setStatusTactico(value); 
        const updateTactico = {
            ...currentTactico,
            status: value
        }
        
        dispatch(updateTacticoThunk(updateTactico));       
    }

    const handleSelectPerspectiva = (value: string) => {
        form.setFieldsValue({estrategicoId: undefined})
        setSelectedPerspectiva(value)
    }
    
    useEffect(() => {
        setComentariosCount(currentTactico.comentarios?.length)
    }, [currentTactico.comentarios])


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
            children: ( <Comentarios setComentariosCount={setComentariosCount} comentableType='TACTICO' comentableId={currentTactico.id}/> )
        }
    ]

    if ( isLoadingCurrent ){
        return <Skeleton active paragraph={{ rows: 20 }} />
    }
    

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
                    responsablesArray: currentTactico.responsables.map((responsable) => responsable.id),
                    fechaInicio: dayjs(currentTactico.fechaInicio).add(6, 'hour'),
                    fechaFin: dayjs(currentTactico.fechaFin).add(6, 'hour'),
                }}
            >
                <Form.Item
                    label="Objetivo"
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
                    label="Clave"
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
                            <div className='flex justify-between items-center'>
                                <p className='text-devarana-graph font-medium'>Progreso</p>
                                <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                                        <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                            <TabStatus status={statusTactico} />
                                        </button>
                                </Dropdown>
                            </div>
                            <div className='inline-flex w-full'>
                                <p className='text-3xl font-bold pr-2' style={{ 
                                    color: getColor(currentTactico.status).color,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundImage: `linear-gradient(to top, ${getColor(currentTactico.status).lowColor}, ${getColor(currentTactico.status).color})`
                                }}> { currentTactico.progreso }% </p>
                                <Slider

                                    className='drop-shadow progressStyle w-full'
                                    min={0}
                                    max={100}
                                    value={progreso}
                                    onChange={ (value ) => {
                                        hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) &&
                                        setProgreso(value)
                                    }}
                                    onAfterChange={ (value ) => {
                                        hasGroupPermission(['crear estrategias', 'editar estrategias', 'eliminar perspectivas'], permisos) && handleChangeProgreso(value)
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
                    <label className='block pb-3'>Tipo de Objetivo Táctico</label>
                    <Radio.Group
                        value={ isEstrategico ? true : false}
                        onChange={handleChangeTipoEstrategia}
                    >
                        <Radio value={true}>Táctico</Radio>
                        <Radio value={false}>Core</Radio>
                    </Radio.Group>

                </div>
                { ( isEstrategico )  && (

                    <>
                    
                    <div className='flex flex-wrap gap-3 col-span-12'>
                        {
                            perspectivas && perspectivas.map((perspectiva: PerspectivaProps) => (
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleSelectPerspectiva(perspectiva.id)
                                    }}
                                    key={perspectiva.id} 
                                    className={`rounded-ext px-2 py-1 text-white font-bold hover:transform transition-all duration-200 hover:scale-105`}
                                    style={{
                                        backgroundColor: selectedPerspectiva === perspectiva.id? perspectiva.color: 'rgba(101,106,118, .5)',
                                    }}
                                > <span className='drop-shadow'>{ perspectiva.nombre }</span>
                                </button>
                            ))
                        }
                    </div>

                <Form.Item
                    label="Objetivo estratégico"
                    name="estrategicoId"
                    className='col-span-12 pt-4'
                    rules={[{ required: true, message: 'Selecciona el objetivo estratégico' }]}
                >
                    <Select
                        placeholder="Selecciona el objetivo estratégico"
                        disabled={optEstrategicos.length === 0}
                        allowClear
                        showSearch
                        onBlur={handleOnSubmit}
                        options={optEstrategicos}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    >
                    </Select>
                </Form.Item>
                    </>
                )}

                <Divider className='col-span-12'/>

                {/* <Form.Item
                    label="Fecha de inicio"
                    className='col-span-6'
                    name={"fechaInicio"}
                >
                    <DatePicker
                        format={"DD-MM-YYYY"}
                        className='w-full'
                        onBlur={handleOnSubmit}
                        picker="quarter"
                        clearIcon={false}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Fecha de fin"
                    className='col-span-6'
                    name={"fechaFin"}
                >
                    <DatePicker
                        format={"DD-MM-YYYY"}
                        picker="quarter"
                        onBlur={handleOnSubmit}
                        className='w-full'
                        clearIcon={false}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item> */}

                <Divider className='col-span-12'/>

                <Form.Item
                    label="Propietario"
                    name="propietarioId"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        onBlur={handleOnSubmit}
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
                    name="responsablesArray"
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
                        onBlur={handleOnSubmit}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios.map((usuario: UsuarioProps) => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{spanUsuario(usuario)}</Select.Option>
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
                            <button onClick={() => {
                                hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && setViewMeta(!viewMeta)
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
                                value={form.getFieldValue('meta')}
                                onChange={(value) => form.setFieldsValue({meta: value}) }
                                onBlur={handleOnSubmit}
                                readOnly={!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' dangerouslySetInnerHTML={{ __html: form.getFieldValue('meta')}}></div> )
                    }
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="indicador"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Indicador</p>
                            <button onClick={() => {
                                hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && setViewIndicador(!viewIndicador)
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
                                readOnly={!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph richText bg-[#F9F9F7] p-5 rounded-ext max-h-[150px] overflow-y-auto' dangerouslySetInnerHTML={{ __html: form.getFieldValue('indicador')}}></div> )
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
                    
        </>
    )
}
