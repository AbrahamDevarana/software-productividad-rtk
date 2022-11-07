import React from 'react'


interface AvatarProps{
    picture?: string;
    userName?: string;
    className?: string;
    key?: number;
    children?: React.ReactNode | React.ReactNode[];
}

const Avatar = ({picture, userName, ...props}: AvatarProps) => {
    return ( 
        <>
            {picture ? 
                <img  key={props.key} src={picture} alt={userName} className={`rounded-full shadow ${props.className ?? props.className}`} />
            :
                <div key={props.key} className={`flex bg-gradient-to-tr from-gray-600 to-gray-400 rounded-full  ${props.className ?? props.className}`}>
                    <span className="text-white m-auto">{props.children}</span>
                </div>
            }
        </>
     );
}
 

export default Avatar;