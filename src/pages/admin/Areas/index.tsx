import { Table } from "antd"
import { Box, Button } from "../../../components/ui"
import { useEffect, useState } from 'react';
import { getAreaThunk, getAreasThunk, cleanAreaThunk, deleteAreaThunk } from '../../../redux/features/admin/areas/areasThunks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Swal from "sweetalert2";
import { Icon } from "../../../components/Icon";
import { FormAreas } from './components/FormAreas';


export const Areas = () => {
    
    const dispatch = useAppDispatch();

    const { areas } = useAppSelector((state: any) => state.areas)
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>({})

    const columns = [
        {
            title: "Areas",
            render: (data: any) => data.nombre
        },
        {
            title: "Acciones",
            render: (data: any) => (
                <div className="flex gap-2">
                    <Button
                        btnType="primary-outline"
                        fn={() => {
                            handleEdit(data.id)
                        } }
                    >
                        <Icon iconName="faPen" />
                    </Button>
                    <Button
                        btnType="primary-outline"
                        fn={() => handleDelete(data.id) }
                    >
                        <Icon iconName="faTrash" />
                    </Button>
                </div>
            ),
            width: 100
        },
    ]

    useEffect(() => {
        dispatch(getAreasThunk(filtros))
        
        return () => {
            dispatch(cleanAreaThunk())
        }
    }, [])

    const handleDelete = (id: any) => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAreaThunk(id))
            }
        })
    }

    const handleModal = (status : boolean) => {
        setFormVisible(status)
    }

    const handleEdit = (id: any) => {
        dispatch(getAreaThunk(id))
        setFormVisible(true)
    }

    return (
        <>
            <Box className="overflow-auto animate__animated animate__fadeIn animate__faster">
                {
                    <Table 
                        columns={columns}
                        dataSource={areas}
                        rowKey={(data: any) => data.id}
                    />
                }
            </Box>
            <FormAreas visible={formVisible} handleModal={handleModal}/>
        </>
    )
}
