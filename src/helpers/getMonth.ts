export const getMesInicio = (quarter:number) => {
    switch (quarter) {
        case 1:
            return 'ENE';
        case 2:
            return 'ABR';
        case 3:
            return 'JUL';
        case 4:
            return 'OCT';
        default:
            return '';
    }
};

export const getMesFin = (quarter:number) => {
    switch (quarter) {
        case 1:
            return 'MAR';
        case 2:
            return 'JUN';
        case 3:
            return 'SEP';
        case 4:
            return 'DIC';
        default:
            return '';
    }
};