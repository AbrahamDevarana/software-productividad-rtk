import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


interface UploadProps {
    defaultFileList?: any[];
    onChange?: (info: any) => void;
    onPreview?: (file: any) => void;
}

export const FileUpload: React.FC<UploadProps> = ({ defaultFileList, onChange, onPreview }) => {
    const [fileList, setFileList] = useState<any[]>(defaultFileList || []);
  
    const handleChange = (info: any) => {
      setFileList(info.fileList.slice(-1));
      onChange && onChange(info);
    };
  
    const handlePreview = (file: any) => {
      onPreview && onPreview(file);
    };
  
    const uploadButton = (
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  
    return (
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        beforeUpload={() => false}
        maxCount={1}
      >
        {fileList.length === 0 && uploadButton}
      </Upload>
    );
  };
  