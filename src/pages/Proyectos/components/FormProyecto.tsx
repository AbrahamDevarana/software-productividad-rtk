import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProyectosProps } from '@/interfaces'
import { useCreateProyectoMutation, useGetProyectoQuery, useUpdateProyectoMutation } from '@/redux/features/proyectos/proyectosThunk';
import dayjs from 'dayjs';
import { DatePicker, Form, Image, Input, message, Select, Skeleton, Upload, UploadFile } from 'antd'
import { useSelectUser } from '@/hooks/useSelectUser';
import { RcFile, UploadProps } from 'antd/es/upload';
import { getStorageUrl } from '@/helpers';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { Button } from '../../../components/ui';
import Loading from '../../../components/antd/Loading';
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks';

interface FormProyectoProps {
    currentProyecto?: ProyectosProps | null
    handleCancel: () => void
}

const fallbackImage = `${import.meta.env.VITE_STORAGE_URL}custom-images/noBanner.png`

export const FormProyecto = ({currentProyecto, handleCancel}: FormProyectoProps) => { 

    const { data: proyecto, isLoading: isLoadingProyecto } = useGetProyectoQuery( {proyectoId: currentProyecto?.id}, { skip: !currentProyecto} )

    const {data : usuarios } = useGetUsuariosQuery({status: 'ACTIVO'})
    const [ fileList, setFileList ] = useState<UploadFile[]>([]);
    const [ previewImage, setPreviewImage ] = useState<string>('');
    const [ uploading, setUploading ] = useState(false);

    const [ updateProyecto, { isLoading: isUpdatingProyecto } ] = useUpdateProyectoMutation()
    const [ createProyecto, { isLoading: isCreatingProyecto } ] = useCreateProyectoMutation()

    const { TextArea } = Input;

    const [form] = Form.useForm();


    useEffect(() => {
        if(!currentProyecto) {form.resetFields()}
    }, [currentProyecto])

    const handleSubmit = async () => {

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
        });

        setUploading(true);

        const query = {
            ...currentProyecto,
            ...form.getFieldsValue(),
        }

        Object.keys(query).forEach((key) => {
            formData.append(key, query[key]);
        });        

        if(currentProyecto) {
            updateProyecto({proyecto: formData, proyectoId:currentProyecto.id}).unwrap().then(() => {
                message.success('Proyecto actualizado correctamente')
            }).catch(() => {
                message.error('Error al actualizar el proyecto')
            })
        }
        else {
            createProyecto(formData).unwrap().then(() => {
                message.success('Proyecto creado correctamente')
            }).catch(() => {
                message.error('Error al crear el proyecto')
            })
        }
        handleCancel()
    }

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    const getBase64 = (file: RcFile, callback: (result: string | ArrayBuffer | null) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
    };

    
    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            getBase64(file, (result) => {
                setPreviewImage(result as string);
            });
            return false;
        },
        itemRender:() => null,
        maxCount: 1,
        fileList,
    };

    if ( isLoadingProyecto ) return <Skeleton active paragraph={{  rows: 10 }} />

    return (
        <Form 
            onFinish={handleSubmit} 
            form={form} 
            className='grid grid-cols-12 gap-x-10'
            layout='vertical'
            initialValues={{
                titulo: proyecto?.titulo,
                descripcion: proyecto?.descripcion,
                fechaInicio: dayjs(proyecto?.fechaInicio).add(6, 'hour'),
                fechaFin: dayjs(proyecto?.fechaFin).add(6, 'hour'),
                participantes: proyecto?.usuariosProyecto.map((usuario) => usuario.id)
            }}
        >
            <p className='text-devarana-graph col-span-12'>Banner {fileList.length > 0 ? '(Vista Previa)' : '(Original)'} </p>
            <div className='col-span-6 col-start-4'>
                <div className='relative group min-h-[150px]'>
                    {
                        <Image
                            src={fileList.length > 0 ? previewImage : currentProyecto?.imagen !== '' ? getStorageUrl(currentProyecto?.imagen) : fallbackImage}
                            alt={currentProyecto?.titulo}
                            className='w-full object-contain rounded-ext'
                            height={150}
                            fallback={fallbackImage}
                            wrapperStyle={{ width: '100%', height: '150px' }}
                        />                        
                    }
                    <div className='absolute top-0 left-0 w-full h-full rounded-ext bg-black bg-opacity-50 gap-x-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <Upload
                            name='banner'
                            {...props}
                        >
                            <Button classColor='default' classType='icon' width={40} > <FaUpload /> </Button>
                            
                        </Upload>
                        {
                            fileList.length > 0 && (
                                <Button classColor='error' classType='icon' width={40} onClick={() => setFileList([])}> 
                                    <FaTrash/> 
                                </Button>
                            )
                        }

                    </div>
                </div>
                
            </div>
            <Form.Item label="Titulo" name="titulo" required className='col-span-12'>
                <Input />
            </Form.Item>
            <Form.Item label="Descripcion" name="descripcion" className='col-span-12'>
                <TextArea rows={5} />
            </Form.Item>
            <Form.Item label="Participantes" name="participantes" className='col-span-12'>
                <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"                      
                        allowClear
                        bordered = {false}
                        tagRender={tagRender}
                        onChange={(value) => setSelectedUsers(value)} 
                        value={selectedUsers}
                        maxLength={3}
                        showSearch
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            )).filter( usuario => usuario.key !== form.getFieldValue('propietarioId') )
                        }
                    </Select>
            </Form.Item>
            <Form.Item label="Fecha de inicio" name="fechaInicio" className='col-span-6'>
                <DatePicker format={'DD/MM/YYYY'} className='w-full'/>
            </Form.Item>
            <Form.Item label="Fecha de fin" name="fechaFin" className='col-span-6'>
                <DatePicker format={'DD/MM/YYYY'} className='w-full' />
            </Form.Item>

            <Form.Item shouldUpdate className='col-span-6'>
                {() => (
                    <Button
                        classColor='primary'
                        classType='regular'
                        type='submit'
                        width={100}
                        disabled={
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                            form.getFieldsValue().titulo === '' || uploading
                        }
                    >
                        Guardar
                    </Button>
                )}
            </Form.Item>

        </Form>
        
    )
}
