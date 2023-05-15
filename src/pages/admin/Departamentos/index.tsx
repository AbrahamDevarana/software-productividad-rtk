import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FloatButton, Input, Pagination, Table } from "antd"
import { Box, Button } from "@/components/ui"
import { Icon } from "@/components/Icon";
import useNotify from "@/hooks/useNotify";
import type { ColumnsType } from 'antd/es/table';
import { cleanDepartamentoThunk, getDepartamentoThunk, getDepartamentosThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { deleteDepartamentoThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import Swal from 'sweetalert2';
import { FormDepartamentos } from '@/components/forms/FormDepartamentos';
import { FaPlus } from 'react-icons/fa';


const initialValues = {
    size: 10,
    page: 0,
}

interface DataType {
    key: React.Key;
    nombre: string;
    acciones: string;
    area?: DataType[]
}

export const Departamentos: React.FC = () => {

    const dispatch = useAppDispatch();
    const { departamentos, infoMessage, paginate } = useAppSelector((state: any) => state.departamentos)
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>(initialValues)


    const columns: ColumnsType <DataType> = [
        {
            title: "Departamentos",
            key: "departamentos",
            render: (data: any) => data.nombre,
            ellipsis: true
        },
        {
            title: "Lider",
            key: "leader",
            render: (data: any) => data.leader && data.leader.nombre + ' ' + data.leader.apellidoPaterno,
        },
        {
            title: "Area",
            key: "area",
            render: (data: any) => data.area && data.area.nombre,
            ellipsis: true
        },
        {
            title: "Acciones",
            key: "acciones",
            width: 150,
            render: (data: any) => (
                <div className="flex gap-2">
                    <Button
                        classType='outline'
                        classColor='warning'
                        onClick={() => {
                            handleEdit(data.id)
                        } }
                    >
                        <Icon iconName="faPen" />
                    </Button>
                    <Button
                        classType='outline'
                        classColor='error'
                        onClick={() => handleDelete(data.id) }
                    >
                        <Icon iconName="faTrash" />
                    </Button>
                </div>
            ),
        },
    ]

    useEffect(() => {
        dispatch(getDepartamentosThunk(filtros))
        
        return () => {
            dispatch(cleanDepartamentoThunk())
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
                dispatch(deleteDepartamentoThunk(id))
            }
        })
    }

    const handleModal = (status : boolean) => {
        setFormVisible(status)
    }

    const handleEdit = (id: any) => {
        dispatch(getDepartamentoThunk(id))
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
                        dataSource={ departamentos }
                        rowKey={(data: any) => data.id}
                        pagination={false}
                        expandable={{
                            expandedRowRender: (record: any) => record.subDepartamentos && record.subDepartamentos.map(
                                (data: any) => (
                                    <p className="border-l-8 pl-5"> {data.nombre} </p>
                                )
                            ),
                            rowExpandable: (record: any) => record.subDepartamentos && record.subDepartamentos.length > 0,
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
                <FormDepartamentos visible={formVisible} handleModal={handleModal}/>
            </>
    )
}
