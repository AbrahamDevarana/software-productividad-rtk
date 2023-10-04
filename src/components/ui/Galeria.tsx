import { Image } from 'antd'
import React, { useState } from 'react'
import { Button } from './Button'
import { AiFillSave } from 'react-icons/ai'
import { GaleriaDevaranaProps } from '@/interfaces'
import Loading from '../antd/Loading'
import { getStorageUrl } from '@/helpers'
import { FaEye } from 'react-icons/fa'

interface Props {
  galeria?: GaleriaDevaranaProps[]
  picture: string
  setPicture?: any
  isLoading?: boolean
  handleGallery?: () => void
}

export const Galeria = ({galeria, isLoading, picture, setPicture, handleGallery}: Props) => {

	const [visible, setVisible] = useState(false);
	
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
					{ galeria && galeria.map((foto, index) => (
						<Image src={getStorageUrl(foto.url)} style={{ display: 'none' }} key={index}  className='object-fill' />
					))}
				</Image.PreviewGroup>
			</div>
				
			{ galeria && galeria.map((foto, index) => (
				<div className={`rounded-xl overflow-hidden col-span-1 cursor-pointer ${ picture === foto.url ? 'border border-black' : ''}`} key={index} onClick={() => setPicture(foto.url)}>
					<Image src={getStorageUrl(foto.url)} preview={false}
						wrapperStyle={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							
						}}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				</div>
			))}
		</div>
			<div className='flex justify-between pt-5 gap-x-5'>
					<Button width={'auto'} classType='regular' classColor='dark' onClick={() => setVisible(true)}>
						<FaEye className='mr-2'/> Ver Galería
					</Button>
					<Button classType='regular' width={'auto'} classColor='primary' onClick={handleGallery}>
						<AiFillSave />
					</Button>
			</div>
		</>
	)
}
