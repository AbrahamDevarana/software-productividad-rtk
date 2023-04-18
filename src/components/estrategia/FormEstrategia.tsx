import { useEffect, useRef, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Select, Slider, Skeleton, MenuProps, Dropdown, Divider } from 'antd';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createEstrategicoFromPerspectivaThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import dayjs from 'dayjs';
import { EstrategicoProps, Perspectiva } from '@/interfaces';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { editorConfiguration } from '@/helpers/CKEditor';
import { useColor } from '@/hooks';
import { TabStatus } from '../ui/TabStatus';



interface FormEstrategiaProps {
    setOpen: (open: boolean) => void;
    setShowEdit?: (show: boolean) => void;
}


export const FormEstrategia: React.FC<FormEstrategiaProps> = ({setOpen, setShowEdit}) => {

    const  dispatch = useAppDispatch()
    const { currentEstrategico, isLoadingCurrent } = useAppSelector(state => state.estrategicos)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { userAuth } = useAppSelector(state => state.auth)
    const { usuarios } = useAppSelector(state => state.usuarios)
        

    const [statusEstrategico, setStatusEstrategico] = useState<number>(currentEstrategico.status);
    
    const inputRef = useRef<any>(null)
    const { TextArea } = Input;
    

    const handleOnSubmit = ( values: any ) => {

        inputRef.current?.blur();
        delete values.status
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
        if(currentEstrategico.id !== '0'){
            setStatusEstrategico(currentEstrategico.status)
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

    const handleChangeStatus = (value: number) => {  

        setStatusEstrategico(value); 
        const updateEstrategico = {
            ...currentEstrategico,
            status: value
        }
        dispatch(updateEstrategicoThunk(updateEstrategico));       
    }
    

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <button onClick={() => handleChangeStatus(1)}> <TabStatus statusId={1} /> </button>
          ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => handleChangeStatus(2)}> <TabStatus statusId={2} /> </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => handleChangeStatus(3)}> <TabStatus statusId={3} /> </button>
            ),
        },
        {
            key: '4',
            label: (
                <button onClick={() => handleChangeStatus(4)}> <TabStatus statusId={4} /> </button>
            ),
        },
        {
            key: '5',
            label: (
                <button onClick={() => handleChangeStatus(5)}> <TabStatus statusId={5} /> </button>
            ),
        },
    ]
    

    if(isLoadingCurrent) return <Skeleton paragraph={ { rows: 20 } } />

    return (
        <>

            <Formik
                initialValues={ {
                    ...currentEstrategico,
                    propietarioId: currentEstrategico?.propietario?.id || userAuth?.id,
                    responsables: currentEstrategico?.responsables?.map((r: any) => r.id) || [],
                    perspectivaId: currentEstrategico?.perspectivas?.[0]?.id || '0',
                } }
            
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
                    ({ values, handleChange, setFieldValue }) => (
                        <Form
                            noValidate
                            layout='vertical'
                            onBlur={() => handleOnSubmit(values)}
                            className='w-full grid grid-cols-12'
                        >
                 
                            <Form.Item
                                label="Objetivo"
                                className='col-span-10'
                            >
                                <Input
                                    className='border-0 border-b rounded-none focus:border hover:border focus:rounded-md hover:rounded-md'
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
                                className='col-span-2'
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
                            <Divider className='col-span-12'  />
                            <Form.Item 
                                className='col-span-12'>
                                <div className='flex justify-between'>
                                    <p className='text-devarana-graph'>
                                        <span className='text-3xl'> {values.progreso} </span> 
                                        % / 100 %
                                    </p>
                                    <div className='bg-gray-50 rounded-full px-2'>
                                        <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                                            <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                                <TabStatus statusId={statusEstrategico} />
                                            </button>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Progreso"
                                className='col-span-12'
                            >
                                <Slider
                                    className='drop-shadow progressStyle'
                                    value={values.progreso}
                                    min={0}
                                    max={100}
                                    onAfterChange={ handleChangeProgreso }
                                    trackStyle={{
                                        backgroundColor: useColor(values.status).color,
                                        borderRadius: 10,

                                    }}
                                    railStyle={{
                                        backgroundColor: useColor(values.status, .3).color,
                                        borderRadius: 10,
                                    }}
                                    
                                />

                            </Form.Item>
                            <Divider className='col-span-12' />
                            <Form.Item
                                label="Perspectiva"
                                className='col-span-12'
                            >
                                <div className='flex flex-wrap gap-3'>
                                    {
                                        perspectivas && perspectivas.map((perspectiva: Perspectiva) => (
                                            <button 
                                                type='button'
                                                onClick={() => setFieldValue('perspectivaId', perspectiva.id)}
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
                            <Divider className='col-span-12' />
                            <Form.Item
                                label="Fecha de inicio"
                                className='col-span-6'
                            >
                                <DatePicker
                                    onChange={(date, dateString) => setFieldValue('fechaInicio', dayjs(dateString, 'DD-MM-YYYY'))}
                                    value={dayjs(values.fechaInicio)} format={"DD-MM-YYYY"}
                                    defaultValue={dayjs(values.fechaInicio)}
                                    name="fechaInicio"
                                    className='w-full border-0 border-b rounded-none focus:border hover:border focus:rounded-md hover:rounded-md'
                                    clearIcon={false}
                                    ref={inputRef}
                                />
                                <ErrorMessage name="fechaInicio" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Fecha de fin"
                                className='col-span-6'
                            >
                                <DatePicker
                                    onChange={(date, dateString) => setFieldValue('fechaFin', dayjs(dateString, 'DD-MM-YYYY'))}
                                    value={dayjs(values.fechaFin)} format={"DD-MM-YYYY"}
                                    defaultValue={dayjs(values.fechaFin)}
                                    name="fechaFin"
                                    className='w-full border-0 border-b rounded-none focus:border hover:border focus:rounded-md hover:rounded-md'
                                    clearIcon={false}
                                    ref={inputRef}
                                />
                                <ErrorMessage name="fechaFin" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Propietario"
                                className='col-span-12'
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('propietarioId', value)}
                                    allowClear
                                    className='border-0 border-b rounded-none focus:border hover:border focus:rounded-md hover:rounded-md'
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
                                className='col-span-12'
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('responsables', value)}
                                    allowClear
                                    className='border-0 border-b rounded-none focus:border hover:border focus:rounded-md hover:rounded-md'
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
                                label="Meta a alcanzar"
                                className='col-span-12'
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
                                className='col-span-12'
                            >
                                <TextArea rows={1} value={values.indicador} onChange={handleChange}  name="indicador" className='border-0 border-b rounded-none focus:border hover:border focus:rounded-md hover:rounded-md'/>
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
