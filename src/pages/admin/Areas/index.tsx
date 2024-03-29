import { Avatar, FloatButton, Image, Input, Modal, Pagination, Table } from "antd"
import { Box, Button } from "@/components/ui"
import { useEffect, useState } from 'react';
import { getAreaThunk, getAreasThunk, cleanAreaThunk, deleteAreaThunk, clearCurrentAreaThunk } from '@/redux/features/areas/areasThunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FormAreas } from '@/components/forms/FormAreas';

import type { ColumnsType } from 'antd/es/table';
import { AreaProps } from "@/interfaces";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";


const initialValues = {
    size: 10,
    page: 0,
}



export const Areas: React.FC = () => {
    
    const dispatch = useAppDispatch();

    const { areas, infoMessage, paginate } = useAppSelector((state: any) => state.areas)
    const [visible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>(initialValues)

    const columns: ColumnsType <AreaProps> = [
        {
            title: () => ( <p className='tableTitlePrincipal'>Áreas</p>),
            key: "areas",
            render: (text, record, index) => ( <p className="text-devarana-graph"> { record.nombre } </p>),
        },
        {
            title: () => ( <p className='tableTitle'>Responsable</p>),
            key: "leader",
            render: (text, record, index) => ( 
            <div className='flex items-center gap-x-2'>
                <Avatar src={<Image src={`${getStorageUrl(record.leader.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                    {record.leader.iniciales}
                </Avatar>
                <p className="text-devarana-graph"> { record.leader && record.leader.nombre + ' ' + record.leader.apellidoPaterno } </p>
            </div>),
        },
        {
            
            title: () => ( <p className='tableTitle'>Acciones</p>),
            render: (text, record, index) => (
                <div className="flex gap-2">
                    <Button
                        classType="regular"
                        classColor="info"
                        width={'auto'}
                        onClick={() => {
                            handleEdit(record.id)
                        } }
                    >
                        <FaPen />
                    </Button>
                    <Button
                        classType="regular"
                        classColor="error"
                        width={'auto'}
                        onClick={() => handleDelete(record.id) }
                    >
                        <FaTrash />
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


    const handleDelete = (id: any) => {
        dispatch(deleteAreaThunk(id))
    }

    const handleModal = (status : boolean) => {
        setFormVisible(status)
    }

    const handleEdit = (id: any) => {
        dispatch(getAreaThunk(id))
        setFormVisible(true)
    }
    
    const handleClose = () => {
        dispatch(clearCurrentAreaThunk())
        setFormVisible(false)
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
                    className="customTable"
                    rowKey={(record) => record.id}
                    pagination={false}
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
            <Modal
                open={visible}
                onCancel={ handleClose }
                destroyOnClose={true}
                width={700}
                footer={null}
            >
                <FormAreas handleClose={handleClose}/>
            </Modal>
        </>
    )
}
