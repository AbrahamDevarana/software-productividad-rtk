
import Loading from "@/components/antd/Loading"
import { FormProyecto } from "@/components/proyectos/FormProyecto"
import { Box } from "@/components/ui"
import { clearProyectoThunk, deleteProyectoThunk, getProyectoThunk, getProyectosThunk,  } from "@/redux/features/proyectos/proyectosThunk"
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Card, FloatButton, Modal } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Proyectos = () => {

    const dispatch = useAppDispatch()
    const { proyectos, currentProyecto, isLoading, isLoadingProyecto  } = useAppSelector(state => state.proyectos)
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    useEffect(() => {
        dispatch(getProyectosThunk({}))
    }, [])

    const handleCancel = () => {
        setIsModalVisible(false)
        dispatch(clearProyectoThunk())
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
            <Box className='md:col-span-9 col-span-12 flex justify-evenly md:flex-row flex-col'>
            </Box>
            <Box className='md:col-span-3 col-span-12 row-span-3'>
            </Box>

            <div className='md:col-span-9 col-span-12 py-5 grid grid-cols-12 md:gap-x-5 gap-y-5' >
                
                {   isLoading 
                    ?   <div className="col-span-12"> <Loading /> </div>
                    :   proyectos.length > 0 
                    ?   proyectos.map((proyecto, index) => (
                            <div key={index} className="lg:col-span-4 md:col-span-6 col-span-12">
                                <Card 
                                    // hoverable
                                    bordered={false} 
                                    cover={ <img alt={proyecto.titulo } className="object-cover object-center w-full max-h-[150px]" onError={
                                        (e: any) => {
                                            e.target.onerror = null;
                                            e.target.src = `${import.meta.env.VITE_STORAGE_URL}/custom-images/noBanner.png`;
                                            e.target.className = 'object-contain object-center w-full max-h-[150px]'
                                        }
                                    } src={`${import.meta.env.VITE_STORAGE_URL}${proyecto.imagen}`} /> }
                                    actions={[
                                        <Link to={`/proyectos/${proyecto.id}`}> 
                                            <FaEye />
                                        </Link>,
                                        <FaEdit onClick={() => handleEdit(proyecto.id)} />,
                                        <FaTrash />
                                    ]}
                                    bodyStyle={{ height: '150px', overflowY: 'auto' }}
                                >
                                    <Card.Meta 
                                        title={<p className="text-devarana-graph font-medium">{proyecto.titulo}</p>}
                                        description={proyecto.descripcion}
                                    />                                       
                                </Card>
                            </div>
                        ))
                    : 
                    <div className="col-span-12">
                        <div className="flex justify-center align-middle">
                            <p className="text-devarana-graph font-medium">No hay proyectos registrados</p>
                        </div>
                    </div>
                }        
            </div>
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
