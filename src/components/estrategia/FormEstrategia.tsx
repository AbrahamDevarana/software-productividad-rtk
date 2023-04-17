import { useEffect, useRef, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Select } from 'antd';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createEstrategicoFromPerspectivaThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import dayjs from 'dayjs';
import { Perspectiva } from '@/interfaces';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { editorConfiguration } from '@/helpers/CKEditor';



interface FormEstrategiaProps {
    setOpen: (open: boolean) => void;
    currentTactico?: any;
    setShowEdit?: (show: boolean) => void;
}


export const FormEstrategia: React.FC<FormEstrategiaProps> = ({setOpen, currentTactico, setShowEdit}) => {

    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { userAuth } = useAppSelector(state => state.auth)

    const inputRef = useRef<any>(null)
    const [initialValues, setInitialValues] = useState<any>({
        nombre: '',
        codigo: '',
        descripcion: '',
        indicador: '',
        progreso: 0,
        perspectivaId: '',
        fechaInicio: dayjs().startOf('year'),
        fechaFin: dayjs().endOf('year'),
        responsables: [],
        propietarioId: userAuth?.id,
    })

    const  dispatch = useAppDispatch()
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { TextArea } = Input;

    const handleOnSubmit = ( values: any ) => {

        inputRef.current?.blur();
        
        if(values.id){            
            dispatch(updateEstrategicoThunk(values))
            setOpen(false)
            return
        }
        dispatch(createEstrategicoFromPerspectivaThunk(values))        
        setOpen(false)        
    }

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

    useEffect(() => {
        if(currentTactico){
            setInitialValues({
                id: currentTactico?.id,
                nombre: currentTactico?.nombre,
                codigo: currentTactico?.codigo,
                progreso: currentTactico?.progreso,
                descripcion: currentTactico?.descripcion,
                fechaInicio: currentTactico?.fechaInicio,
                fechaFin: currentTactico?.fechaFin,
                indicador: currentTactico?.indicador,
                perspectivaId: currentTactico?.pivot_persp_estr.perspectivaId,
                responsables: currentTactico?.responsables.map((r: any) => r.id),
                propietarioId: currentTactico?.propietarioId
            })
    }

    }, [currentTactico])


    const handleSelectPerspectiva = (id: number) => {
        setInitialValues({
            ...initialValues,
            perspectivaId: id
        })
    }
    

    return (
        <>
            <Formik
                initialValues={ initialValues }
            
                onSubmit={ (values) => handleOnSubmit(values) }
                validationSchema={Yup.object({
                    nombre: Yup.string().required("El nombre es requerido"),
                    codigo: Yup.string().required("El codigo es requerida"),
                    descripcion: Yup.string().required("La descripción es requerida"),
                    perspectivaId: Yup.string().required("La perspectiva es requerida")
                })}
                enableReinitialize={true}
                validateOnBlur={true}
            >
                {
                    ({ values, handleChange, handleSubmit, setFieldValue }) => (
                        <Form
                            noValidate
                            layout='vertical'
                            onBlur={handleSubmit}
                            
                        >
                            <div className="grid grid-cols-6 gap-x-5">
                                <Form.Item
                                    label="Objetivo"
                                    className='col-span-5'
                                >
                                    <Input
                                        className='border-0 focus:border hover:border'
                                        value={values.nombre}
                                        onChange={handleChange}
                                        name="nombre"
                                        ref={inputRef}
                                        onPressEnter={ () => handleOnSubmit(values) }
                                    />
                                    <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Clave"
                                    className='col-span-1'
                                >
                                    <Input
                                        className='border-0 focus:border hover:border'
                                        value={values.codigo}
                                        onChange={handleChange}
                                        name="codigo"
                                        ref={inputRef}
                                    />
                                    <ErrorMessage name="codigo" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Perspectiva"
                            >

                            <div className='flex flex-wrap gap-3'>
                                
                                {
                                    perspectivas && perspectivas.map((perspectiva: Perspectiva) => (
                                        <button 
                                            type='button'
                                            onClick={() => handleSelectPerspectiva(perspectiva.id)}
                                            key={perspectiva.id} 
                                            className='rounded-ext px-3 py-1'
                                            style={{
                                                backgroundColor: values.perspectivaId === perspectiva.id ? perspectiva.color : '#f0f2f5',
                                                color: values.perspectivaId === perspectiva.id ? '#fff' : '#000'
                                            }}
                                        >
                                            <span className='drop-shadow'>{ perspectiva.nombre }</span>
                                        </button>
                                    ))
                                }
                                
                            </div>
                            <ErrorMessage name="perspectivaId" render={msg => <Alert type="error" message={msg} showIcon />} />

                            </Form.Item>

                            <div className='grid grid-cols-2 gap-x-10'>
                                <Form.Item
                                    label="Fecha de inicio"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaInicio', dayjs(dateString, 'DD-MM-YYYY'))}
                                        value={dayjs(values.fechaInicio)} format={"DD-MM-YYYY"}
                                        defaultValue={dayjs(values.fechaInicio)}
                                        name="fechaInicio"
                                        className='w-full border-0 focus:border hover:border'
                                        clearIcon={false}
                                        ref={inputRef}
                                    />
                                    <ErrorMessage name="fechaInicio" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Fecha de fin"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaFin', dayjs(dateString, 'DD-MM-YYYY'))}
                                        value={dayjs(values.fechaFin)} format={"DD-MM-YYYY"}
                                        defaultValue={dayjs(values.fechaFin)}
                                        name="fechaFin"
                                        className='w-full border-0 focus:border hover:border'
                                        clearIcon={false}
                                        ref={inputRef}
                                    />
                                    <ErrorMessage name="fechaFin" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Propietario"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('propietarioId', value)}
                                    allowClear
                                    className='border-0 focus:border hover:border rounded-md'
                                    bordered = {false}
                                    value={ values.propietarioId }
                                >
                                    {
                                        usuarios.map((usuario: any) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre}</Select.Option>
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
                                    className='border-0 focus:border hover:border rounded-md'
                                    bordered = {false}
                                    value={ values.responsables }
                                >
                                    {
                                        usuarios.map((usuario: any) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre}</Select.Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage name="responsables" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>

                            
                            <Form.Item
                                label="Describe la meta a alcanzar"
                            >
                                <CKEditor
                                    editor={Editor}
                                    data={values.descripcion}
                                    onChange={(event:any, editor:any) => {
                                        const data = editor.getData();
                                        setFieldValue('descripcion', data)
                                    }}
                                    config={editorConfiguration}
                                    
                                />

                                {/* <TextArea rows={3} value={values.descripcion} onChange={handleChange}  name="descripcion" /> */}
                                <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Indicador"
                            >
                                <TextArea rows={3} value={values.indicador} onChange={handleChange}  name="indicador" className='border-0 focus:border hover:border'/>
                                <ErrorMessage name="indicador" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                           
                            {/* 
                            <Form.Item
                                label="Métrica de Seguimiento"
                            >
                            
                                <Radio.Group
                                    onChange={(e) => setFieldValue('metricaSeguimiento', e.target.value)}
                                    value={values.metricaSeguimiento}
                                    defaultValue={1}
                                >
                                    <Radio value={1}>Manual</Radio>
                                    <Radio value={2}>Cumplimiento de Objetivo Táctico</Radio>
                                </Radio.Group>
                            </Form.Item> */}
                                        
                            {/* <Form.Item 
                                className='text-right'
                            >
                                <div className='flex'>
                                    {setShowEdit &&<Button fn={ () => setShowEdit(false)} btnType="primary-outline">Cancelar</Button>}
                                    <Button btnType="secondary" type='submit' className='ml-auto'>Guardar</Button>
                                </div>
                            </Form.Item> */}
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
