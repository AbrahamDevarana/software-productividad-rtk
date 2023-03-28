export interface AreaProps {
    key: React.Key;
    nombre: string;
    acciones: string;
    subArea?: AreaProps[]
}