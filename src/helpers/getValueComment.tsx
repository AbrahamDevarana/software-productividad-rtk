
export const getValueColaborador = (value: number) => {

    // una escala del 1 al 5, donde 1 es muy malo y 5 es muy bueno acepta valores decimales si 1 a 1.9 es muy malo, 2 a 2.9 es malo, 3 a 3.9 es regular, 4 a 4.9 es bueno y 5 es muy bueno

    if (value >= 1 && value <= 1.9) {
        return (<p className="text-xs"> <span className="font-bold">INSATISFACTORIO</span>: No cumple con las expectativas mínimas del puesto. </p>)
    } else if (value >= 2 && value <= 2.9) {
        return (<p className="text-xs"> <span className="font-bold">POR DEBAJO DE UN NIVEL FUNCIONAL</span>: No cumple con las expectativas y requiere mejoras importantes en su desempeño. </p>)
    } else if (value >= 3 && value <= 3.9) {
        return (<p className="text-xs"> <span className="font-bold">RAZONABLE</span>: Nivel de resultado aceptable pero se requieren mejoras importantes en su desempeño. </p>)
    } else if (value >= 4 && value <= 4.9) {
        return (<p className="text-xs"> <span className="font-bold">BUENO</span>: Satisface expectativas, buenos resultados de forma constante, sigue por este camino. </p>)
    } else if (value === 5) {
        return (<p className="text-xs"> <span className="font-bold">EXCELENTE</span>: Tu rendimiento es por encima del promedio, sobre pasa resultados, ¡estás haciendo un excelente trabajo! </p>)
    } else {
        return ' '
    }
    
}