
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Collapse} from "antd"
import { Badge, Box} from "../../components/ui"
import { Usuarios } from "./Usuarios"
import { Areas } from "./Areas"
import { Departamentos } from "./Departamentos"
import { Puestos } from "./Puestos"
import { NuevoUsuario } from "./Usuarios/components/NuevoUsuario"
import { FormPuestos } from "./Puestos/components/FormPuestos"
import { FormAreas } from "./Areas/components/FormAreas"
import { FormDepartamentos } from "./Departamentos/components/FormDepartamentos"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"

export const Admin = () => {
    const navigate = useNavigate()
    const { Panel } = Collapse
    
    const [panelAdmin, setPanelAdmin] = useState('usuarios')


    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <div className="">
                <Collapse defaultActiveKey={['1']} className="col-span-2" bordered={false} ghost>
                    <Panel header={<p className="font-roboto"> Ver más </p>} key="1" collapsible="header" >
                        <div className="grid grid-cols-2 gap-5">
                            <div className="col-span-2 sm:col-span-1 grid grid-cols-2 gap-5">
                                <div className="col-span-2 sm:col-span-1 cursor-pointer" onClick={() => setPanelAdmin('areas')}>
                                    <Box>
                                        <Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="primary">Áreas</Badge>
                                    </Box>
                                </div>
                                <div className="col-span-2 sm:col-span-1 cursor-pointer" onClick={() => setPanelAdmin('departamentos')}>
                                    <Box>
                                        <Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="secondary">Dptos</Badge>
                                    </Box>
                                </div>
                                <div className="col-span-2 sm:col-span-1 cursor-pointer" onClick={() => setPanelAdmin('puestos')}>
                                    <Box>
                                        <Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="pink">Puestos</Badge>
                                    </Box>
                                </div>
                                <div className="col-span-2 sm:col-span-1 cursor-pointer" onClick={() => setPanelAdmin('usuarios')}>
                                    <Box className="flex justify-between flex-wrap gap-5">
                                        <Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="orange">Usuarios</Badge>
                                    </Box>
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1 row-span-2">
                                <div className="h-full">
                                    { panelAdmin === 'usuarios' && <NuevoUsuario/> }
                                    { panelAdmin === 'areas' && <FormAreas/> }
                                    { panelAdmin === 'departamentos' && <FormDepartamentos/> }
                                    { panelAdmin === 'puestos' && <FormPuestos /> }
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                <div className="py-2">
                    {panelAdmin === 'usuarios' && <Usuarios />}
                    {panelAdmin === 'areas' && <Areas />}
                    {panelAdmin === 'departamentos' && <Departamentos />}
                    {panelAdmin === 'puestos' && <Puestos />}                    
                </div>
            </div>
        </div>
    )
}
