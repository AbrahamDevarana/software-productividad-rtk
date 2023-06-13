import { Image } from 'antd'
import React, { useState } from 'react'
import { Button } from './Button'
import { AiFillSave } from 'react-icons/ai'

interface Props {
  galeria?: Fotos[]
  picture?: string
  setPicture?: any
}

interface Fotos {
  id: string
  url: string
}

export const Galeria = ({picture, setPicture}: Props) => {


	const [selected, setSelected] = useState(picture)


	const galeria: Fotos[] = [
		{
			id: '1',
			url: 'https://picsum.photos/200'
		},
		{
			id: '2',
			url: 'https://picsum.photos/200'
		},
		{
			id: '3',
			url: 'https://picsum.photos/200'
		},
		{
			id: '4',
			url: 'https://picsum.photos/200'
		}
	]


	const handleOnSelect = () => {
		setPicture(selected)
	}

  return (
    <>
       <div className='grid grid-cols-4 gap-10'>
			<Image.PreviewGroup>
				{ galeria.map((foto) => (
					<div className={`rounded-xl overflow-hidden col-span-1 ${ selected === foto.id ? 'border border-black' : ''}`} key={foto.id} onClick={() => setSelected(foto.id)}>
						<Image src={foto.url} alt={foto.id} preview={false} className='w-full object-cover' />
					</div>
				))}
			</Image.PreviewGroup>
	   </div>

		<div className='flex justify-end pt-5'>
				<Button classType='regular' width={50} classColor='primary' onClick={handleOnSelect}>
					<AiFillSave />
				</Button>
		</div>
    </>
 	 )
}
