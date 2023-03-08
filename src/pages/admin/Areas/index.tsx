import { Input, Pagination, Table } from "antd"
import { Box, Button } from "../../../components/ui"
import { useEffect, useState } from 'react';
import { getAreaThunk, getAreasThunk, cleanAreaThunk, deleteAreaThunk } from '../../../redux/features/admin/areas/areasThunks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Swal from "sweetalert2";
import { Icon } from "../../../components/Icon";
import { FormAreas } from './components/FormAreas';
import useNotify from "../../../hooks/useNotify";


const initialValues = {
    size: 10,
    page: 0,
}

export const Areas = () => {
    
    const dispatch = useAppDispatch();

    const { areas, infoMessage, paginate } = useAppSelector((state: any) => state.areas)
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>(initialValues)

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
    }, [filtros])

    useEffect(() => {
        useNotify({ infoMessage })
    }, [infoMessage])


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
                <div className="flex justify-end gap-5">
                    <Input
                        placeholder="Buscar"
                        className="max-w-xs w-full"
                        onChange={(e: any) => {
                            setFiltros({
                                ...filtros,
                                nombre: e.target.value
                            })
                        }}
                    />
                    <Button
                        btnType="primary"
                        fn={() => handleModal(true)}
                    >
                        <Icon iconName="faPlus" />
                    </Button>
                </div>
                <Table 
                        columns={columns}
                        dataSource={areas}
                        rowKey={(data: any) => data.id}
                        pagination={false}
                    />
                    <Pagination
                        className="flex"
                        current={paginate.currentPage + 1}
                        total={paginate.totalItems}
                        pageSize={filtros.size}
                        onChange={(page, pageSize) => {
                            setFiltros({
                                ...filtros,
                                page: page - 1,
                                size: pageSize
                            })
                        }}
                    />
            </Box>
            <FormAreas visible={formVisible} handleModal={handleModal}/>
        </>
    )
}
