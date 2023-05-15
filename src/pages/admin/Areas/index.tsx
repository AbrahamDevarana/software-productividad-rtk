import { FloatButton, Input, Pagination, Table } from "antd"
import { Box, Button } from "@/components/ui"
import { useEffect, useState } from 'react';
import { getAreaThunk, getAreasThunk, cleanAreaThunk, deleteAreaThunk } from '@/redux/features/admin/areas/areasThunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Swal from "sweetalert2";
import { Icon } from "@/components/Icon";
import { FormAreas } from '@/components/forms/FormAreas';
import useNotify from "@/hooks/useNotify";

import type { ColumnsType } from 'antd/es/table';
import { AreaProps } from "@/interfaces";
import { FaPlus } from "react-icons/fa";


const initialValues = {
    size: 10,
    page: 0,
}



export const Areas: React.FC = () => {
    
    const dispatch = useAppDispatch();

    const { areas, infoMessage, paginate } = useAppSelector((state: any) => state.areas)
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>(initialValues)

    const columns: ColumnsType <AreaProps> = [
        {
            title: "Areas",
            key: "areas",
            render: (data: any) => data.nombre
        },
        {
            title: "Lider",
            key: "leader",
            render: (data: any) => data.leader && data.leader.nombre + ' ' + data.leader.apellidoPaterno
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (data: any) => (
                <div className="flex gap-2">
                    <Button
                        classType="outline"
                        classColor="warning"
                        onClick={() => {
                            handleEdit(data.id)
                        } }
                    >
                        <Icon iconName="faPen" />
                    </Button>
                    <Button
                        classType="outline"
                        classColor="error"
                        onClick={() => handleDelete(data.id) }
                    >
                        <Icon iconName="faTrash" />
                    </Button>
                </div>
            ),
            width: 150
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
                <div className="flex justify-end gap-5 pb-5">
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
                    <FloatButton
                        shape="circle"
                        icon={<FaPlus />}
                        onClick={(() => handleModal(true))}
                    />
                </div>
                <Table 

                    columns={columns}
                    dataSource={ areas }
                    rowKey={(data: any) => data.id}
                    pagination={false}
                    expandable={{
                        expandedRowRender: (record: any) => record.subAreas && record.subAreas.map(
                            (data: any) => (
                                <p className="border-l-8 pl-5"> {data.nombre} </p>
                            )
                        ),
                        rowExpandable: (record: any) => record.subAreas && record.subAreas.length > 0,
                    }}
                    />
                    <Pagination
                        className="flex justify-end mt-5"
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
