import {  useState } from 'react'
import { useGetTacticosQuery } from '@/redux/features/tacticos/tacticosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DatePicker, Divider, Form, Input, Popconfirm, Segmented, Select, Skeleton, Tooltip } from 'antd'
import dayjs, {Dayjs} from 'dayjs';
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks'
import { createOperativoThunk, deleteOperativoThunk, updateOperativoThunk } from '@/redux/features/operativo/operativosThunk'
import { Button, Proximamente } from '../ui'
import { useSelectUser } from '@/hooks/useSelectUser'
import { BsFillCalendarFill } from 'react-icons/bs'
import { useGetPerspectivasQuery } from '@/redux/features/perspectivas/perspectivasThunk'
import { useGetEstrategicosQuery } from '@/redux/features/estrategicos/estrategicosThunk'
import { DefaultOptionType } from 'antd/es/select'
import { useOperativo } from '@/hooks/useOperativo'
import { FaTrash } from 'react-icons/fa'
import { PerspectivaProps } from '@/interfaces';

interface Props {
    handleCancel: () => void
    setPonderacionVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormObjetivo = ({handleCancel, setPonderacionVisible}:Props) => {

    const { TextArea } = Input;

    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const { userAuth } = useAppSelector(state => state.auth)
    const [selectedPerspectiva, setSelectedPerspectiva] = useState<string | undefined>(undefined)
    const [selectedEstrategico, setSelectedEstrategico] = useState<string | undefined>(undefined)
    const { data: usuarios} = useGetUsuariosQuery({status:'ACTIVO'})
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)
    const { data: perspectivas } = useGetPerspectivasQuery({ year })
    const { data: objetivosEstrategicos } = useGetEstrategicosQuery({ year, quarter, perspectivaId: selectedPerspectiva}, {
        skip: !selectedPerspectiva,
    })
    const { data: objetivosTacticos} = useGetTacticosQuery({ year, quarter, estrategicoId: selectedEstrategico}, {
        skip: !selectedEstrategico,
    })
    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    const [contribuye, setContribuye] = useState<string | number>('estrategico')

    const handleOnSubmit = async () => {

        const query =  {
            ...currentOperativo,
            ...form.getFieldsValue(),
            quarter, year
        }
        

        if(currentOperativo.id === ''){
            await dispatch(createOperativoThunk(query))
        }else{
            await dispatch(updateOperativoThunk(query))
        }

        setPonderacionVisible(true)

        // handleCancel()
    }

    const { statusObjetivo } = useOperativo({objetivo: currentOperativo})
    const propietarioItem = currentOperativo.operativosResponsable?.find(item => item.scoreCard.propietario === true);
    const propietario = propietarioItem?.id || userAuth.id;

    const disabledDate = ( current: Dayjs ) => {
        return current.quarter() !== quarter
    };

    if ( isLoadingObjetivo ) return <Skeleton active paragraph={{  rows: 10 }} />
    

    const handlePerspectivaChange = (value: string) => {
        setSelectedPerspectiva(value)
        form.setFieldValue('estrategicoId', null)
        form.setFieldValue('tacticoId', null)
    }

    const handleEstrategico = (value: string) => {
        form.setFieldValue('tacticoId', null)
        setSelectedEstrategico(value)
    }

    const handleClear = () => {
        
    }

