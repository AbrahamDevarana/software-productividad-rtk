import { status } from '../helpers/status';
import { useMemo } from 'react';
type Color = {
    name: string;
    rgba: string;
    hex: string;
    hexLow: string;
    gradient: string;
    status?: string;
    key?: number;
};

  
  const getColors = (opacity: number): Record<string, Color> => {
    const colors: Color[] = [
      {
        name: 'default',
        rgba: `rgba(101, 106, 118, ${opacity})`,
        hex: '#656A76',
        hexLow: '#848891',
        gradient: 'linear-gradient(180.77deg, #848891 0%, #656A76 100%);',
        status: 'Sin Iniciar',
        key: 1
      },
      {
        name: 'primary',
        rgba: `rgba(9, 103, 201, ${opacity})`,
        hex: '#0967C9',
        hexLow: '#408FE3',
        gradient: 'linear-gradient(180.77deg, #408FE3 0%, #0967C9 100%);',
        status: 'En Proceso',
        key: 2
      },
      {
        name: 'success',
        rgba: `rgba(17, 195, 28, ${opacity})`,
        hex: '#11C31C',
        hexLow: '#75DD7B',
        gradient: 'linear-gradient(180.77deg, #75DD7B 0%, #11C31C 100%);',
        status: 'Finalizado',
        key: 3
      },
      {
        name: 'error',
        rgba: `rgba(203, 0, 7, ${opacity})`,
        hex: '#CB0007',
        hexLow: '#EC4D49',
        gradient: 'linear-gradient(180.77deg, #EC4D49 0%, #CB0007 100%);',
        status: 'Cancelado',
        key: 4
      },
      {
        name: 'warning',
        rgba: `rgba(240, 228, 56, ${opacity})`,
        hex: '#F0E438',
        hexLow: '#F3ED90',
        gradient: 'linear-gradient(180.77deg, #F3ED90 0%, #F0E438 100%);',
        status: 'Detenido',
        key: 5
      },
      {
        name: 'info',
        rgba: `rgba(240, 152, 20, ${opacity})`,
        hex: '#F09814',
        hexLow: '#F3B860',
        gradient: 'linear-gradient(180.77deg, #F3B860 0%, #F09814 100%);',
      },
      {
        name: 'dark',
        rgba: `rgba(46, 49, 54, ${opacity})`,
        hex: '#2E3136',
        hexLow: '#656A76',
        gradient: 'linear-gradient(180.77deg, #656A76 0%, #2E3136 100%);',
      },
      {
        name: 'black',
        rgba: `rgba(66, 66, 74, ${opacity})`,
        hex: '#42424a',
        hexLow: '#848891',
        gradient: 'linear-gradient(180.77deg, #848891 0%, #42424A 100%);',
      },
    ];
  
    const colorMap: Record<string, Color> = {};
    colors.forEach((color) => {
      colorMap[color.name] = color;
    });
  
    return colorMap;
  };
  
  
  export function useGetColor(nameOrIndex: string | number = 1, opacity: number = 1): Color | undefined {


    
     
    const color = useMemo(() => {
        // Si hay opacity, se agrega al color

        const colors = getColors(opacity);
    
        if (typeof nameOrIndex === 'string') {
            return colors[nameOrIndex];
        }
        
        if (typeof nameOrIndex === 'number') {
            const color = colors[status[nameOrIndex]];
            return color;
        }

        return colors.default;
    }, [nameOrIndex, opacity]);


    return color;   
    


  }


  