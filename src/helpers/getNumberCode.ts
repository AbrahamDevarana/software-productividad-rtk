export function extraerNumero(codigo: string) {

    if (!codigo || codigo === '') return 0;

    const match = codigo.match(/\d+/); // Buscar uno o más dígitos dentro del código
    return match ? parseInt(match[0]) : 0; // Convertir el número extraído a tipo numérico
}
