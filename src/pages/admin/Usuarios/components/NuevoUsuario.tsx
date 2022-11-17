import {  Steps } from "antd"
import { useState } from "react";
import { Box } from "../../../../components/ui"
import { UsuarioProps } from "../../../../interfaces/usuario";

import { Contacto } from "./Contacto";
import { Domicilio } from "./Domicilio";
import { Profesional } from "./Profesional";


const initialValues:UsuarioProps = {
        nombre: "",
        apellidoPaterno: "", 
        apellidoMaterno: "", 
        email: "", 
        telefono: "" ,
        estado: 0,
        municipio: 0,
        colonia: "",
        calle: "",
        lugarOrigen: "",
        area: 0,
        departamento: 0,
        rol: 0,
        puesto: 0,
        titulo: 0,
        fechaIngreso: "",
        lider: false,
}

export const NuevoUsuario = () => {

    const [ current, setCurrent] = useState<number>(0);
    const [ usuario, setUsuario ] = useState<UsuarioProps>(initialValues);

    const { Step } = Steps;


    const handleSteps = (values:any) => {
        setUsuario({
            ...usuario,
            ...values
        })
        // Max 2 steps
        setCurrent(Math.min(current + 1, 2));

        // Cuando se llega al último paso comparar los valores del usuario con los valores iniciales excepto lider
        const {lider, ...usuarioSinLider} = values;      
        if (current === 2) {
            Object.keys(usuarioSinLider).every((key) => usuario[key] !== initialValues[key] ) ? 
            console.log("Guardar") : console.log("No guardar")
        }        
    }
    

    return (
        <Box className="animate__animated animate__fadeIn">
            <Box className="-my-16 bg-gradient-to-tr from-[#1a73e8] to-[#49a3f1]">
                <Steps current={current} progressDot={true} size="small">
                    <Step title="Contacto" onStepClick={setCurrent} />
                    <Step title="Domicilio" onStepClick={setCurrent} />
                    <Step title="Profesional" onStepClick={setCurrent} />
                </Steps>
            </Box>

            <div className={`pt-24`}>                
                {current === 0 ? <Contacto usuario={usuario} handleSteps={handleSteps} /> : ""}
                {current === 1 ? <Domicilio usuario={usuario} handleSteps={handleSteps} /> : ""}
                {current === 2 ? <Profesional usuario={usuario} handleSteps={handleSteps} /> : ""}
            </div>  
        </Box>
    )
}
