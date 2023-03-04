import { Table } from "antd"
import { Box, Button } from "../../../components/ui"
import { useEffect } from 'react';
import { getAreaThunk, getAreasThunk, cleanAreaThunk, deleteAreaThunk } from '../../../redux/features/admin/areas/areasThunks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Swal from "sweetalert2";
import { Icon } from "../../../components/Icon";


export const Areas = () => {
    
    const dispatch = useAppDispatch();

    const { areas } = useAppSelector((state: any) => state.areas)

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
                            dispatch(getAreaThunk(data.id))
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
            )
        },
    ]

    useEffect(() => {
        dispatch(getAreasThunk())
        
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

    

    return (
        <Box className="overflow-auto animate__animated animate__fadeIn animate__faster">
            {
                <Table 
                    columns={columns}
                    dataSource={areas}
                    rowKey={(data: any) => data.id}
                />
            }
        </Box>
    )
    }
