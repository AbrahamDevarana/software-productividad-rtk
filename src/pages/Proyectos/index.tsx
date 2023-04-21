import { Icon } from "@/components/Icon"
import Loading from "@/components/antd/Loading"
import { Objetivo } from "@/components/operativo/Objetivo"
import { Box } from "@/components/ui"
import { useColor } from "@/hooks"
import { getProyectosThunk } from "@/redux/features/proyectos/proyectosThunk"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button, Card, Empty, FloatButton, Modal, Progress } from "antd"
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
    }

    
    return (
        <>
        <div className='grid grid-cols-12 md:gap-x-10 gap-y-4'>
            <Box className='md:col-span-9 col-span-12 flex justify-evenly md:flex-row flex-col'>
            </Box>
            <Box className='md:col-span-3 col-span-12 row-span-3'>

            </Box>

            <div className='md:col-span-9 col-span-12 py-5 grid grid-cols-12 md:gap-x-5 gap-y-5'>
                
                {   isLoading 
                    ?   <div className="col-span-12"> <Loading /> </div>
                    :   proyectos.length > 0 
                    ?   proyectos.map((proyecto, index) => (
                            <>
                                <Box key={index} className="col-span-4">
                                    <Card title={proyecto.titulo} bordered={false} >
                                        <p>{proyecto.descripcion}</p>
                                        <Link to={`/proyectos/${proyecto.id}`}> 
                                            <Button htmlType="button" type="default" >Ver proyecto</Button>
                                        </Link>
                                    </Card>
                                </Box>
                            </>
                        ))
                    : <Empty className="col-span-12" description="No hay proyectos" />
                }        
            </div>
        </div>

        <Modal
            open={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            width={1000}
            closable={false}
            destroyOnClose={true}
        >
            

        </Modal>

    <FloatButton
        shape="circle"
        icon={<Icon iconName='faPlus' />}
        onClick={() => setIsModalVisible(true)}
    />
    </>
    )
}
