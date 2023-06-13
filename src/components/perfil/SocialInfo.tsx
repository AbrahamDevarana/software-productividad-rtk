import { PerfilProps } from '@/interfaces';
import { Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { IoShareSocialSharp } from 'react-icons/io5';
import { Button } from '../ui';
import { useAppDispatch } from '@/redux/hooks';
import { updateProfileSocialThunk } from '@/redux/features/profile/profileThunk';



interface SocialProsp {
    usuarioActivo: PerfilProps
}


export const Social: React.FC<SocialProsp> = ({usuarioActivo}) => {

    const dispatch = useAppDispatch()

    const { social } = usuarioActivo

    const handleSocial = (url: string | undefined = '', nombre: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'otro' = 'otro') => {
        
        if (url) {
            dispatch(updateProfileSocialThunk({url, nombre}))
        }  
        
    }


    return (
        <>
            <div className='grid grid-cols-2 gap-10'>
                <div className='col-span-1 items-center flex'>
                    <AiFillLinkedin className='text-2xl mr-2 text-[#0A66C2]'/>
                    <Input type="text" value={social?.find(social => social.nombre === 'linkedin')?.url} onBlur={(e) => handleSocial(e.target.value, 'linkedin')} />
                </div>
                <div className='col-span-1 items-center flex'>
                    <AiFillFacebook className='text-2xl mr-2 text-[#1877F2]'/>
                    <Input type="text" value={social?.find(social => social.nombre === 'facebook')?.url} onBlur={(e) => handleSocial(e.target.value, 'facebook')} />
                </div>
                <div className='col-span-1 items-center flex'>
                    <AiFillInstagram className='text-2xl mr-2 text-[#D54084]'/>
                    <Input type="text" value={social?.find(social => social.nombre === 'instagram')?.url} onBlur={(e) => handleSocial(e.target.value, 'instagram')} />
                </div>
                <div className='col-span-1 items-center flex'>
                    <IoShareSocialSharp className='text-2xl mr-2 text-devarana-dark-graph'/>
                    <Input type="text" value={social?.find(social => social.nombre === 'otro')?.url}  onBlur={(e) => handleSocial(e.target.value, 'otro')} />
                </div>

            </div>
        </>
    )
}
