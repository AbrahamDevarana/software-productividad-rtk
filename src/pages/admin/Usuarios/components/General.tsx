
import { Input, Form, Upload, Modal, Select } from 'antd';
import { Button } from '@/components/ui';
import { useCreateUsuarioMutation, useUpdateUsuarioMutation } from '@/redux/features/usuarios/usuariosThunks';
import { uploadUserPicture } from '@/helpers';
import { useUploadAvatar } from '@/hooks/useUploadAvatar';
import { uploadButton } from '@/components/ui/UploadButton';
import ImgCrop from 'antd-img-crop';
import { FaArrowRight, FaSave } from 'react-icons/fa';
import { toast } from 'sonner';


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
            toast.promise(updateUser(query).unwrap(), {
                loading: 'Actualizando Usuario...',
                success: 'Usuario Actualizado Correctamente.',
                error: 'Error al actualizar el usuario'
            })
        }else {
            toast.promise(createUser(query).unwrap(), {
                loading: 'Creando Usuario...',
                success: 'Usuario Creado Correctamente.',
                error: 'Error al crear el usuario'
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
                    <Form.Item
                        label="Evaluable"
                        name="isEvaluable"
                        tooltip="¿El usuario se puede evaluar?"
                    >
                        <Select>
                            <Select.Option value={true}> <p className='text-devarana-graph'>Si</p> </Select.Option>
                            <Select.Option value={false}> <p className='text-devarana-graph'>No</p> </Select.Option>
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
