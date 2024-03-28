
import { Input, Form, Upload, Modal, Skeleton, message, Select } from 'antd';
import { Button } from '@/components/ui';
import { useCreateUsuarioMutation, useUpdateUsuarioMutation } from '@/redux/features/usuarios/usuariosThunks';
import { uploadUserPicture } from '@/helpers';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import { uploadButton } from '@/components/ui/UploadButton';
import ImgCrop from 'antd-img-crop';
import { FaArrowRight, FaSave } from 'react-icons/fa';


export const General: React.FC<any> = ({handleSteps, currentUsuario}) => {
    const [createUser, {isLoading: isCreating}] = useCreateUsuarioMutation()
    const [updateUser, {isLoading: isUpdating}] = useUpdateUsuarioMutation()
    

    const [form] = Form.useForm();
    const {fileList, preview, previewOpen ,handleOnChange, handleOnRemove, handlePreview, setPreviewOpen, handleReset} = useUploadAvatar({currentUsuario})

    const handleOnSubmit = async () => {
        const query = {
            ...currentUsuario,
            ...form.getFieldsValue(),
            id: currentUsuario?.id,
        }
        if(currentUsuario && currentUsuario.id) {
            await updateUser(query).unwrap().then(() => {
                message.success('Usuario Actualizado Correctamente.')
            })
        }else {
            await createUser(query).unwrap().then(() => {
                message.success('Usuario Creado Correctamente.')  
            })
        }
    }

    const nextStep = () => {
        handleSteps(1)
    }


    return (
        <Form 
            onFinish={handleOnSubmit} 
            layout='vertical'
            initialValues={{
                ...currentUsuario,
            }}
            form={form}
        >
            <div className="grid grid-cols-4 gap-x-4">
                <div className={`${currentUsuario? 'col-span-1 flex': 'col-span-0 hidden'}  items-center justify-center`}>
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
                            : uploadButton({loading: false} )}
                        </Upload>
                    </ImgCrop>
                    <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                        <img alt="example" style={{ width: '100%' }} src={preview} />
                    </Modal>
                    </div>
                </div>

                <div className={`${currentUsuario ? 'col-span-3': 'col-span-4'} grid grid-cols-2 gap-10`}>
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
                        name="telefono"
                        tooltip="Ingresa tu número de teléfono a 10 dígitos"
                        rules={[
                            {
                                message: 'Por favor ingresa tu número de teléfono a 10 dígitos',
                                pattern: new RegExp(/^[0-9]{10}$/),
                            }
                        ]}
                    >
                        <Input type='tel' className="w-full"  onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            form.setFieldsValue({telefono: value})
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Estatus"
                        name="status"
                    >
                        <Select>
                            <Select.Option value="ACTIVO"> <p className='text-devarana-graph'>Activo</p> </Select.Option>
                            <Select.Option value="INACTIVO"> <p className='text-devarana-graph'>Inactivo</p> </Select.Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <div className="flex justify-end mt-2 gap-x-2">
                <Button classColor="primary" classType='regular' width={'auto'} type="submit" className="mr-2" disabled={isCreating || isUpdating}> <FaSave /> </Button>
                <Button classColor="dark" classType='regular' width={'auto'} type="button" onClick={nextStep} className="mr-2" disabled={!currentUsuario}>
                    <FaArrowRight /> 
                </Button>
            </div>
        </Form>
    )
}
