import { FC, useEffect, useMemo, useState } from 'react'
import { OperativoProps, TacticoProps } from '@/interfaces'
import { getTacticosThunk } from '@/redux/features/tacticos/tacticosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DatePicker, Divider, Form, Input, Select, Skeleton } from 'antd'
import dayjs, {Dayjs} from 'dayjs';
import { getUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks'
import { createOperativoThunk, updateOperativoThunk } from '@/redux/features/operativo/operativosThunk'
import { Button } from '../ui'
import { useSelectUser } from '@/hooks/useSelectUser'
import { BsFillCalendarFill } from 'react-icons/bs'
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk'
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk'
import { DefaultOptionType } from 'antd/es/select'

interface Props {
    handleCancel: () => void
}

export const FormObjetivo = ({handleCancel}:Props) => {

    const { TextArea } = Input;

    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { estrategicos } = useAppSelector(state => state.estrategicos)
    const { tacticosGeneral } = useAppSelector(state => state.tacticos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { userAuth } = useAppSelector(state => state.auth)
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)

    const [filteredObjetivosTacticos, setFilteredObjetivosTacticos] = useState<TacticoProps[]>(tacticosGeneral)
    const [filteredEstrategicos, setFilteredEstrategicos] = useState(estrategicos)


    useEffect(() => {
        dispatch(getPerspectivasThunk({ year }))
        dispatch(getEstrategicosThunk({ year }))
        dispatch(getTacticosThunk({ year }))
        dispatch(getUsuariosThunk({}))
    }, [])

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    const handleOnSubmit = () => {

        const query =  {
            ...currentOperativo,
            ...form.getFieldsValue(),
            quarter, year
        }
        

        if(currentOperativo.id === ''){
            dispatch(createOperativoThunk(query))
        }else{
            dispatch(updateOperativoThunk(query))
        }

        handleCancel()
    }

    useEffect(() => {
        setFilteredObjetivosTacticos(tacticosGeneral)
  }, [tacticosGeneral])

    const propietarioItem = currentOperativo.operativosResponsable?.find(item => item.scoreCard.propietario === true);
    const propietario = propietarioItem?.id || userAuth.id;

    const disabledDate = ( current: Dayjs ) => {
        return current.quarter() !== quarter
    };

    if ( isLoadingObjetivo ) return <Skeleton active paragraph={{  rows: 10 }} />
    

    const handlePerspectivaChange = (value: string) => {
        form.setFieldValue('estrategicoId', null)
        form.setFieldValue('tacticoId', null)

        if( value === null ) {
            handleClear()
        } else {
            setFilteredEstrategicos(estrategicos.filter((estrategico) => estrategico.perspectivaId === value))
            setFilteredObjetivosTacticos(tacticosGeneral.filter((tactico) => tactico.estrategico.perspectivaId === value))
        }

       
    }

    const handleEstrategico = (value: string) => {
        form.setFieldValue('tacticoId', null)

        if( value === null ) {
            handleClear()
        }else {
            setFilteredObjetivosTacticos(tacticosGeneral.filter((tactico) => tactico.estrategicoId === value))
        }
    }

    const handleClear = () => {
        setFilteredObjetivosTacticos(tacticosGeneral)
    }

    

    return (
        <>


            <Form 
                onFinish={handleOnSubmit}
                layout='vertical' 
                className='grid grid-cols-12 md:gap-x-10'
                initialValues={{
                    ...currentOperativo,
                    operativosResponsable: currentOperativo.operativosResponsable.filter((item) => item.scoreCard.propietario === false).map((item) => item.id),
                    propietarioId: propietario,
                    progresoAsignado: currentOperativo.operativosResponsable.find((item) => item.id === userAuth.id)?.scoreCard.progresoAsignado,
                    fechaInicio: dayjs(currentOperativo.fechaInicio),
                    fechaFin: dayjs(currentOperativo.fechaFin)
                }}
                form={form}
            >
                

                <Form.Item
                    label="Objetivo"
                    name="nombre"
                    className='col-span-12'
                    rules={[{ required: true, message: 'Por favor ingresa el nombre del objetivo' }]}
                >
                    <Input placeholder='Nombre del objetivo' bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Meta"
                    name="meta"
                    className='col-span-12'
                    rules={[{ required: true, message: 'Por favor ingresa la meta del objetivo' }]}
                >
                    <TextArea name="meta" className='bg-[#F9F9F7]' bordered={false}/>
                </Form.Item>
                <Form.Item
                    label="Indicador"
                    name="indicador"
                    className='col-span-12'
                    rules={[{ required: true, message: 'Por favor ingresa el indicador del objetivo' }]}
                >
                    <TextArea name="indicador" className='bg-[#F9F9F7]' bordered={false}/>
                </Form.Item>
                <Form.Item
                    label="Fecha Inicio"
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
                    label="Fecha Fin"
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
                        label="Propietario"
                        className='col-span-6'
                        name='propietarioId'
                        rules={[{ required: true, message: 'Por favor selecciona al propietario' }]}
                        // shouldUpdate = {(prevValues, curValues) => prevValues.propietarioId !== curValues.propietarioId}
                    >
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Selecciona al propietario"
                            tagRender={tagRender}
                            showSearch
                            bordered = {false}
                            onChange={ (value) => { form.setFieldValue('propietarioId', value) }}
                            value={ form.getFieldValue('propietarioId') }
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
                    className='col-span-6'
                    label="Co-Responsables"
                    name="operativosResponsable"
                    rules={[{ required: true, message: 'Por favor selecciona a los participantes' }]}
                    // shouldUpdate = {(prevValues, curValues) => prevValues.operativosResponsable !== curValues.operativosResponsable}
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
                            usuarios.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            ))
                          
                        }
                    </Select>
                </Form.Item>

                <Divider className='col-span-12' />

                <Form.Item
                    className='col-span-6'
                    label="Perspectiva"
                    name="perspectivaId"
                >
                   
                   <Select
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                        showSearch
                        onChange={handlePerspectivaChange}
                        onClear={handleClear}
                        allowClear
                        options={
                            perspectivas.map((perspectiva) => ({
                                label: <p className='text-devarana-graph'>{perspectiva.nombre}</p>,
                                value: perspectiva.id,
                                dataName: perspectiva.nombre
                            }))
                        }
                    />
                </Form.Item>

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
                        options={
                            filteredEstrategicos.map((estrategico) => ({
                                label: <p className='text-devarana-graph'>{estrategico.nombre}</p>,
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
                    rules={[{ required: true, message: 'Por favor selecciona el objetivo tactico' }]}
                >
                    
                    
                    <Select
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                        showSearch
                        onChange={ (value) => { form.setFieldValue('tacticoId', value)}}
                        options={
                            filteredObjetivosTacticos.map((tactico) => ({
                                label: <p className='text-devarana-graph'>{tactico.nombre}</p>,
                                value: tactico.id,
                                dataName: tactico.nombre
                            }))
                        }
                    />

                    
                </Form.Item>
                
                <div className='flex justify-end col-span-12'>
                    <Button 
                        classColor='primary' 
                        classType='regular' 
                        type='submit' 
                        width={150} 
                        className='btn-primary'
                    >Guardar</Button>
                </div>
            </Form>        
        </>
    )
}
