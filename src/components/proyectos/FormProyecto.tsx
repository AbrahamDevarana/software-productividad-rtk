import { ProyectosProps } from '@/interfaces'
import { Alert, Button, DatePicker, Form, Input, Modal, Skeleton, Upload } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/redux/hooks';
import { createProyectoThunk, updateProyectoThunk } from '@/redux/features/proyectos/proyectosThunk';
import { useUploadFile } from '@/hooks/useUploadFile';
import { Icon } from '../Icon';
import { uploadImage } from '@/helpers';
import { uploadUrl } from '@/types';
import Loading from '../antd/Loading';
import { useEffect } from 'react';

interface FormProyectoProps {
    currentProyecto: ProyectosProps
    handleCancel: () => void
    isLoadingProyecto: boolean
}

export const FormProyecto = ({currentProyecto, handleCancel, isLoadingProyecto}: FormProyectoProps) => {   

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const dispatch = useAppDispatch()

    const previewImage = {
        uid: currentProyecto.id || '',
        name: currentProyecto.titulo,
        status: 'done',
        url: `${import.meta.env.VITE_STORAGE_URL}${currentProyecto.imagen}`
    }
    
    const {fileList, handleOnChange, handleOnRemove, handlePreview, loading, preview, setPreviewOpen, previewOpen, setFileList} = useUploadFile()

    useEffect(() => {
        if(currentProyecto.id !== '' && currentProyecto.imagen ) {
            setFileList([...fileList, previewImage])
        }
    }, [currentProyecto])
    



    const handleSubmit = (values: ProyectosProps) => {
        if(currentProyecto.id !== '') {
            dispatch(updateProyectoThunk(values))
        }
        else {
            dispatch(createProyectoThunk(values))
        }
        handleCancel()
    }


    const uploadImageProps = {
        id: currentProyecto.id,
        url: uploadUrl.PROYECTO,
    }

    const uploadButton = (
        <div className='text-center w-full'>
            {loading ? <Icon iconName='faSpinner' /> : <Icon iconName='faPlus' />}
            <div style={{ marginTop: 8 }}> Subir Portada </div>
        </div>
    )

  if(isLoadingProyecto) return <Skeleton paragraph={ { rows: 8 } } active />


    return (
        <Formik
            initialValues={currentProyecto}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            enableReinitialize
            validationSchema={ 
                Yup.object({
                    titulo: Yup.string().required('El titulo es requerido'),
                })
            }

        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form onFinish={handleSubmit} noValidate layout='vertical' className='grid grid-cols-12 md:gap-x-10'>
                    <Form.Item className='col-span-12'>
                    {(  currentProyecto.id !== '' 
                        && 
                            <>
                                <Upload
                                    maxCount={1}
                                    accept="image/*"
                                    name="file"
                                    fileList={fileList}
                                    listType='picture'
                                    onPreview={handlePreview}
                                    onChange={handleOnChange}
                                    onRemove={handleOnRemove}
                                    customRequest={ async ({ file, onSuccess, onError }) => {
                                        await uploadImage({ ...uploadImageProps, file} ).then((res) => {
                                                onSuccess?.(res)
                                            }).catch((err) => {
                                                onError?.(err)
                                        })
                                    }}
                                    
                                >
                                    {fileList.length >= 1 ? null
                                    : uploadButton}
                                </Upload> 
                                <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                                    <img alt="example" style={{ width: '100%' }} src={preview} />
                                </Modal>
                            </>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Titulo"
                        name="titulo"
                        className='col-span-12'
                        required
                    >
                        <Input value={values.titulo} onChange={handleChange} onBlur={handleBlur} name="titulo" />
                        <ErrorMessage name="titulo" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                        name="descripcion"
                        className='col-span-12'
                    >
                        <TextArea value={values.descripcion} onChange={handleChange} onBlur={handleBlur} name="descripcion" rows={5} />
                        <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha"
                        className='col-span-12'
                    >
                        <RangePicker className='w-full' value={[dayjs(values.fechaInicio).add(6, 'hour'), dayjs(values.fechaFin).add(6, 'hour')]}  onCalendarChange={
                            (value, valueString) => {
                                setFieldValue('fechaInicio', valueString[0])
                                setFieldValue('fechaFin', valueString[1])
                            }
                        }/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" className='btn-primary' htmlType="submit" > Guardar </Button>
                    </Form.Item>

                </Form>
            )}
        </Formik>
        
    )
}
