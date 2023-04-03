import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Slider, Select, Radio, Divider, Checkbox } from 'antd';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import useNotify from '@/hooks/useNotify';
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { clearAlertTacticos } from '@/redux/features/tacticos/tacticosSlice';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { createTacticoThunk, updateTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import { UsuarioProps } from '@/interfaces';


interface FormTacticoProps {
    estrategicoId?: string;
    areaId?: string;
    setShowEdit: (value: boolean) => void
    currentTactico?: any
    showEdit?: boolean
}

export const FormTactico:React.FC<FormTacticoProps> = ({ estrategicoId , areaId = "", currentTactico, showEdit, setShowEdit}) => {

    const  dispatch = useAppDispatch()
    const { TextArea } = Input;

    const {  created, deleted, infoMessage, updated, error } = useAppSelector(state => state.tacticos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { estrategicos } = useAppSelector(state => state.estrategicos)
    const { areas } = useAppSelector(state => state.areas)
    const {userAuth} = useAppSelector(state => state.auth)


    console.log( dayjs().startOf('quarter').toDate())
    
    
    const [initialValues, setInitialValues] = useState<any>({
        nombre: '',
        codigo: '',
        meta: '',
        indicador: '',
        progreso: 0,
        objetivoEstrategico: estrategicoId,
        tipoObjetivo: estrategicoId? 1 : '',
        perspectivaId: '',
        fechaInicio: dayjs().startOf('quarter'),
        fechaFin: dayjs().endOf('quarter'),
        responsables: [],
        areas: [areaId] || [],
        propietarioId: userAuth?.id
    })
      
    useEffect(() => {
        useNotify({
            created,
            deleted,
            infoMessage,
            updated,
            error
        })

        return () => {
            dispatch(clearAlertTacticos())
            
        }
    }, [created, deleted, infoMessage, updated, error])

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

    useEffect(() => {
        if(currentTactico && currentTactico.id !== ""){
            setInitialValues({
                ...initialValues,
                id: currentTactico.id,
                nombre: currentTactico.nombre,
                codigo: currentTactico.codigo,
                meta: currentTactico.meta,
                indicador: currentTactico.indicador,
                progreso: currentTactico.progreso,
                tipoObjetivo: currentTactico.tipoObjetivo,
                fechaInicio: dayjs(currentTactico.fechaInicio).toDate(),
                fechaFin: dayjs(currentTactico.fechaFin).toDate(),
                responsables: currentTactico.responsables ? currentTactico.responsables.map((r:any) => r.id) : [],
                areas: currentTactico.areas ? currentTactico.areas.map((a:any) => a.id) : [],
                propietarioId: currentTactico.propietarioId
            })
        }

    }, [currentTactico])

    useEffect(() => {
        dispatch(getAreasThunk({}))
    }, [])

    const handleGetEstrategicos = () => {        
        dispatch(getEstrategicosThunk({}))
    }

    const handleOnSubmit = (values: any) => {
        
        if(currentTactico && currentTactico.id !== ""){
            dispatch(updateTacticoThunk(values))
            // setShowEdit(false)
            return
        }       
        dispatch(createTacticoThunk(values))
            
    }
    

    return (
        <>
            <Formik
                initialValues={initialValues}

                onSubmit={ (values) => handleOnSubmit(values) }
                validationSchema={Yup.object({
                    nombre: Yup.string().required('El nombre es requerido'),
                    codigo: Yup.string().required('Clave'),
                    meta: Yup.string().required('La meta es requerida'),
                    fechaInicio: Yup.date().required('La fecha de inicio es requerida'),
                    fechaFin: Yup.date().required('La fecha de fin es requerida'),
                    indicador: Yup.string().required('El indicador es requerido'),                    
                })}
                enableReinitialize={true}
            >
                {
                    ({ values, handleChange, handleBlur, handleSubmit, validateForm, setFieldValue }) => (
                        <Form
                            onFinish={handleSubmit}
                            noValidate
                            layout='vertical'
                        >

                            <Divider orientation="left">Objetivo </Divider>
                                {/* Objetivo */}
                                <Form.Item
                                        label="Tipo de objetivo"
                                    >
                                    <Radio.Group
                                        onChange={(e) => { 
                                            setFieldValue('tipoObjetivo', e.target.value); 
                                            e.target.value === 1 && handleGetEstrategicos();
                                            e.target.value === 2 && setFieldValue('objetivoEstrategico', null); 
                                        }}
                                        value={values.tipoObjetivo}
                                    >
                                        <Radio value={1}>Táctico</Radio>
                                        <Radio value={2}>Core</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                
                            { values.tipoObjetivo === 1 && (
                                <Form.Item
                                    label="Objetivo estratégico"
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Selecciona el objetivo estratégico"
                                        onChange={(value) => {setFieldValue('objetivoEstrategico', value ) }}
                                        value={  values.objetivoEstrategico }
                                        disabled={estrategicos.length === 0}
                                        allowClear
                                        showSearch
                                        // filterOption with typescript
                                        filterOption={(input, option) =>
                                            // @ts-ignore
                                            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }

                                    >
                                        {
                                            estrategicos.map((objetivo: any) => (
                                                <Select.Option key={objetivo.id} value={objetivo.id}>{objetivo.nombre}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    <ErrorMessage name="objetivoEstrategico" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            )}
                            
                            <Divider orientation="left">Áreas</Divider>

                            <Form.Item>
                                <Checkbox.Group
                                    value={values.areas}
                                    onChange={(value) => setFieldValue('areas', value)}
                                    
                                >
                                    {
                                        areas.map((area: any) => (
                                            <Checkbox key={area.id} value={area.id}> {area.nombre} </Checkbox>
                                        ))
                                    }
                                </Checkbox.Group>
                        </Form.Item>

                        <Divider />
                            <div className="grid grid-cols-6 gap-x-5">
                                <Form.Item
                                    label="Título del objetivo táctico"
                                    className='col-span-5'
                                >
                                    <Input
                                        value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="nombre"
                                    />
                                    <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                    
                                </Form.Item>
                                <Form.Item
                                    label="Clave"
                                    className='col-span-1'
                                >
                                    <Input
                                        value={values.codigo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="codigo"
                                    />
                                    <ErrorMessage name="codigo" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>

                            </div>

                            <div className='grid grid-cols-2 gap-x-10'>
                                <Form.Item
                                    label="Fecha de inicio"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaInicio', dayjs(dateString, 'DD-MM-YYYY'))}
                                        onBlur={handleBlur}
                                        value={dayjs(values.fechaInicio)} format={"DD-MM-YYYY"}
                                        defaultValue={dayjs(values.fechaInicio)}
                                        name="fechaInicio"
                                        className='w-full'
                                        clearIcon={false}
                                    />
                                    <ErrorMessage name="fechaInicio" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Fecha de fin"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaFin', dayjs(dateString, 'DD-MM-YYYY'))}
                                        onBlur={handleBlur}
                                        value={dayjs(values.fechaFin)} format={"DD-MM-YYYY"}
                                        defaultValue={dayjs(values.fechaFin)}
                                        name="fechaFin"
                                        className='w-full'
                                        clearIcon={false}
                                        
                                    />
                                    <ErrorMessage name="fechaFin" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Propietario"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona al propietario"
                                    onChange={(value) => setFieldValue('propietarioId', value)}
                                    allowClear
                                    value={ values.propietarioId }
                                >
                                    {
                                        usuarios.map((usuario: UsuarioProps) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellidoPaterno} </Select.Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage name="responsables" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Co-Responsables"
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('responsables', value)}
                                    allowClear
                                    value={ values.responsables }
                                >
                                    {
                                        usuarios.map((usuario: UsuarioProps) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellidoPaterno}</Select.Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage name="responsables" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                                    
                            <Form.Item
                                label="Describe la meta a alcanzar"
                            >
                                <TextArea rows={3} value={values.meta} onChange={handleChange} onBlur={handleBlur} name="meta" />
                                <ErrorMessage name="meta" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Indicador"
                            >
                                <TextArea rows={3} value={values.indicador} onChange={handleChange} onBlur={handleBlur} name="indicador" />
                                <ErrorMessage name="indicador" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                           


                                
                            <Form.Item 
                                className='text-right'
                            >
                                <div className='flex'>
                                    { showEdit && <Button fn={ () => setShowEdit(false)} btnType="primary-outline">Cancelar</Button>}
                                    <Button btnType="secondary" type='submit' className='ml-auto'>Guardar</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
