import { Table } from "antd"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "../../../components/ui"
import { Icon } from '../../../components/Icon';


export const Puestos = () => {
    const navigate = useNavigate()
    
    const columns = [
        {
            title: "Puestos",
            render: (data: any) => data.nombre
        },
        {
            title: "Acciones",
            render: (data: any) => (
                <div>
                    <Button
                        btnType="primary-outline"
                        fn={() => {} }
                    >
                        <Icon iconName="faPen" />
                    </Button>
                    <Button
                        btnType="primary-outline"
                        fn={() => {} }
                    >
                        <Icon iconName="faTrash" />
                    </Button>
                </div>
            )
        },
    ]

    const dataSource = [
        {
            key: "1",
            id: 1,
            nombre: "Gerente General",
        },
        {
            key: "2",
            id: 2,
            nombre: "Director de Ventas",
        },
        {
            key: "3",
            id: 3,
            nombre: "Director de Operaciones",
        }
    ]            

    return (
        <Box className="overflow-auto animate__animated animate__fadeIn animate__faster">
            {
                <Table 
                    columns={columns}
                    dataSource={dataSource} 
                />
            }
        </Box>
    )
    }
