import { Image } from 'antd'
import React, { useState } from 'react'
import { Button } from './Button'
import { AiFillSave } from 'react-icons/ai'

interface Props {
  galeria?: PictureProps[]
  picture: PictureProps
  setPicture?: any
  handleGallery?: () => void
}

interface PictureProps {
  id: string
  url: string
}

export const Galeria = ({picture, setPicture, handleGallery}: Props) => {

	const galeria: PictureProps[] = [
		{
			id: '1',
			url: 'https://picsum.photos/201'
		},
		{
			id: '2',
			url: 'https://picsum.photos/202'
		},
		{
			id: '3',
			url: 'https://picsum.photos/203'
		},
		{
			id: '4',
			url: 'https://picsum.photos/204'
		}
	]

  return (
    <>
       <div className='grid grid-cols-4 gap-10'>
			<Image.PreviewGroup>
				{ galeria.map((foto, index) => (
					<div className={`rounded-xl overflow-hidden col-span-1 ${ picture.url === foto.url ? 'border border-black' : ''}`} key={index} onClick={() => setPicture(foto)}>
						<Image src={foto.url} alt={foto.id} preview={false} className='w-full object-cover' />
					</div>
				))}
			</Image.PreviewGroup>
	   </div>

		<div className='flex justify-end pt-5'>
				<Button classType='regular' width={50} classColor='primary' onClick={handleGallery}>
					<AiFillSave />
				</Button>
		</div>
    </>
 	 )
}
