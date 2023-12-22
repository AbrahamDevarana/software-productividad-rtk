import { useMemo } from 'react';

const useCalculoBono = (calculoAvance: number): number => {
    const calculoBono: number = useMemo(() => {
        const rangos: { [key: number]: number } = {
            0: 0,
            85: 0,
            86: 75,
            88: 80,
            90: 85,
            92: 90,
            94: 95,
            96: 100,
            98: 105,
            100: 110,
        };

        let puntuacion = 0;
        for (let rango in rangos) {
            if (calculoAvance >= parseInt(rango)) {
                puntuacion = rangos[rango];
            } else {
                break;
            }
        }

        return puntuacion;
    }, [calculoAvance]);

    return calculoBono;
};

export default useCalculoBono;
