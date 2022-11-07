import React from 'react'


interface BadgeProps{
    badgeType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'gray' | 'orange' | 'pink';
    badgeSize?: string
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    fontSize?: string;
}

export const Badge = ({badgeType, badgeSize = "w-16 h-16", children, className =  "", fontSize = "text-3xl"}:BadgeProps) => {

    const badgeSelector = () => {
        switch(badgeType) {
            case 'primary':
                return 'text-white bg-gradient-to-tr from-custom-dark to-custom-dark2';
            case 'secondary':
                return 'text-white bg-gradient-to-tr from-custom-blue to-custom-blue2';
            case 'success':
                return 'text-white bg-gradient-to-tr from-custom-green to-custom-green2';
            case 'danger':
                return 'text-white bg-gradient-to-tr from-custom-red to-custom-red2';
            case 'warning':
                return 'text-white bg-gradient-to-tr from-custom-orange to-custom-orange2';
            case 'gray':
                return 'text-white bg-gradient-to-tr from-custom-gray to-custom-gray2';
            case 'orange':
                return 'text-white bg-gradient-to-tr from-custom-orange to-custom-orange2';
            case 'pink':
                return 'text-white bg-gradient-to-tr from-custom-pink to-custom-pink2';
            default:
                return 'text-custom-gray2';
        }
    }
    
  return (
    <div className={`${badgeSelector()} ${badgeSize }  ${ className } text-white p-4 rounded-md shadow align-middle flex`}>
        <div className={`${fontSize}  w-full justify-center flex m-auto`}>
            { children }
        </div>
    </div>
  )
}
