import { PerfilProps } from '@/interfaces';
import { Input } from 'antd';
import { useState } from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineLink } from 'react-icons/ai';
import { useAppDispatch } from '@/redux/hooks';
import { updateProfileThunk } from '@/redux/features/perfil/perfilThunk';
import { Button } from '../ui';
import { toast } from 'sonner';



interface Props {
    usuarioActivo: PerfilProps
}


export const SocialInfo = ({usuarioActivo}: Props) => {

    const dispatch = useAppDispatch()
    const [ redes, setRedes ] = useState(usuarioActivo.social)
    

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

    const handleOnSubmit =  async () => {

        const query = {
            ...usuarioActivo,
            social: redes
        }

        toast.promise(
            dispatch(updateProfileThunk(query)).unwrap(),
            {
                loading: 'Guardando...',
                success: 'Perfil actualizado correctamente',
                error: 'Ocurrió un error al actualizar el perfil'
            }
        )
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-5'>
                <div className='flex items-center justify-center gap-x-2 lg:col-span-1 col-span-2'>
                    <AiFillLinkedin className='text-4xl text-blue-500' />
                    <Input
                        className='w-full'
                        name='linkedin'
                        value={redes.linkedin.url}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='flex items-center justify-center gap-x-2 lg:col-span-1 col-span-2'>
                    <AiFillFacebook className='text-4xl text-blue-500' />
                    <Input
                        className='w-full'
                        name='facebook'
                        value={redes.facebook.url}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='flex items-center justify-center gap-x-2 lg:col-span-1 col-span-2'>
                    <AiFillInstagram className='text-4xl text-devarana-pink' />
                    <Input
                        className='w-full'
                        name='instagram'
                        value={redes.instagram.url}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='flex items-center justify-center gap-x-2 lg:col-span-1 col-span-2'>
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
