export interface UsuarioProps {
    nombre:          string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email:           string;
    telefono:        string;
    estado:          number;
    municipio:       number;
    colonia:         string;
    calle:           string;
    lugarOrigen:     string;
    area:            number;
    departamento:    number;
    rol:             number;
    puesto:          number;
    titulo:          number;
    fechaIngreso:    string;
    lider:           boolean;
    [key: string]: any;
}