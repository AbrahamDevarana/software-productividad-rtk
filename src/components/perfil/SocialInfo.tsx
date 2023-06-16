import { PerfilProps } from '@/interfaces';
import { Input } from 'antd';
import { useState } from 'react';
import { AiFillAccountBook, AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineLink } from 'react-icons/ai';
import { IoShareSocialSharp } from 'react-icons/io5';
import { useAppDispatch } from '@/redux/hooks';
import { updateProfileThunk } from '@/redux/features/profile/profileThunk';
import { Button } from '../ui';



interface Props {
    usuarioActivo: PerfilProps
}


export const SocialInfo = ({usuarioActivo}: Props) => {

    const dispatch = useAppDispatch()
    const [ redes, setRedes ] = useState(usuarioActivo.social)

    const { social } = usuarioActivo


    const handleOnChange = (e: any) => {
        const { name, value } = e.target

        // quitar https o http de la url
        const finalValue = value.replace(/(^\w+:|^)\/\//, '')


        setRedes({
            ...redes,
            [name]: {
                url: finalValue,
                nombre: name,
            }
        })
    }

    const handleOnSubmit = () => {

        const query = {
            ...usuarioActivo,
            social: redes
        }

        dispatch(updateProfileThunk(query))
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-5'>
                <div className='flex items-center justify-center gap-x-2 col-span-1'>
                    <AiFillLinkedin className='text-4xl text-blue-500' />
                    <Input
                        className='w-full'
                        name='linkedin'
                        value={redes.linkedin.url}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='flex items-center justify-center gap-x-2 col-span-1'>
                    <AiFillFacebook className='text-4xl text-blue-500' />
                    <Input
                        className='w-full'
                        name='facebook'
                        value={redes.facebook.url}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='flex items-center justify-center gap-x-2 col-span-1'>
                    <AiFillInstagram className='text-4xl text-devarana-pink' />
                    <Input
                        className='w-full'
                        name='instagram'
                        value={redes.instagram.url}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='flex items-center justify-center gap-x-2 col-span-1'>
                    <AiOutlineLink className='text-4xl text-default' />
                    <Input
                        className='w-full'
                        name='otros'
                        value={redes.otros.url}
                        onChange={handleOnChange}
                    />
                </div>

                <div className='flex justify-end col-span-2'>
                    <Button
                        classColor='dark'
                        classType='regular'
                        onClick={handleOnSubmit}
                        width={150}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </>
    )
}
