import { Icon } from "@/components/Icon"
import Loading from "@/components/antd/Loading"
import { Gantt } from "@/components/complexUI/Gantt"
import { FormProyecto } from "@/components/proyectos/FormProyecto"
import { Box } from "@/components/ui"
import { clearProyectoThunk, deleteProyectoThunk, getProyectoThunk, getProyectosThunk,  } from "@/redux/features/proyectos/proyectosThunk"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button, Card, Divider, Empty, FloatButton, Modal } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Proyectos = () => {

    const dispatch = useAppDispatch()
    const { proyectos, currentProyecto, isLoading  } = useAppSelector(state => state.proyectos)
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
                                    hoverable
                                    bordered={false} 
                                    cover={ <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /> }
                                    actions={[
                                        <Link to={`/proyectos/${proyecto.id}`}> 
                                            <Icon className="w-full" iconName="faEye" />
                                        </Link>,
                                        <Icon className="w-full" iconName="faEdit" onClick={() => handleEdit(proyecto.id)} />,
                                        <Icon className="w-full" iconName="faTrash" />
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
                    : <Empty className="col-span-12" description="No hay proyectos" />
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
            <FormProyecto currentProyecto={currentProyecto}  handleCancel={handleCancel}/>
        </Modal>

    <FloatButton
        shape="circle"
        icon={<Icon iconName='faPlus' />}
        onClick={() => setIsModalVisible(true)}
    />
    </>
    )
}
