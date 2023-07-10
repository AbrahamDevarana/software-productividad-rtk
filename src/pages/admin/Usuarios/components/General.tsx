import { useState } from 'react';
import { Alert, Input, Form, Upload, Modal } from 'antd';
import { ErrorMessage, Formik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui';
import { createUsuarioThunk, updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { uploadUserPicture } from '@/helpers';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import { uploadButton } from '@/components/ui/UploadButton';
import ImgCrop from 'antd-img-crop';

const usuarioSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellidoPaterno: Yup.string().required("El apellido paterno es requerido"),
    email: Yup.string().email("El email no es válido").required("El email es requerido"),
    telefono: Yup.number().required('El teléfono es requerido').typeError('El teléfono debe ser un número').positive('No puedes poner números negativos').integer(' No puede haber decimales '),
})

export const General: React.FC<any> = ({handleSteps}) => {

    const dispatch = useAppDispatch();
    const { currentUsuario } = useAppSelector(state => state.usuarios)

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (values: any) => {

        if(currentUsuario.id) {
            await dispatch(updateUsuarioThunk(values))
        }else {
            await dispatch(createUsuarioThunk(values))
        }
        // handleSteps(1)
    }


    const {fileList, preview, previewOpen ,handleOnChange, handleOnRemove, handlePreview, setPreviewOpen} = useUploadAvatar({currentUsuario})


    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Formik
                initialValues={ currentUsuario}
                onSubmit={ handleOnSubmit }
                validationSchema={ usuarioSchema }
                enableReinitialize={true}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <Form onFinish={handleSubmit} noValidate onChange={handleChange} layout='vertical'>
                        <div className="grid grid-cols-4 gap-x-4">
                            <div className={`${currentUsuario.id !== ''? 'col-span-1 flex': 'col-span-0 hidden'}  items-center justify-center`}>
                                <div className='block'>
                                <ImgCrop 
                                        quality={.5}
                                >
                                    <Upload
                                        maxCount={1}
                                        accept="image/*"
                                        name="file"
                                        fileList={fileList}
                                        listType="picture-circle"                                 
                                        onPreview={handlePreview}
                                        onChange={handleOnChange}
                                        onRemove={handleOnRemove}
                                        customRequest={ async ({ file, onSuccess, onError }) => {
                                            await uploadUserPicture(file, currentUsuario.id).then((res) => {
                                                    onSuccess?.(res)
                                                }).catch((err) => {
                                                    onError?.(err)
                                            })
                                        }}
                                        
                                    >
                                        {fileList.length >= 1 ? null
                                        : uploadButton({loading} )}
                                    </Upload>
                                </ImgCrop>
                                <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                                    <img alt="example" style={{ width: '100%' }} src={preview} />
                                </Modal>
                                </div>
                            </div>

                            <div className={`${currentUsuario.id !== ''? 'col-span-3': 'col-span-4'} grid grid-cols-2 gap-10`}>
                                <Form.Item
                                    label="Nombre"
                                    required
                                >
                                    <Input value={values.nombre} name="nombre"/>
                                    <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Apellido Paterno"
                                    required
                                >
                                    <Input  value={values.apellidoPaterno} name="apellidoPaterno"/>
                                    <ErrorMessage name="apellidoPaterno" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Apellido Materno"
                                >
                                    <Input  value={values.apellidoMaterno} name="apellidoMaterno"/>
                                    <ErrorMessage  name="apellidoMaterno" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    required
                                >
                                    <Input type='email' value={values.email} name="email"/>
                                    <ErrorMessage name="email" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Teléfono"
                                    required
                                >
                                    <Input name="telefono" value={values.telefono}/>
                                    <ErrorMessage name="telefono" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button classColor="primary" classType='regular' width={'auto'} type="submit" className="mr-2"> { currentUsuario.id ? 'Actualizar' : 'Crear' } </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
