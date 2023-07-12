import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FloatButton, Input, Modal, Pagination, Table } from "antd"
import { Box, Button } from "@/components/ui"
import type { ColumnsType } from 'antd/es/table';
import { cleanDepartamentoThunk, getDepartamentoThunk, getDepartamentosThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { deleteDepartamentoThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { FormDepartamentos } from '@/components/forms/FormDepartamentos';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { DepartamentoProps } from '@/interfaces';


const initialValues = {
    size: 10,
    page: 0,
}

export const Departamentos: React.FC = () => {

    const dispatch = useAppDispatch();
    const { departamentos, infoMessage, paginate } = useAppSelector((state => state.departamentos))
    const [visible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>(initialValues)
    const { confirm } = Modal;


    const columns: ColumnsType <DepartamentoProps> = [
        {
            title: () => ( <p className='tableTitlePrincipal'>Departamentos</p>),
            key: "departamentos",
            render: (text, record, index) => ( <p className="text-devarana-graph"> { record.nombre } </p>),
            ellipsis: true
        },
        {
            title: () => ( <p className='tableTitle'>Lider</p>),
            key: "leader",
            render: (text, record, index) => ( <p className="text-devarana-graph"> { record.leader && record.leader.nombre + ' ' + record.leader.apellidoPaterno } </p>),
        },
        {
            title: () => ( <p className='tableTitle'>Area</p>),
            key: "area",
            render: (text, record, index) => ( <p className="text-devarana-graph"> { record.area && record.area.nombre } </p>),
            ellipsis: true
        },
        {
            title: () => ( <p className='tableTitle'>Acciones</p>),
            key: "acciones",
            width: 150,
            render: (text, record, index) => (
                <div className="flex gap-2">
                    <Button
                        classType='regular'
                        classColor='info'
                        width={'auto'}
                        onClick={() => {
                            handleEdit(record.id)
                        } }
                    >
                        <FaPen />
                    </Button>
                    <Button
                        classType='regular'
                        classColor='error'
                        width={'auto'}
                        onClick={() => showDeleteConfirm(record.id) }
                    >
                        <FaTrash />
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

    const handleModal = (status : boolean) => {
        setFormVisible(status)
    }

    const handleEdit = (id: any) => {
        dispatch(getDepartamentoThunk(id))
        setFormVisible(true)
    }

    const handleClose = () => {
        setFormVisible(false)
    }

    const showDeleteConfirm = (id: number) => {
        confirm({
            title: (<p className='text-devarana-graph'>¿Estas seguro de eliminar esta estrategia?</p>),
            content: (<p className='text-devarana-graph'>Una vez eliminado no podras recuperarlo</p>),
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await dispatch(deleteDepartamentoThunk(id))
                handleModal(false)
            }
        });
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
                dataSource={departamentos}
                rowKey={(record) => record.id}
                pagination={false}
                className='customTable'
                // rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}

            />
            <Pagination
                className="flex justify-end mt-5"
                current={paginate.currentPage + 1}
                total={paginate.totalItem}
                pageSize={filtros.size}
                onChange={(page, pageSize) => {
                    setFiltros({
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
                <FormDepartamentos handleClose={handleClose} />
            </Modal>
            </>
    )
}
