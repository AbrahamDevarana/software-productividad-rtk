import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormProyecto } from "@/pages/Proyectos/components/FormProyecto"
import { Box } from "@/components/ui"
import { useDeleteProyectoMutation, useGetProyectoQuery, useGetProyectosQuery,  } from "@/redux/features/proyectos/proyectosThunk"
import { FaPlus } from "react-icons/fa"
import { useAppSelector } from "@/redux/hooks"
import { FloatButton, message, Modal } from "antd"
import { ProyectoCard } from "@/pages/Proyectos/components/ProyectoCard"

export const Proyectos = () => {

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ selectedProyect, setSelectedProyect ] = useState('' as string)
    const { socket } = useAppSelector(state => state.socket)

    const { data: proyectos, isLoading } = useGetProyectosQuery({})
    const { data: proyecto, isLoading: isLoadingProyecto } = useGetProyectoQuery( {proyectoId:selectedProyect}, { skip: !selectedProyect} )
    const [ deleteProyecto, { isLoading: isLoadingProyectoDelete } ] =  useDeleteProyectoMutation()
    

    const navigate = useNavigate()

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleView = (proyectoId: string) => {
        navigate(`/proyectos/${proyectoId}`)
    }

    const handleEdit = (proyectoId: string) => {
        setSelectedProyect(proyectoId)
        setIsModalVisible(true)
    }

    const handleDelete = async (proyectoId: string) => {
        deleteProyecto({ proyectoId }).unwrap().then(() => {
            message.success('Proyecto eliminado correctamente')
        }).catch(() => {
            message.error('Error al eliminar el proyecto')
        })
        setIsModalVisible(true)
    }

    // useEffect(() => {
    //     socket?.on('proyecto:updated', (proyecto) => {            
    //         dispatch(getUpdatedProyectoThunk(proyecto))
    //     })

    //     socket?.on('proyecto:created', (proyecto) => {
    //         dispatch(getCreatedProyectoThunk(proyecto))
    //     })

    //     return () => {
    //         socket?.off('proyecto:updated')
    //         socket?.off('proyecto:created')
    //     }
    // }, [socket])


    // return (
    //     <Proximamente avance={28} />
    //   )
    
    return (
        <>
        <div className='grid grid-cols-12 md:gap-x-10 gap-y-4'>
            <div className='md:col-span-9 col-span-12 py-5 grid grid-cols-12 md:gap-x-5 gap-y-10' >
                {   isLoading 
                    ?   <div className="col-span-12">  </div>
                    :   proyectos && proyectos.length > 0 
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
                <>  </>
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
            { proyecto && <FormProyecto currentProyecto={proyecto}  handleCancel={handleCancel} isLoadingProyecto={isLoadingProyecto} /> } 
        </Modal>

    <FloatButton
        shape="circle"
        icon={<FaPlus />}
        onClick={() => setIsModalVisible(true)}
    />
    </>
    )
}
