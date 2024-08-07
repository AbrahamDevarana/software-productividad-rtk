import { useEffect, useMemo, useState } from 'react';
import { ProyectosProps } from '@/interfaces'
import { useCreateProyectoMutation, useGetProyectoQuery, useUpdateProyectoMutation } from '@/redux/features/proyectos/proyectosThunk';
import dayjs from 'dayjs';
import { DatePicker, Form, Image, Input, Select, SelectProps, Skeleton, Upload, UploadFile } from 'antd'
import { useSelectUser } from '@/hooks/useSelectUser';
import { RcFile, UploadProps } from 'antd/es/upload';
import { getStorageUrl } from '@/helpers';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { Button } from '../../../components/ui';
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks';
import ImgCrop from 'antd-img-crop';
import { badgeItems } from '@/components/tasks';
import { useGetCategoriasProyectoQuery } from '@/redux/features/categoriasApi';
import { toast } from 'sonner';

interface FormProyectoProps {
    currentProyecto?: ProyectosProps | null
    handleCancel: () => void
}

const fallbackImage = `${import.meta.env.VITE_STORAGE_URL}custom-images/noBanner.png`

export const FormProyecto = ({currentProyecto, handleCancel}: FormProyectoProps) => { 

    const { data: proyecto, isLoading: isLoadingProyecto } = useGetProyectoQuery( {proyectoId: currentProyecto?.id}, { skip: !currentProyecto} )
    const { data: categorias } = useGetCategoriasProyectoQuery( {} )

    const {data : usuarios } = useGetUsuariosQuery({status: 'ACTIVO'})
    const [sizeAlert, setSizeAlert] = useState(false);
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
            toast.promise(updateProyecto({proyecto: formData, proyectoId:currentProyecto.id}).unwrap(), {
                loading: 'Guardando...',
                success: 'Proyecto actualizado correctamente',
                error: 'Error al actualizar el proyecto',
                finally: () => handleCancel()
            })
        }
        else {
            toast.promise(createProyecto(formData).unwrap(), {
                loading: 'Guardando...',
                success: 'Proyecto creado correctamente',
                error: 'Error al crear el proyecto',
                finally: () => handleCancel()
            })
        }
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
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            setSizeAlert(false);

            if (!isJpgOrPng) {
                toast.error('Solo puedes subir archivos JPG/PNG!');
                return false;
            }

            if (file.size > 2 * 1024 * 1024) {  
                toast.error('El archivo debe ser menor a 2MB');
                // setTimeOut then set sizeAlert to false
                setSizeAlert(true);
                setTimeout(() => {
                    setSizeAlert(false);
                }, 5000);
                return false;
            }
            
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

    const itemsCategoria:SelectProps['options'] = useMemo(() => {

        const emptyItem = { label: 'Sin categoria', value: '' }

        const items = categorias?.map(categoria => ({ 
            label: categoria.nombre, 
            value: categoria.id 
        })) || []

        return [emptyItem, ...items]
        
    }, [categorias])

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
                participantes: proyecto?.usuariosProyecto.map((usuario) => usuario.id) || [],
                status: proyecto?.status || 'SIN_INICIAR',
                categoriaId: proyecto?.categorias[0]?.id || '',
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
                        <ImgCrop
                            aspect={390 / 150}
                            quality={0.8}
                            cropShape='rect'
                            modalProps={{
                                cancelButtonProps: { className: 'text-devarana-dark-graph' },
                                okButtonProps: { className: 'text-white bg-primary-light' }
                            }}
                        >
                            <Upload
                                name='banner'
                                {...props}
                            >
                                <button className='flex justify-center items-center gap-x-2 p-5 text-white' type='button'>
                                    <FaUpload />
                                </button>
                            </Upload>
                        </ImgCrop>
                        {
                            fileList.length > 0 && (
                                <button className='flex items-center gap-x-2 p-5 text-white' type='button' onClick={() => setFileList([])}>
                                    <FaTrash />
                                </button>
                            )
                        }
                       
                    </div>
                    
                </div>
                {
                    sizeAlert && 
                    <p className='text-red-500 text-[10px]'>
                        El archivo debe ser menor a 2MB puedes comprimir tu imagen
                        <a href='https://www.iloveimg.com/compress-image' target='_blank' rel='noreferrer' className='text-primary-light text-[10px]'> aquí </a>
                    </p>
                }
            </div>
            <Form.Item label="Titulo" name="titulo" required className='col-span-12'>
                <Input />
            </Form.Item>
            <Form.Item label="Descripcion" name="descripcion" className='col-span-12'>
                <TextArea rows={5} />
            </Form.Item>
            <Form.Item label="Participantes" name="participantes" className='col-span-6'>
                <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"                      
                        allowClear
                        variant='borderless'
                        tagRender={tagRender}
                        onChange={(value) => setSelectedUsers(value)} 
                        value={selectedUsers}
                        maxLength={3}
                        showSearch
                        className='cursor-pointer'
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
            <Form.Item label="Categoria" name="categoriaId" className='col-span-6'>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Selecciona una categoria"
                    variant='outlined'
                    options={itemsCategoria}
                    size='large'
                >
                </Select>
            </Form.Item>
            <Form.Item label="Fecha de inicio" name="fechaInicio" className='col-span-4'>
                <DatePicker format={'DD/MM/YYYY'} className='w-full'/>
            </Form.Item>
            <Form.Item label="Fecha de fin" name="fechaFin" className='col-span-4'>
                <DatePicker format={'DD/MM/YYYY'} className='w-full' />
            </Form.Item>
            <Form.Item label="Estatus" name="status" className='col-span-4'>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Selecciona un estatus"
                    variant='outlined'
                    options={badgeItems}
                >
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate className='col-span-12 flex justify-end'>
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
