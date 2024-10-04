import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormComite } from "./components/FormComite" 
import {  useDeleteComiteMutation, useGetComitesQuery, } from "@/redux/features/comitesApi"
import { FaPlus } from "react-icons/fa"
import { useAppSelector } from "@/redux/hooks"
import { FloatButton, Modal } from "antd"
import { ComiteCard } from "./components/ComiteCard"
import { ComitesProps } from "@/interfaces"
import { toast } from "sonner"

export const Comites = () => {

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ selectedComite, setSelectedComite ] = useState<ComitesProps | null>(null)
    const { socket } = useAppSelector(state => state.socket)

    const { data: comites, isLoading } = useGetComitesQuery({})

    const [ deleteComite, { isLoading: isDeleting } ] =  useDeleteComiteMutation()
    

    const navigate = useNavigate()

    const handleCancel = () => {
        setIsModalVisible(false)
        setSelectedComite(null)
    }

    const handleView = (comiteId: string) => {
        navigate(`/comites/${comiteId}`)
    }

    const handleEdit = (proyecto : ComitesProps) => {
        setSelectedComite(proyecto)
        setIsModalVisible(true)
    }

    const handleDelete = async (comiteId: string) => {

        toast.promise( deleteComite({ comiteId }).unwrap(), {
            loading: 'Eliminando proyecto...',
            success: 'Comite eliminado',
            error: 'Error al eliminar el comite'
        })

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
            <div className='md:col-span-12 col-span-12 py-5 grid grid-cols-12 md:gap-x-5 gap-y-10' >
                {   isLoading 
                    ?   <div className="col-span-12">  </div>
                    :   comites && comites.length > 0 
                    ?   comites.map((comite, index) => (
                            <ComiteCard 
                                comite={comite}
                                key={index}
                                handleView={handleView}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete} />
                            ))
                    : 
                    <div className="col-span-12">
                        <div className="flex justify-center align-middle">
                            <p className="text-devarana-graph font-medium">No hay comites registrados</p>
                        </div>
                    </div>
                }        
              
            </div>
        </div>

        <Modal
            open={isModalVisible}
            onCancel={handleCancel}
            width={800}
            footer={null}
            closable={false}
            destroyOnClose={true}
        >
            <FormComite currentComite={selectedComite}  handleCancel={handleCancel} /> 
        </Modal>

        <FloatButton
            shape="circle"
            type="primary"
            icon={<FaPlus />}
            onClick={() => setIsModalVisible(true)}
        />
    </>
    )
}
