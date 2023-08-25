import { useState, useEffect } from 'react';
import '@/assets/scss/loading.scss';

const Loading = ({ texto = "Cargando", dynamic = false }) => {
    const loadingPhrases = [
        'Cargando',
        'Preparando el café mientras obtengo los datos...',
        'El hacker esta reiniciando sistemas',
        '¡Cargando planos digitales para construir el futuro!',
        'Cargando grúas virtuales para elevar la eficiencia...',
        'Cargando datos con la misma firmeza que esa barda que solía estar en pie...',
        'Haciendo una pausa dramática para cargar datos emocionantes...',
        'Shhh! Los datos están tratando de concentrarse mientras cargan...',
        '¿Sabías que las nubes digitales a veces tienen forma de perritos? 🐶',
        'Midiendo la velocidad de la luz... bueno, casi.',
    ];

    const [randomPhrase, setRandomPhrase] = useState(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
            setRandomPhrase(loadingPhrases[randomIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex w-full h-screen justify-center items-center align-middle flex-col">
            <span className="loader"></span>
            <p className="text-center pt-5 text-devarana-graph font-mulish font-light"> {dynamic ? randomPhrase : texto} </p>
        </div>
    );
};

export default Loading;
