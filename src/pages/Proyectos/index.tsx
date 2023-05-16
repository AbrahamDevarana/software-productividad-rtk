
import Loading from "@/components/antd/Loading"
import { FormProyecto } from "@/components/proyectos/FormProyecto"
import { Box } from "@/components/ui"
import { clearProyectoThunk, deleteProyectoThunk, getProyectoThunk, getProyectosThunk,  } from "@/redux/features/proyectos/proyectosThunk"
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Avatar, Card, FloatButton, Image, Modal } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUsuariosThunk } from "@/redux/features/admin/usuarios/usuariosThunks"
import { ProyectoCard } from "@/components/proyectos/ProyectoCard"

export const Proyectos = () => {

    const dispatch = useAppDispatch()
    const { proyectos, currentProyecto, isLoading, isLoadingProyecto  } = useAppSelector(state => state.proyectos)
    const { userAuth } = useAppSelector(state => state.auth)
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProyectosThunk({}))
        dispatch(getUsuariosThunk({}))
    }, [])

    const handleCancel = () => {
        setIsModalVisible(false)
        dispatch(clearProyectoThunk())
    }

    const handleView = (proyectoId: string) => {
        navigate(`/proyectos/${proyectoId}`)
    }

    const handleEdit = (proyectoId: string) => {
        dispatch(getProyectoThunk(proyectoId))
        setIsModalVisible(true)
    }

    const handleDelete = (proyectoId: string) => {
        dispatch(deleteProyectoThunk(proyectoId))
        setIsModalVisible(true)
    }

    
    return (
        <>
        <div className='grid grid-cols-12 md:gap-x-10 gap-y-4'>
            <div className='md:col-span-9 col-span-12 py-5 grid grid-cols-12 md:gap-x-5 gap-y-10' >
                {   isLoading 
                    ?   <div className="col-span-12">  </div>
                    :   proyectos.length > 0 
                    ?   proyectos.map((proyecto, index) => (
                            <ProyectoCard proyecto={proyecto}
                            key={index}
                            handleView={handleView}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete} />
                        ))
                    : 
                    <div className="col-span-12">
                        <div className="flex justify-center align-middle">
                            <p className="text-devarana-graph font-medium">No hay proyectos registrados</p>
                        </div>
                    </div>
                }        
              
            </div>
             <Box className='md:col-span-3 col-span-12 row-span-3'>
            </Box>
        </div>

        <Modal
            open={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            width={800}
            closable={false}
            destroyOnClose={true}
        >
            <FormProyecto currentProyecto={currentProyecto}  handleCancel={handleCancel} isLoadingProyecto={isLoadingProyecto} />
        </Modal>

    <FloatButton
        shape="circle"
        icon={<FaPlus />}
        onClick={() => setIsModalVisible(true)}
    />
    </>
    )
}
