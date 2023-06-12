import { getBase64, getStorageUrl } from "@/helpers";
import { UsuarioProps } from "@/interfaces";
import { deleteProfilePhotoThunk } from "@/redux/features/admin/usuarios/usuariosThunks";
import { useAppDispatch } from "@/redux/hooks";
import { UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";

interface Props {
    currentUsuario: any;
}

export const useUploadAvatar = ({currentUsuario}: Props) => {

    const dispatch = useAppDispatch();

    const [fileList, setFileList] = useState<UploadFile[]>( [] );
    const [preview, setPreview] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);


    const handleOnChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        // dispatch(uploadImageThunk(currentUsuario.id, newFileList))
    }

    const handleOnRemove = async (file: UploadFile) => {
        const res = await dispatch(deleteProfilePhotoThunk(currentUsuario.id))
        setFileList([])
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreview(file.url || (file.preview as string));
        setPreviewOpen(true);
    }


    useEffect(() => {
        if(currentUsuario.id && currentUsuario.foto) {
            setFileList([{
                uid: currentUsuario.id,
                name: currentUsuario.nombre,
                status: 'done',
                url: `${getStorageUrl('profile-picture/'+ currentUsuario.foto)}`
            }])
        }
    }, [currentUsuario])

    return  {
        previewOpen,
        preview,
        fileList,
        handleOnChange,
        handleOnRemove,
        handlePreview,
        setPreviewOpen
    }

}