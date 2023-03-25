import { useState, useEffect } from 'react';

interface Color {
    name: string;
    rgba: string;
    hex: string;
    hexLow: string;
    gradient?: string;
}

type statusId = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'default';
  
  const statusColors: Record<string, Color> = {

    primary: {
        name: 'primary',
        rgba: 'rgba(9, 103, 201, 1)',
        hex: '#0967C9',
        hexLow: '#408FE3',
        gradient: 'linear-gradient(180.77deg, #408FE3 0%, #0967C9 100%);',
    },
    secondary: {
        name: 'secondary',
        rgba: 'rgba(229, 17, 65, 1)',
        hex: '#E51141',
        hexLow: '#FF6E8F',
        gradient: 'linear-gradient(180.77deg, #FF6E8F 0%, #E51141 100%);',
    },
    info: {
        name: 'info',
        rgba: 'rgba(240, 152, 20, 1)',
        hex: '#F09814',
        hexLow: '#F3B860',
        gradient: 'linear-gradient(180.77deg, #F3B860 0%, #F09814 100%);',
    },
    success: {
        name: 'success',
        rgba: 'rgba(17, 195, 28, 1)',
        hex: '#11C31C',
        hexLow: '#75DD7B',
        gradient: 'linear-gradient(180.77deg, #75DD7B 0%, #11C31C 100%);',
    },
    warning: {
        name: 'warning',
        rgba: 'rgba(240, 228, 56, 1)',
        hex: '#F0E438',
        hexLow: '#F3ED90',
        gradient: 'linear-gradient(180.77deg, #F3ED90 0%, #F0E438 100%);',
    },
    error: {
        name: 'error',
        rgba: 'rgba(203, 0, 7, 1)',
        hex: '#CB0007',
        hexLow: '#EC4D49',
        gradient: 'linear-gradient(180.77deg, #EC4D49 0%, #CB0007 100%);',
    },
    dark: {
        name: 'dark',
        rgba: 'rgba(46, 49, 54, 1)',
        hex: '#2E3136',
        hexLow: '#656A76',
        gradient: 'linear-gradient(180.77deg, #656A76 0%, #2E3136 100%);',
    },
    black: {
        name: 'black',
        rgba: 'rgba(66, 66, 74, 1)',
        hex: '#42424a',
        hexLow: '#848891',
        gradient: 'linear-gradient(180.77deg, #848891 0%, #42424A 100%);',
    },
    default: {
        name: 'default',
        rgba: 'rgba(101, 106, 118, 1)',
        hex: '#656A76',
        hexLow: '#848891',
        gradient: 'linear-gradient(180.77deg, #848891 0%, #656A76 100%);',
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
      });
    }, [statusId, alpha]);
    
    return color;
}
