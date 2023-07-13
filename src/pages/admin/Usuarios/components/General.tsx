import { useState } from 'react';
import { Input, Form, Upload, Modal, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui';
import { createUsuarioThunk, updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { uploadUserPicture } from '@/helpers';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import { uploadButton } from '@/components/ui/UploadButton';
import ImgCrop from 'antd-img-crop';
import { FaArrowRight, FaSave } from 'react-icons/fa';


export const General: React.FC<any> = ({handleSteps, handleCancel}) => {

    const dispatch = useAppDispatch();
    const { currentUsuario, isLoadingCurrentUsuario } = useAppSelector(state => state.usuarios)
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);


    const handleOnSubmit = async () => {

        const query = {
            ...currentUsuario,
            ...form.getFieldsValue(),
            id: currentUsuario.id,
        }

        if(currentUsuario.id) {
            await dispatch(updateUsuarioThunk(query))
        }else {
            await dispatch(createUsuarioThunk(query))
        }

        handleCancel()


    }


    const {fileList, preview, previewOpen ,handleOnChange, handleOnRemove, handlePreview, setPreviewOpen} = useUploadAvatar({currentUsuario})

    if(isLoadingCurrentUsuario) return ( <Skeleton active paragraph={{ rows: 4 }} /> )

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>

            <Form 
                onFinish={handleOnSubmit} 
                layout='vertical'
                initialValues={{
                    ...currentUsuario,
                }}
                form={form}
            >
                <div className="grid grid-cols-4 gap-x-4">
                    <div className={`${currentUsuario.id !== ''? 'col-span-1 flex': 'col-span-0 hidden'}  items-center justify-center`}>
                        <div className='block'>
                        <ImgCrop 
                            quality={.5}
                            modalClassName='antd-img-crop-modal'
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
                            name="nombre"
                        >
                            <Input name="nombre"/>
                        </Form.Item>
                        <Form.Item
                            label="Apellido Paterno"
                            required
                            name="apellidoPaterno"
                        >
                            <Input  name="apellidoPaterno"/>
                        </Form.Item>
                        <Form.Item
                            label="Apellido Materno"
                            name="apellidoMaterno"
                        >
                            <Input  name="apellidoMaterno"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            required
                            name="email"
                        >
                            <Input type='email' />
                        </Form.Item>
                        <Form.Item
                            label="Teléfono"
                            required
                            name="telefono"
                            tooltip="Ingresa tu número de teléfono a 10 dígitos"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa tu número de teléfono a 10 dígitos',
                                    min: 10,
                                    max: 10
                                }
                            ]}
                        >
                            <Input type='tel' className="w-full" maxLength={10} onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                form.setFieldsValue({telefono: value})
                            }} />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex justify-end mt-2 gap-x-2">
                    <Button classColor="primary" classType='regular' width={'auto'} type="submit" className="mr-2"> <FaSave /> </Button>
                    <Button classColor="dark" classType='regular' width={'auto'} type="button" onClick={() => handleSteps(1)} className="mr-2" disabled={currentUsuario.id === ''}>
                        <FaArrowRight /> 
                    </Button>
                </div>
            </Form>
        </div>
    )
}