    const handleDeleteObjetivo = () => {
        dispatch(deleteOperativoThunk(currentOperativo.id))
        handleCancel()
    }


    
    return (
        <>
            <Form 
                onFinish={handleOnSubmit}
                layout='vertical' 
                className='grid grid-cols-12 md:gap-x-10 editableForm'
                initialValues={{
                    ...currentOperativo,
                    operativosResponsable: currentOperativo.operativosResponsable.filter((item) => item.scoreCard.propietario === false).map((item) => item.id),
                    propietarioId: propietario,
                    progresoAsignado: currentOperativo.operativosResponsable.find((item) => item.id === userAuth.id)?.scoreCard.progresoAsignado,
                    fechaInicio: currentOperativo.id === '' ? dayjs().quarter(quarter).startOf('quarter') : dayjs(currentOperativo.fechaInicio),
                    fechaFin: currentOperativo.id === '' ? dayjs().quarter(quarter).endOf('quarter') : dayjs(currentOperativo.fechaFin),
                }}
                form={form}
            >
                

                <Form.Item
                    label="Objetivo:"
                    name="nombre"
                    className='col-span-12'
                    rules={[{ required: true, message: 'Por favor ingresa el nombre del objetivo' }]}
                    
                >
                    <Input placeholder='Nombre del objetivo' className='text-2xl' bordered={false} />
                </Form.Item>
               
                <Form.Item
                    label="Fecha Inicio:"
                    className='col-span-6'
                    name="fechaInicio"
                    rules={[{ required: true, message: 'Por favor ingresa la fecha del objetivo' }]}
                >
                    <DatePicker 
                        disabledDate={disabledDate}
                        className='w-full' 
                        format={"DD-MM-YYYY"}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Fecha Fin:"
                    className='col-span-6'
                    name="fechaFin"
                    rules={[{ required: true, message: 'Por favor ingresa la fecha del objetivo' }]}
                >
                    <DatePicker 
                        disabledDate={disabledDate}
                        className='w-full' 
                        format={"DD-MM-YYYY"}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                        label="Propietario:"
                        className='col-span-6'
                        name='propietarioId'
                        rules={[{ required: true, message: 'Por favor selecciona al propietario' }]}
                        tooltip='El propietario es el responsable de la ejecución del objetivo'
                    >
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Selecciona al propietario"
                            tagRender={tagRender}
                            showSearch
                            bordered = {false}
                            size='large'
                            onChange={ (value) => { form.setFieldValue('propietarioId', value) }}
                            value={ form.getFieldValue('propietarioId') }
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
                    className='col-span-6'
                    label="Co-Responsables:"
                    name="operativosResponsable"
                    tooltip='Los co-responsables son los colaboradores que apoyan al propietario en la ejecución del objetivo'
                    >
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        onChange={ (value) => { setSelectedUsers(value) } }
                        placeholder="Selecciona los responsables"
                        value={ selectedUsers }
                        bordered = {false}
                        maxTagCount={3} style={{ width: '100%' }}
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
                    label="Meta:"
                    name="meta"
                    className='col-span-12'
                    rules={[{ required: true, message: 'Por favor ingresa la meta del objetivo' }]}
                >
                    <TextArea name="meta" className='bg-[#F9F9F7]' bordered={false}/>
                </Form.Item>
                <Form.Item
                    label="Indicador:"
                    name="indicador"
                    className='col-span-12'
                >
                    <TextArea name="indicador" className='bg-[#F9F9F7]' bordered={false}/>
                </Form.Item>

                <Divider className='col-span-12' />

                <div className='col-span-12'>
                        <p className='text-devarana-graph font-medium pb-5'>Contribuye a:</p>
                        <Proximamente avance={99}  />
                </div>



                {/* <Segmented className='col-span-12' block options={[{
                    label: 'Objetivo Táctico Estratégico',
                    value: 'estrategico',
                }, {
                    label: 'Objetivo Táctico Core',
                    value: ' core',
                }]} value={contribuye} onChange={(value) => setContribuye(value)} />


                {
                    contribuye === 'estrategico' && (
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
                                        handlePerspectivaChange(perspectiva.id)
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
                            className='col-span-6'
                            label="Objetivo Estrategico"
                            name="estrategicoId"
                        >
                            <Select 
                                filterOption={(input, option) => (option as DefaultOptionType)?.dataName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                                showSearch
                                onChange={handleEstrategico}
                                onClear={handleClear}
                                allowClear
                                disabled={!selectedPerspectiva}
                                options={
                                    objetivosEstrategicos?.map((estrategico) => ({
                                        label: (
                                        <Tooltip title={estrategico.nombre}>
                                            <p className='text-devarana-graph'>{estrategico.nombre}</p>
                                        </Tooltip>),
                                        value: estrategico.id,
                                        dataName: estrategico.nombre
                                    }))
                                }
                            
                            />
                        </Form.Item>
                        <Form.Item
                            className='col-span-6'
                            label="Objetivo Tactico"
                            name="tacticoId"
                            required    
                        >
                            <Select
                                filterOption={(input, option) => (option as DefaultOptionType)?.dataName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                                showSearch
                                allowClear
                                onChange={ (value) => { form.setFieldValue('tacticoId', value)}}
                                disabled={!selectedEstrategico}
                                options={
                                    objetivosTacticos?.map((tactico) => ({
                                        label: (
                                        <Tooltip title={tactico.nombre}>
                                            <p className='text-devarana-graph'>{tactico.nombre}</p>
                                        </Tooltip>),
                                        value: tactico.id,
                                        dataName: tactico.nombre
                                    }))
                                }
                            />

                            
                        </Form.Item>
                    </>
                    )
                }    
                {
                    contribuye === 'core' && (
                        <>
                        </>
                    )
                } */}
                <div className='flex col-span-12 justify-end'>
                    <Button 
                        classColor='primary' 
                        classType='regular' 
                        type='submit' 
                        width={170} 
                        className='btn-primary'
                    >Guardar y Ponderar</Button>
                </div>
            </Form>   
            {
                currentOperativo.id !== '' && statusObjetivo !== 'APROBADO' && (
                    <Popconfirm
                        title="¿Estás seguro de eliminar este objetivo?"
                        onConfirm={handleDeleteObjetivo}
                        okText="Si"
                        cancelText="No"
                        okButtonProps={{ className: 'bg-red-500 text-white rounded-full px-5 py-2' }}
                    >
                        <button type='button' className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-20 hover:opacity-80 p-2'>
                            <FaTrash />
                        </button>
                    </Popconfirm>
                )
            }     
        </>
    )
}
