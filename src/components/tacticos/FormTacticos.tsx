
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks';
import { useUpdateTypeProgressMutation, useGetTacticoQuery, useUpdateTacticoMutation, useUpdateTypMutation, useDeleteTacticoMutation } from '@/redux/features/tacticos/tacticosThunk';
import { AreaProps, CoreProps, PerspectivaProps, TacticoProps, UsuarioProps } from '@/interfaces';
import { Form, Input, Select, Radio, Divider, RadioChangeEvent, Dropdown, Slider, MenuProps, TabsProps, Tabs, Button, Modal, DatePicker, Switch, Tooltip, Spin, TreeSelect } from 'antd';
import dayjs from 'dayjs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { TabStatus } from '../ui/TabStatus';
import { getColor } from '@/helpers';
import { statusType } from '@/types';
import { useGetPerspectivasQuery } from '@/redux/features/perspectivas/perspectivasThunk';
import ReactQuill from 'react-quill';
import { Comentarios } from '../comentarios/Comentarios';
import { Icon } from '../Icon';
import { DefaultOptionType } from 'antd/es/select';
import { BsFillCalendarFill } from 'react-icons/bs';
import { useGetAreasQuery } from '@/redux/features/areas/areasThunks';
import { useGetDepartamentosQuery } from '@/redux/features/departamentos/departamentosThunks';
import { useGetComentariosQuery } from '@/redux/features/comentarios/comentariosThunk';
import { toast } from 'sonner';

interface FormTacticoProps {
    handleCloseDrawer: () => void
    year: number
    slug?: string
    activeTactico: TacticoProps | CoreProps
}

