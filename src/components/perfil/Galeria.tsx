import { Divider, Image, Upload, UploadFile, UploadProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { AiFillSave } from 'react-icons/ai'
import { GaleriaProps } from '@/interfaces'
import Loading from '../antd/Loading'
import { getStorageUrl } from '@/helpers'
import { FaEye, FaUpload } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getGaleriaDevaranaThunk, getGaleriaUsuarioThunk, uploadGaleriaUsuarioThunk } from '@/redux/features/galeria/galeriaThunk'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'

interface Props {
  picture: string
  setPicture?: any
  handleGallery?: () => void
}

export const GaleriaPerfil = ({picture, setPicture, handleGallery}: Props) => {

	const { galeriaDevarana, galeriaUsuarios, isLoading } = useAppSelector(state => state.galeria)
	const { userAuth } = useAppSelector(state => state.auth)
	const [ fileList, setFileList ] = useState<UploadFile>({} as UploadFile);
	const [visible, setVisible] = useState(false);
	const dispatch = useAppDispatch();
	const [ uploading, setUploading ] = useState(false);

	useEffect(() => {
		dispatch(getGaleriaDevaranaThunk({}))
        dispatch(getGaleriaUsuarioThunk({ type:'BANNER_PERFIL'} ))
	}, [])


	const props: UploadProps = {
		onRemove: () => {},
		beforeUpload: (file) => {
			file.size > 2097152 && message.error('El tamaño de la imagen no debe ser mayor a 2MB');
			setFileList(file);
			return false;
		},
		onChange: (info) => {
			setFileList(info.file);
		},
		showUploadList: false,
	}


	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('file', fileList as RcFile);
		formData.append('usuarioId', 'devarana');
		setUploading(true);	
		await dispatch(uploadGaleriaUsuarioThunk(formData)).unwrap().then(() => {
			setUploading(false);
			setFileList({} as UploadFile);	
			message.success('Imagen subida con éxito');
		}).catch(() => {
			setUploading(false);
			message.error('Ocurrió un error al subir la imagen');
		})
	}


	if(isLoading) return <Loading />


	return (
		<>
		

		<div className='grid grid-cols-4 gap-10'>
			<div className='hidden'>
				<Image.PreviewGroup preview={{
					visible,
					onVisibleChange: (vis) => setVisible(vis),
				}}
				
				>
					{ galeriaDevarana && galeriaDevarana.map((foto, index) => (
						<Image src={getStorageUrl(foto.url)} style={{ display: 'none' }} key={index}  className='object-fill' />
					))}
				</Image.PreviewGroup>
			</div>
				
			{ galeriaDevarana && galeriaDevarana.map((foto, index) => (
				<div className={`rounded-xl overflow-hidden col-span-1 cursor-pointer ${ picture === foto.url ? 'opacity-30' : ''}`} key={index} onClick={() => setPicture(foto.url)}>
					<Image src={getStorageUrl(foto.url)} preview={false}
						wrapperStyle={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							
						}}
						style={{
							width: '100%',
							height: '100%',
							minHeight: '50px',
							objectFit: 'cover',
						}}
					/>
				</div>
			))}

			<Divider className='col-span-4' />

			<div className='hidden'>
				<Image.PreviewGroup preview={{
					visible,
					onVisibleChange: (vis) => setVisible(vis),
				}}
				
				>
					{ galeriaUsuarios && galeriaUsuarios.map((foto, index) => (
						<Image src={getStorageUrl(foto.url)} style={{ display: 'none' }} key={index}  className='object-fill' />
					))}
				</Image.PreviewGroup>
			</div>
				
			{ galeriaUsuarios && galeriaUsuarios.map((foto, index) => (
				<div className={`rounded-xl overflow-hidden col-span-1 cursor-pointer ${ picture === foto.url ? 'opacity-30' : ''}`} key={index} onClick={() => setPicture(foto.url)}>
					<Image src={getStorageUrl(foto.url)} preview={false}
						wrapperStyle={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							
						}}
						style={{
							width: '100%',
							height: '100%',
							minHeight: '50px',
							objectFit: 'cover',
						}}
					/>
				</div>
			))}
		</div>

			

			<div className='flex justify-end pt-5 gap-x-5'>
				<Button width={'auto'} classType='regular' classColor='dark' onClick={() => setVisible(true)}>
					<FaEye />
				</Button>
				<Button classType='regular' width={'auto'} classColor='primary' onClick={handleGallery}>
					<AiFillSave />
				</Button>
				<ImgCrop 
					modalTitle='Editar foto de perfil'
					modalClassName='antd-img-crop-modal'
					modalOk='Recortar'
					aspect={1700/500}
					showGrid
					modalWidth={800}
					onModalOk={handleUpload}
				>
					<Upload
						{...props}
					>
						<Button classType='regular' width={'auto'} classColor='primary' onClick={handleGallery}>
							<FaUpload />
						</Button>
					</Upload>
				</ImgCrop>
				
			</div>
		</>
	)
}
