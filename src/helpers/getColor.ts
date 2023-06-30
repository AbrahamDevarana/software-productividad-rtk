import { statusTypes } from "@/types";


type StatusTypes = typeof statusTypes[keyof typeof statusTypes];


export const getColor = (status: StatusTypes, opacity: number = 1) => {

    let color, lowColor;


    switch (status) {
        case 'SIN_INICIAR':
            color = `rgba(101, 106, 118, ${opacity})`;
            lowColor = `rgba(132, 136, 145, ${opacity})`;
            break;
        
        case 'EN_TIEMPO':
            color = `rgba(64, 143, 227, ${opacity})`;
            lowColor = `rgba(9, 103, 201, ${opacity})`;
            break;
        
        case 'FINALIZADO':
            color = `rgba(117, 221, 123, ${opacity})`;
            lowColor = `rgba(17, 195, 28, ${opacity})`;
            break;
        
        case 'CANCELADO':
            color = `rgba(236, 77, 73, ${opacity})`;
            lowColor = `rgba(203, 0, 7, ${opacity})`;
            break;

        case 'EN_PAUSA':
            color = `rgba(238, 152, 25, ${opacity})`;
            lowColor = `rgba(243, 184, 96, ${opacity})`;
            break;
        
        case 'RETRASADO':
            color = `rgba(243, 184, 96, ${opacity})`;
            lowColor = `rgba(240, 152, 20, ${opacity})`;
            break;
        
        default:
            color = `rgba(101, 106, 118, ${opacity})`;
            lowColor = `rgba(101, 106, 118, ${opacity})`;
    }

    return { color, lowColor };
}