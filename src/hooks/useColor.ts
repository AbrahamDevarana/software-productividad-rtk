import { useMemo } from 'react';

type IdToTypeMap = { [key: number]: string } & { [key: string]: string };

export function useColor(idOrType: string | number, opacity: number = 1) {
  const idToTypeMap: IdToTypeMap = {
    1: 'default',
    2: 'primary',
    3: 'success',
    4: 'error',
    5: 'warning',
    6: 'info',
    7: 'dark',
    8: 'black',
  };

  const type = idToTypeMap[idOrType] || idOrType;
  
  const { color, nombre, lowColor } = useMemo(() => {
    let color, nombre, lowColor;

    switch (type) {
      case 'default':
        color = `rgba(101, 106, 118, ${opacity})`;
        lowColor = `rgba(132, 136, 145, ${opacity})`; 
        nombre = 'Sin Iniciar';
        break;
      case 'primary':
        color = `rgba(64, 143, 227, ${opacity})`;
        lowColor = `rgba(9, 103, 201, ${opacity})`;
        nombre = 'En Progreso';
        break;
      case 'success':
        color = `rgba(117, 221, 123, ${opacity})`;
        lowColor = `rgba(17, 195, 28, ${opacity})`;
        nombre = 'Finalizado';
        break;
      case 'error':
          color = `rgba(236, 77, 73, ${opacity})`;
          lowColor = `rgba(203, 0, 7, ${opacity})`;
        nombre = 'Cancelado';
        break;
      case 'warning':
        color = `rgba(243, 184, 96, ${opacity})`;
        lowColor = `rgba(240, 152, 20, ${opacity})`;
        nombre = 'Detenido';
        break;
    //   case 'warning':
    //     color = `rgba(240, 228, 56, ${opacity})`;
    //     lowColor = `rgba(243, 237, 144, ${opacity})`;
    //     nombre = 'Detenido';
    //     break;
      case 'info':
        color = `rgba(240, 152, 20, ${opacity})`;
        lowColor = `rgba(240, 152, 20, ${opacity})`;
        nombre = 'Info';
        break;
      case 'dark':
        color = `rgba(46, 49, 54, ${opacity})`;
        lowColor = `rgba(46, 49, 54, ${opacity})`;
        nombre = 'Dark';
        break;
      case 'black':
        color = `rgba(66, 66, 74, ${opacity})`;
        lowColor = `rgba(66, 66, 74, ${opacity})`;
        nombre = 'Black';
        break;
      default:
        color = `rgba(101, 106, 118, ${opacity})`;
        lowColor = `rgba(101, 106, 118, ${opacity})`;
        nombre = 'Tipo Desconocido';
    }

    return { color, nombre, lowColor };
  }, [opacity, type]);

  return { color, nombre, type, lowColor };
}


