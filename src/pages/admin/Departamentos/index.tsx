import { Table } from "antd"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "../../../components/ui"


export const Departamentos = () => {
    const navigate = useNavigate()
    return (
        <Box>
            {/* {
                departamentos.length > 0 && dataSource && dataSource.length > 0 ?
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
