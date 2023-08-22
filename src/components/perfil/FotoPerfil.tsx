import { Image, Spin, Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import { Button } from '../ui'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { PerfilProps } from '@/interfaces';
import getBrokenUser from '@/helpers/getBrokenUser';
import { getStorageUrl } from '@/helpers';
import { FaUpload } from 'react-icons/fa';
import { uploadProfilePictureThunk } from '@/redux/features/perfil/perfilThunk';
import { useAppDispatch } from '@/redux/hooks';
import ImgCrop from 'antd-img-crop';


interface Props {
    usuarioActivo: PerfilProps
}

export const FotoPerfil = ({usuarioActivo}: Props) => {

    const [ fileList, setFileList ] = useState<UploadFile[]>([]);
    const [ previewImage, setPreviewImage ] = useState<string>('');
    const [ uploading, setUploading ] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();


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

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as RcFile);
        });

        setUploading(true);
        
        await dispatch(uploadProfilePictureThunk({profile: formData, usuarioId: usuarioActivo.id}))

        setUploading(false);
        setFileList([]);

        messageApi.success('Foto de perfil actualizada correctamente');
        
    }

    useEffect(() => {
        if(fileList && fileList.length > 0) {
            handleUpload();
        }
    }, [fileList])



    return (
        <div>
            {
                contextHolder
            }
            <div className='flex relative group rounded-full' style={{ width: 200, height: 200 }}>
            {
                <Image
                    src={fileList.length > 0 ? previewImage : usuarioActivo.foto !== '' ? getStorageUrl(usuarioActivo.foto) : getBrokenUser()}
                    alt={usuarioActivo.nombre}
                    className='w-full rounded-full'
                    width={200}
                    height={200}
                    fallback={getBrokenUser()}
                />                        
            }
                <div className='absolute top-0 left-0 w-full h-full  rounded-full bg-black bg-opacity-50 gap-x-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    <ImgCrop
                        modalTitle='Editar foto de perfil'
                        cropShape='round'
                        modalClassName='antd-img-crop-modal'
                        modalOk='Recortar'

                    >
                        <Upload
                            name='banner'
                            {...props}
                        >
                            <Button classColor='default' classType='icon' width={40} > <FaUpload /> </Button>
                        </Upload>
                    </ImgCrop>
                </div>
            </div>
            <div className='flex items-center justify-center pt-10'>
                {
                    fileList.length !== 0 && (
                        <Spin spinning tip='Subiendo foto de perfil...' />
                        // <Button disabled={uploading} classColor='dark' classType='regular' width={150} onClick={handleUpload}> Guardar </Button>
                    )

                }
            </div>
        </div>
    )
}
