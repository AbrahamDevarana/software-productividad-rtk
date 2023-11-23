import { InitialState } from "./slice";

export interface GaleriaProps{
    id: number;
    type: string;
    url: string;
}


export interface GaleriaDevaranaState extends InitialState {
    galeriaDevarana: GaleriaProps[];
    galeriaUsuarios: GaleriaProps[];

}