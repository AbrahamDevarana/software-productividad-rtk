import { statusType } from '@/types';
import React from 'react'


interface BadgeProps{
    badgeType: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'default' | 'warning' | 'dark';
    badgeSize?: string
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    fontSize?: string;
}

export const Badge = ({badgeType, badgeSize = "w-16 h-16", children, className =  "", fontSize = "text-3xl"}:BadgeProps) => {

    const badgeSelector = () => {
        switch(badgeType) {
            case 'primary':
                return 'text-white bg-gradient-to-tr from-primary to-primary-light';
            case 'secondary':
                return 'text-white bg-gradient-to-tr from-secondary to-secondary-light';
            case 'success':
                return 'text-white bg-gradient-to-tr from-success to-success-light';
            case 'error':
                return 'text-white bg-gradient-to-tr from-error to-error-light';
            case 'info':
                return 'text-white bg-gradient-to-tr from-info to-info-light';
            case 'default':
                return 'text-white bg-gradient-to-tr from-default to-default-light';
            case 'warning':
                return 'text-white bg-gradient-to-tr from-warning to-warning-light';
            case 'dark':
                return 'text-white bg-gradient-to-tr from-dark to-dark-light';
            default:
                return 'text-white bg-gradient-to-tr from-primary to-primary-light';
        }
    }
    
  return (
    <div className={`${badgeSelector()} ${badgeSize }  ${ className } text-white p-4 rounded-md shadow align-middle flex dark`}>
        <div className={`${fontSize}  w-full justify-center flex m-auto`}>
            { children }
        </div>
    </div>
  )
}
