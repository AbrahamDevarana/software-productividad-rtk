import { getBase64 } from "@/helpers";
import { RcFile} from 'antd/es/upload';
import { UploadFile, UploadProps } from 'antd';
import { useState } from "react";


export const useUploadFile = () => {

   
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]  | any >( [] );


    
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreview(file.url || (file.preview as string));
        setPreviewOpen(true);
    }
    
    const handleOnChange: UploadProps['onChange'] = async ({ fileList }) => {
        setFileList(fileList);
    }
    
    const handleOnRemove = async (file: UploadFile) => {
        setFileList([])
        setPreview('')
    }


    return {
        loading,
        preview,
        previewOpen,
        fileList,
        handlePreview,
        handleOnChange,
        handleOnRemove,
        setPreviewOpen,
        setFileList
    }
}