export const FormTactico:React.FC<FormTacticoProps> = ({handleCloseDrawer, year, slug, activeTactico}) => {

    const inputRef = useRef<any>(null)
    const [selectedArea, setSelectedArea] = useState<number>(0)
    const [selectedEquipo, setSelectedEquipo] = useState<number | string>()

    const { data: comentarios } = useGetComentariosQuery({comentableId: activeTactico.id, comentableType: 'TACTICO'})
    const { permisos} = useAppSelector(state => state.auth)

    const [updateTypeProgressMutation, { isLoading: isUpdatingTypeProgress }] = useUpdateTypeProgressMutation()
    const [updateTacticoMutation, { isLoading: isUpdatingTactico }] = useUpdateTacticoMutation()
    const [updateTypeMutation, {isLoading: isUpdatingType}] =  useUpdateTypMutation()
    const [deleteTacticoMutation, {isLoading: isDeleting}] = useDeleteTacticoMutation()

    const { data: areas } = useGetAreasQuery({ year })
    const { data: departamentos } = useGetDepartamentosQuery({ areaId: selectedArea }, { skip: !selectedArea }) 


    const [ isEstrategico, setIsEstrategico] = useState(false)
    const [ viewMeta, setViewMeta] = useState<boolean>(false);
    const [ viewIndicador, setViewIndicador] = useState<boolean>(false);
    const [ progreso, setProgreso] = useState<number>(0)
    const [ statusTactico, setStatusTactico] = useState<statusType>('SIN_INICIAR');
    const { data: currentTactico, isLoading, isFetching} = useGetTacticoQuery({tacticoId: activeTactico.id})
    const [ selectedPerspectiva, setSelectedPerspectiva] = useState<string>()
    
    const [form] = Form.useForm()
    const { confirm } = Modal;

    const {data: perspectivas, isLoading: isLoadingPerspectiva, isFetching: isFetchingPerspectiva} = useGetPerspectivasQuery({year})
    const {data: usuarios} = useGetUsuariosQuery({status: 'ACTIVO'})

    const { tagRender, spanUsuario } = useSelectUser(usuarios)
    

    useEffect(() => {
        if(currentTactico && currentTactico.departamentos?.areaId){
            setSelectedArea(currentTactico.departamentos?.areaId)
            if(currentTactico.departamentos?.id){
                setSelectedEquipo(currentTactico.departamentos?.id)
            }
        }
    }, [currentTactico])
   
    useEffect(() => {
        if(currentTactico && currentTactico.id){
            setSelectedPerspectiva(currentTactico.estrategico?.perspectivaId)
        }
    }, [currentTactico?.id])


    const optEstrategicos = useMemo(() => {
        if (!perspectivas || isLoadingPerspectiva || isFetchingPerspectiva) return [];
        return perspectivas.map(perspectiva => {
            return {
                label: <p className={`text-devarana-graph`}>{perspectiva.nombre}</p>,
                value: perspectiva.id,
                dataName: perspectiva,
                selectable: false,
                children: perspectiva.objetivosEstrategicos.map(estrategico => {
                    return {
                        label: <p className='text-devarana-graph'>{estrategico.nombre}</p>,
                        value: estrategico.id,
                        dataName: estrategico.nombre,
                    }
                })
            }
        })
    }, [perspectivas, isLoadingPerspectiva, isFetchingPerspectiva])

   useEffect(() => {
        if (!currentTactico || !currentTactico.id) return;
 
        if(currentTactico.estrategicoId){
             setIsEstrategico(true)
         }
         
         setStatusTactico(currentTactico.status);
         setProgreso(currentTactico.progreso)
 
    }, [currentTactico])
 

    const handleOnSubmit = () => {        
            if(hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true) return
            
            if(form.getFieldsError().filter(({ errors }) => errors.length).length) {
                return
            }
            const query = {
                ...currentTactico,
                ...form.getFieldsValue(),
                proyeccion: [dayjs(form.getFieldValue('proyeccionInicio')), dayjs(form.getFieldValue('proyeccionFin'))],
                year,
                slug,
            }
            if(!isEstrategico){
                query.estrategicoId = null
            }
    
            delete query.status
            delete query.progreso
    
            form.validateFields().then(() => {
                updateTacticoMutation(query)
            }).catch((errorInfo) => {
                return
            })
    }

    // TODO update mutation
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
                    currentTactico && toast.promise( updateTypeMutation({ tacticoId: currentTactico.id, type: 'CORE' }).unwrap(), {
                        loading: 'Actualizando tipo de objetivo',
                        success: 'Tipo de objetivo cambiado',
                        error: 'Error al cambiar el tipo de objetivo'
                    })                    
                }
            });
        }else{
            setIsEstrategico(e.target.value)
        }

    }

    const handleChangeProgreso = (value: number) => {
        
        if(currentTactico && currentTactico.id && currentTactico.progreso !== value){
            const updateTactico = {
                ...currentTactico,
                ...form.getFieldsValue(),
                tipoProgreso: 'MANUAL',
                proyeccion: [dayjs(form.getFieldValue('proyeccionInicio')), dayjs(form.getFieldValue('proyeccionFin'))],
                progreso: value,
                year,
                slug
            }
            updateTacticoMutation(updateTactico)
        }  
    }

    if(!currentTactico || isLoading ){
        return <div className='flex justify-center items-center h-full'> <Spin size='large' /> </div>
    }

    const handleChangeStatus = (value: statusType) => {  
        setStatusTactico(value); 
        const updateTactico = {
            ...currentTactico,
            ...form.getFieldsValue(),
            proyeccion: [dayjs(form.getFieldValue('proyeccionInicio')), dayjs(form.getFieldValue('proyeccionFin'))],
            status: value,
            year,
            slug
        }
        
        updateTacticoMutation(updateTactico) 
    }

    const handleSelectPerspectiva = (value: string) => {
        form.setFieldsValue({estrategicoId: undefined})
        setSelectedPerspectiva(value)
    }

    const handleChangePerspectiva = async (e: string) => {

        currentTactico && toast.promise( updateTypeMutation({ tacticoId: currentTactico.id, type: 'ESTRATEGICO', estrategicoId: e }).unwrap(), {
            loading: 'Actualizando objetivo estratégico',
            success: 'Objetivo estratégico actualizado',
            error: 'Error al actualizar el objetivo estratégico'
        })
       
    }

    const handleChangeArea = (value: number) => {
        setSelectedArea(value)
        form.setFieldsValue({departamentoId: undefined})
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
                        {comentarios?.length || 0} 
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
                deleteTacticoMutation({tacticoId: currentTactico.id}).unwrap().then((res) => {
                    handleCloseDrawer()
                })
            }
        });
    }

    const handleSetTipo = (type: boolean) => {     
        
        toast.promise( updateTypeProgressMutation({ tacticoId: currentTactico.id, type: type ? 'PROMEDIO' : 'MANUAL' }).unwrap(), {
            loading: 'Actualizando tipo de progreso',
            success: 'Tipo de progreso cambiado',
            error: 'Error al cambiar el tipo de progreso'
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
                    proyeccionInicio: dayjs(currentTactico.fechaInicio),
                    proyeccionFin: dayjs(currentTactico.fechaFin),
                    tipoProgreso: currentTactico.tipoProgreso,
                    departamentoId: currentTactico.departamentoId,
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
                        variant='borderless'
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
                        variant='borderless'
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
                                        <p className='text-devarana-graph'> { currentTactico.tipoProgreso === 'PROMEDIO' ? 'Automático' : 'Manual' } </p>
                                        <Switch 
                                            size='small'
                                            className='disabled:cursor-wait'
                                            checked = {currentTactico.tipoProgreso === 'PROMEDIO' ? true : false}
                                            title='Automatico'                                    
                                            onClick={handleSetTipo}
                                            style={{
                                                backgroundColor: currentTactico.tipoProgreso === 'PROMEDIO' ? '#656A76' : '#A6AFC3',
                                            }}
                                            loading={isUpdatingTypeProgress}
                                        />
                                        
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
                                    onChangeComplete={ (value ) => {
                                        hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && handleChangeProgreso(value)
                                        setProgreso(value)
                                    } }
                                    styles={{
                                        rail: {
                                            backgroundColor: getColor(currentTactico.status, .3).color,
                                            borderRadius: 10,
                                        },
                                        track: {
                                            backgroundColor: getColor(currentTactico.status).color,
                                            borderRadius: 10,
                                        },
                                        handle: {
                                            borderColor: getColor(currentTactico.status).color,
                                        },
                                        tracks: {
                                            backgroundColor: getColor(currentTactico.status).color,
                                        },

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
                        label="Objetivo Estratégico:"
                        name="estrategicoId"
                        className='col-span-12 pt-4'
                        rules={[{ required: true, message: 'Selecciona el objetivo estratégico' }]}
                    >
                        <TreeSelect
                            placeholder="Selecciona el objetivo estratégico"
                            
                            disabled={
                                hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true
                            }
                            showSearch
                            onChange={handleChangePerspectiva}
                            // filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            treeData={optEstrategicos}
                            treeDefaultExpandedKeys={[selectedPerspectiva as string]}
                            showCheckedStrategy={TreeSelect.SHOW_CHILD}
                            multiple={false}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeNodeFilterProp='dataName'
                        >
                        </TreeSelect>
                    </Form.Item>
                    </>
                )}

                {
                    (!isEstrategico) && (
                        <>
                        <label className='block pb-3'>Áreas: </label>
                           <div className='flex flex-wrap gap-3 col-span-12 pb-3'>
                           {
                               areas?.areas && areas.areas.rows.map((area: AreaProps) => (
                                   <button
                                       type='button'
                                       onClick={(e) => {
                                           e.preventDefault()
                                           e.stopPropagation()
                                           handleChangeArea(area.id)
                                       }}
                                       key={area.id} 
                                       className={`rounded-ext px-2 py-1 text-white font-bold transition-all duration-200 hover:scale-105`}
                                       style={{
                                           backgroundColor: selectedArea === area.id? area.perspectivas?.color: 'rgba(101,106,118, .5)',
                                       }}
                                   > <span className='drop-shadow  text-xs'>{ area.nombre }</span>
                                   </button>
                               ))
                           }
                       </div>
                       <Form.Item
                           className='col-span-12'
                           label="Departamento"
                           name="departamentoId"
                           required
                       >
                           <Select 
                               filterOption={(input, option) => (option as DefaultOptionType)?.dataName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                               showSearch
                               value={selectedEquipo}
                                onChange={handleOnSubmit}
                               allowClear
                               disabled={!selectedArea}
                               options={
                                   departamentos?.departamentos.rows.map((departamentos) => ({
                                       label: (
                                       <Tooltip title={departamentos.nombre}>
                                           <p className='text-devarana-graph'>{departamentos.nombre}</p>
                                       </Tooltip>),
                                       value: departamentos.id,
                                       dataName: departamentos.nombre
                                   }))
                               }
                           
                           />
                       </Form.Item>
                       </>
                    )
                }

                <Divider className='col-span-12'/>

                <Form.Item
                    label="Periodo Inicio:"
                    name="proyeccionInicio"
                    className='col-span-6'
                >
                
                        <DatePicker
                            picker='quarter'
                            className='w-full'
                            disabledDate={(current) => {
                                return current.year() !== year
                            }}
                            onChange={handleOnSubmit}
                            suffixIcon={ <BsFillCalendarFill className='text-devarana-babyblue' /> }
                        />

                </Form.Item>
                <Form.Item
                    label="Periodo Fin:"
                    name="proyeccionFin"
                    className='col-span-6'
                    rules={[
                        {
                            validator: async (_, value) => {
                                // Puede ser el mismo trimestre pero no puede ser menor
                                const inicio = form.getFieldValue('proyeccionInicio');
                                if (value && dayjs(value).isBefore(dayjs(inicio), 'day')) {
                                    return Promise.reject(new Error('La fecha de fin no puede ser menor a la de inicio'));
                                }
                            },
                        },
                    ]}
                >
                
                        <DatePicker
                            picker='quarter'
                            className='w-full'
                            disabledDate={(current) => {
                                // no puede ser mayor ni menor al año actual
                                return current.year() !== year
                            }}
                            
                            onChange={handleOnSubmit}
                            suffixIcon={ <BsFillCalendarFill className='text-devarana-babyblue' /> }
                        />

                </Form.Item>

                <Divider className='col-span-12'/>

                <Form.Item
                    label="Responsable:"
                    name="propietarioId"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        onChange={handleOnSubmit}
                        size='large'
                        variant='borderless'
                        showSearch
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                        
                    >
                        {
                            usuarios?.map((usuario: UsuarioProps) => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} 
                                > { spanUsuario(usuario) } </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Co-Responsables:"
                    name="responsables"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"                      
                        allowClear
                        mode="multiple"
                        variant='borderless'
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
                            usuarios?.map((usuario: UsuarioProps) => (
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
                            <p className='text-devarana-graph font-medium'>Meta:</p>  
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
                            <p className='text-devarana-graph font-medium'>Indicador:</p>
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
