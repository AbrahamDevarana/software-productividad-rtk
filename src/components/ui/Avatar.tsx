import React from 'react'
import { Avatar, Image } from 'antd';
import brokenUser from '../../helpers/brokenUser';

interface AvatarProps{
    picture?: string;
    userName?: string;
    className?: string;
    key?: number;
    children?: React.ReactNode | React.ReactNode[];
    size?: 'large' | 'small' | 'default';
}

const AvatarProfile = ({picture = '', userName, size='large', ...props}: AvatarProps) => {

    return ( 
        <Avatar size={size} src={ <Image fallback={brokenUser()} src={picture} /> } />
     );
}
 

export default AvatarProfile;