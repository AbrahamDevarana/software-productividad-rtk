import { useState, useEffect } from 'react';

interface Color {
    name: string;
    rgba: string;
    hex: string;
    rgb?: number[];
    gradient?: string;
}

type statusId = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark' | 'black' | 'default';
  
  const statusColors: Record<string, Color> = {

    primary: {
        name: 'primary',
        rgba: 'rgba(236, 64, 122, 1)',
        hex: '#EC407A',
        gradient: 'linear-gradient(60deg, #ab47bc, #ec407a)'
    },
    secondary: {
        name: 'secondary',
        rgba: 'rgba(253, 224, 69, 1)',
        hex: '#fde045',
        gradient: 'linear-gradient(45deg, #fde045, #fde045)'
    },
    info: {
        name: 'info',
        rgba: 'rgba(73, 163, 241, 1)',
        hex: '#49a3f1',
        gradient: 'linear-gradient(45deg, #49a3f1, #1A73E8)',
    },
    success: {
        name: 'success',
        rgba: 'rgba(102, 187, 106, 1)',
        hex: '#66BB6A',
        gradient: 'linear-gradient(45deg, #66BB6A, #43A047)', 
    },
    warning: {
        name: 'warning',
        rgba: 'rgba(255, 167, 38, 1)',
        hex: '#FFA726',
        gradient: 'linear-gradient(45deg, #FFA726 , #FB8C00)'
    },
    error: {
        name: 'error',
        rgba: 'rgba(239, 83, 80, 1)',
        hex: '#EF5350',
        gradient: 'linear-gradient(45deg, #EF5350, #E53935)'
    },
    light: {
        name: 'light',
        rgba: 'rgba(235, 239, 244, 1)',
        hex: '#EBEFF4',
        gradient: 'linear-gradient(45deg, #EBEFF4, #BDBDBD)'
    },
    dark: {
        name: 'dark',
        rgba: 'rgba(52, 71, 103, 1)',
        hex: '#344767',
        gradient: 'linear-gradient(45deg, #344767, #1A1A1A)'
    },
    black: {
        name: 'black',
        rgba: 'rgba(66, 66, 74, 1)',
        hex: '#42424a',
        gradient: 'linear-gradient(45deg, #42424a, #191919)'
    },
    default: {
        name: 'default',
        rgba: 'rgba(116, 123, 138, 1)',
        hex: '#747b8a',
        gradient: 'linear-gradient(45deg, #747b8a, #495361)'
    }





    
  };

export const useGetColorByStatus = (statusId: statusId, alpha: number = 1) => {
    const [color, setColor] = useState<Color>(statusColors[statusId]);

    useEffect(() => {
      const [r, g, b] = color.rgba.match(/\d+/g)!.map(Number) as [number, number, number];
      const rgbaString = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      setColor({
        ...color,
        rgba: rgbaString,
        rgb: [r, g, b],
      });
    }, [statusId, alpha]);
    
    return color;
}
