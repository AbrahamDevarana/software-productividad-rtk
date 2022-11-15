import { Table } from "antd"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "../../../components/ui"

export const Areas = () => {
    const navigate = useNavigate()
    return (
        <Box>
        <div className="flex justify-between pb-5">
            <Button btnType="primary-outline" fn={()=>navigate("/admin/usuarios")}>
            Volver
            </Button>
            <Button btnType="secondary" fn={()=>navigate("registrar")}>
            Registrar Área
            </Button>
        </div>
        {/* {
            areas.length > 0 && dataSource && dataSource.length > 0 ?
                <Table 
                    columns={columns}
                    dataSource={dataSource} 
                    loading={loading}
                />
            : ""
        } */}
    </Box>
    )
}
