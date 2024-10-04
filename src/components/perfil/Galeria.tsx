import { Divider, Image, Modal, Progress, Upload } from 'antd'
import { useEffect, useState } from 'react'
import Loading from '../antd/Loading'
import { getBase64, getStorageUrl } from '@/helpers'
import { FaCheck, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteGaleriaUsuarioThunk, getGaleriaDevaranaThunk, getGaleriaUsuarioThunk, uploadGaleriaUsuarioThunk } from '@/redux/features/galeria/galeriaThunk'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { updatePortraitThunk } from '@/redux/features/perfil/perfilThunk'
import { GaleriaProps, PerfilProps } from '@/interfaces'
import { toast } from 'sonner'

interface Props {
	usuarioActivo: PerfilProps
}

export const GaleriaPerfil = ({usuarioActivo}: Props) => {

	
	
	const { galeriaDevarana, galeriaUsuarios, isLoading } = useAppSelector(state => state.galeria)
	const [ fileList, setFileList ] = useState<UploadFile[]>([]);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const dispatch = useAppDispatch();
	const [ uploading, setUploading ] = useState(false);
	const [progress, setProgress] = useState(0);
	const [ picture, setPicture ] = useState(usuarioActivo.configuracion.portadaPerfil)
	
	const { confirm } = Modal;

	useEffect(() => {
		dispatch(getGaleriaDevaranaThunk({}))
        dispatch(getGaleriaUsuarioThunk({ type:'BANNER_PERFIL'} ))
	}, [])


	const props: UploadProps = {
		beforeUpload: (file) => {
			if (file.size > 2097152) {
				toast.error('El tamaño de la imagen no debe ser mayor a 2MB');
				return false;
			}
			setFileList(fileList => [...fileList, file]);
			return false;	
		},
		showUploadList: false,
		fileList,
		itemRender: () => null,
	}


	const handleUpload = async () => {
		
		const formData = new FormData();
		fileList.forEach(file => {
			formData.append('files', file as RcFile);
		})

		setUploading(true);			
		await dispatch(uploadGaleriaUsuarioThunk(formData)).unwrap()
		.then(() => {
			setUploading(false);
			setFileList([]);
			toast.success('Imagen subida con éxito');
		}).catch(() => {
			setUploading(false);
			toast.error('Ocurrió un error al subir la imagen');
		})
	}

	useEffect(() => {
		if (fileList && fileList.length > 0){
			handleUpload();
		}
	}, [fileList])

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (uploading) {
			setProgress(0);
			timer = setInterval(() => {
				setProgress((prevProgress) => {
					// Si es menor a 94, aumenta 5 sino se queda en 99
					if (prevProgress < 94) {	
						return prevProgress + 5;
					}
			
					clearInterval(timer);
					return 99;
				});
			}, 99); // Ajusta el intervalo según lo necesites
		}
		return () => clearInterval(timer);
	}, [uploading]);
	

	const handleGallery = (pictureUrl: string) => {
        dispatch(updatePortraitThunk({ id: usuarioActivo.id,  portadaPerfil: pictureUrl })).unwrap().then(() => {
			setPicture(pictureUrl);
			toast.success('Imagen de portada actualizada');
		}).catch(() => {
			toast.error('Ocurrió un error al actualizar la imagen de portada');
		})
    }


	const handlePreview = async (file: GaleriaProps) => {
		setPreviewImage(file.url as string);
		setPreviewOpen(true);
	}

	const handleDelete = (file: GaleriaProps) => {
		confirm({
			title: '¿Estás seguro de eliminar esta imagen?',
			content: 'Esta acción no se puede deshacer',
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk() {
				dispatch(deleteGaleriaUsuarioThunk({id: file.id})).unwrap().then(() => {
					toast.success('Imagen eliminada con éxito');
				}).catch(() => {
					toast.error('Ocurrió un error al eliminar la imagen');
				})
			},
			onCancel() {
				toast.info('Acción cancelada');
			},
		});
	}


	if(isLoading) return <Loading />

	return (
		<>

		<div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center ${uploading ? 'block' : 'hidden'}`}>
			<div className='bg-white rounded-md p-4 flex items-center gap-x-4 flex-col h-56' style={{ width: '500px'} } >
				<Loading texto='Subiendo Imagen' />
				<Progress percent={progress} />
			</div>
		</div>
	
		

		<div className='flex items-center gap-x-2'>
			<p className='py-2 text-devarana-graph'>Portadas DEVARANA</p>
		</div>
		<div className='grid grid-cols-4 gap-10'>
			{ galeriaDevarana && galeriaDevarana.map((foto, index) => (
				<div className={`rounded-sm overflow-hidden col-span-1 cursor-pointer group  relative ${ picture === foto.url ? 'opacity-30' : ''}`} key={index} >
					<Image 
						src={getStorageUrl(foto.url)}
						preview={false}
						style={{
							width: '100%',
							height: '55px',
							objectFit: 'cover',
						}}
					/>
					{
						foto.url !== picture &&
						<div className='absolute h-14 top-0 right-0 left-0 bottom-0 group-hover:opacity-100 opacity-0 bg-black bg-opacity-70 transition-all duration-500'>
							<div className='flex items-center justify-center h-full'>
								<button className='text-xl text-white hover:text-devarana-dark-graph' disabled={foto.url === picture} onClick={() => handleGallery(foto.url)}><FaCheck  /> </button>
								<button className='text-xl text-white ml-2 cursor-pointer hover:text-devarana-dark-graph' onClick={() => handlePreview(foto)} ><FaEye  /></button>
							</div>
						</div>
					}
				</div>
			))}

			<Divider className='col-span-4' />

		</div>
		<div className='flex items-center gap-x-2'>
			<p className='py-2 text-devarana-graph'>Mis portadas</p>
		</div>
		<div className='grid grid-cols-4 gap-10'>				
			{ galeriaUsuarios && galeriaUsuarios.map((foto, index) => (
				<div className={`overflow-hidden col-span-1 group relative ${ picture === foto.url ? 'opacity-30' : ''}`} key={index} >
					<Image 
						src={getStorageUrl(foto.url)}
						preview={false}
						style={{
							width: '100%',
							height: '55px',
							objectFit: 'cover',
						}}
					/>
					{
						foto.url !== picture &&
						<div className='absolute h-14 top-0 right-0 left-0 bottom-0 group-hover:opacity-100 opacity-0 bg-black bg-opacity-70 transition-all duration-500'>
							<div className='flex items-center justify-center h-full'>
								<button className='text-xl text-white cursor-pointer hover:text-devarana-dark-graph' disabled={foto.url === picture} onClick={() => handleGallery(foto.url)}><FaCheck/> </button>
								<button className='text-xl text-white ml-2 cursor-pointer hover:text-devarana-dark-graph' onClick={() => handlePreview(foto)} ><FaEye/> </button>
								<button className='text-xl text-white ml-2 cursor-pointer hover:text-devarana-dark-graph' disabled={foto.url === picture} onClick={() => handleDelete(foto)}><FaTrash/> </button>
							</div>
						</div>
					}
					
				</div>
			))}
			<div className='col-span-1 flex items-center align-middle border-dashed border text-center w-full hover:bg-devarana-graph hover:bg-opacity-30 cursor-pointer transition-backgroundColor ease-in-out' >
				<ImgCrop 
					modalTitle='Editar foto de perfil'
					modalClassName='antd-img-crop-modal'
					modalOk='Recortar'
					aspect={1700/500}
					showGrid
					modalWidth={800}
				>
					<Upload
						{...props}
						className='w-full h-full flex items-center justify-center'
					>
						{fileList.length < 5 && 
						<div 
							style={{
								width: '100%',
								height: '55px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<FaPlus className='text-3xl text-devarana-graph' />
						</div>}
					</Upload>
				</ImgCrop>
				
			</div>
		</div>

		<Modal 
			open={previewOpen}
			onCancel={() => setPreviewOpen(false)}
			footer={null}
			className='min-w-max'
		>

			<div className='flex items-center justify-center px-3'>
				<Image className='w-full' src={getStorageUrl(previewImage)} preview={false}/>
			</div>
		</Modal>
		</>
	)
}
