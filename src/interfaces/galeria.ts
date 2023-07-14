import { InitialState } from "./slice";

export interface GaleriaDevaranaProps{
    id: number;
    type: string;
    url: string;
}


export interface GaleriaDevaranaState extends InitialState {
    galeriaDevarana: GaleriaDevaranaProps[];

}