import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormProyecto } from "@/pages/Proyectos/components/FormProyecto"
import { useDeleteProyectoMutation,  } from "@/redux/features/proyectos/proyectosThunk"
import {  FaMinus, FaPlus, FaProjectDiagram } from "react-icons/fa"
import { useAppSelector } from "@/redux/hooks"
import { Button, Checkbox, FloatButton, Input, message, Modal, Popconfirm } from "antd"
import { ProyectosProps } from "@/interfaces"
import { useCreateCategoriaProyectoMutation, useDeleteCategoriaProyectoMutation, useGetCategoriasProyectoQuery } from "@/redux/features/categoriasApi"
import { Proyectos } from "./Proyectos"
import { BiTrash } from "react-icons/bi"
import { toast } from "sonner"

export const ProyectosCat = () => {

    const [ workspaceVisible, setWorkspaceVisible ] = useState(false)
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ categoria, setCategoria] = useState('')
    const [ workspace, setWorkspace ] = useState<string[]>([])
    const [ selectedProyect, setSelectedProyect ] = useState<ProyectosProps | null>(null)
    const { socket } = useAppSelector(state => state.socket)

    const [ deleteProyecto, { isLoading: isLoadingProyectoDelete } ] =  useDeleteProyectoMutation()
    const { data } = useGetCategoriasProyectoQuery({})
    const [createCategoria] = useCreateCategoriaProyectoMutation()
    const [ deleteCategoria ] = useDeleteCategoriaProyectoMutation()
    

    const navigate = useNavigate()

    const handleCancel = () => {
        setIsModalVisible(false)
        setSelectedProyect(null)
    }

    const handleView = (proyectoId: string) => {
        navigate(`/proyectos/${proyectoId}`)
    }

    const handleEdit = (proyecto : ProyectosProps) => {
        setSelectedProyect(proyecto)
        setIsModalVisible(true)
    }

    const handleDelete = async (proyectoId: string) => {

        toast.promise(
            deleteProyecto({ proyectoId }).unwrap(), {
                loading: 'Eliminando proyecto...',
                success: 'Proyecto eliminado correctamente',
                error: 'Error al eliminar el proyecto'
            }
        )
    }

    const handleCreateCategoria = () => {

        toast.promise(
            createCategoria({nombre: categoria, order: 1}).unwrap(), {
                loading: 'Creando categoria...',
                success: 'Categoria creada correctamente',
                error: 'Error al crear la categoria',
                finally: () => {
                    setCategoria('')
                }
            }
        )
    }

    const handleDeleteCategoria = (categoriaId: string) => {
        
        toast.promise(
            deleteCategoria({categoriaId}).unwrap(), {
                loading: 'Eliminando categoria...',
                success: 'Espacio de trabajo eliminado correctamente',
                error: 'Error al eliminar el espacio de trabajo',
                finally: () => {
                    setWorkspace(workspace.filter(id => id !== categoriaId))
                }
            }
        )
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

    const categoriasSelected = useMemo(() => {
        
        // if no workspace is selected, return all categorias
        if(workspace.length === 0) {
            return data
        }
        
        // if workspace is selected, return only the selected categorias
        return data?.filter(categoria => workspace.includes(categoria.id.toString()))

    }, [workspace, data])

    
    return (
        <>
        <div className='flex gap-x-10 gap-y-5 overflow-hidden sm:flex-row flex-col' style={{
            height: 'calc(100vh - 110px)'
        }}>
            <div className={`${workspaceVisible ? 'w-[350px] h-auto' : 'w-0'} transition-all duration-300 relative sm:h-full shadow`}>
                <div className={`absolute ${workspaceVisible ? 'right-3 top-3' : 'top-3'}`}>
                    <button onClick={() => setWorkspaceVisible(!workspaceVisible)} className="bg-white rounded-full p-1 text-devarana-midnight">
                        {
                            workspaceVisible ? <FaMinus /> : <FaPlus />
                        }
                    </button>
                </div>
                <div className={`${ workspaceVisible ? 'block' : 'hidden'} bg-white px-5 py-10 h-full`}>
                    <h1 className="text-sm font-light">Espacios de Trabajo</h1>
                    <div className="flex items-center text-default justify-between py-1 my-2 rounded-sm px-3">
                        <div className="flex items-center gap-3">
                            <FaProjectDiagram />
                            <p className="text-default">Todos</p> 
                        </div>
                        <Checkbox onClick={() => setWorkspace([])} checked={workspace.length === 0} /> 
                                
                    </div>
                    {
                        data && data.length > 0 && data.map((categoria, index) => (
                            <div key={index} className="flex items-center text-default justify-between py-1 my-2 rounded-sm px-3">
                                <div className="flex items-center gap-3">
                                    <FaProjectDiagram />
                                    <p className="text-default">{categoria.nombre}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Checkbox 
                                        checked={workspace.includes(categoria.id.toString())}
                                        onClick={() => {
                                            if(workspace.includes(categoria.id.toString())) {
                                                setWorkspace(workspace.filter(id => id !== categoria.id.toString()))
                                            } else {
                                                setWorkspace([...workspace, categoria.id.toString()])
                                            }
                                        }}
                                    />
                                    <Popconfirm 
                                        title='¿Estás seguro de eliminar este espacio de trabajo?'
                                        onConfirm={() => {
                                            handleDeleteCategoria(categoria.id.toString())
                                        }}
                                        okText='Si'
                                        cancelText='No'
                                        okButtonProps={{
                                            className: 'rounded-full mr-2 bg-primary'
                                        }}
                                        cancelButtonProps={{
                                            className: 'rounded-full mr-2 bg-error-light text-white'
                                        }}
                                    >
                                        <button className='text-error-light'>
                                            <BiTrash />
                                        </button>
                                    </Popconfirm>
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex items-center text-default justify-between py-1 my-2 rounded-sm px-3">
                        <div className="flex items-center gap-3">
                            <FaProjectDiagram />
                            <p className="text-default">Sin Categoria</p> 
                        </div>
                        <Checkbox 
                            onClick={() => {
                                if(workspace.includes('')) {
                                    setWorkspace(workspace.filter(id => id !== ''))
                                } else {
                                    setWorkspace([...workspace, ''])
                                }
                            }}
                            checked={workspace.includes('')}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input placeholder='Nuevo Espacio de Trabajo' value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                        <Button 
                            disabled={categoria.length === 0}
                            className='bg-blue-500 text-white rounded-md' onClick={handleCreateCategoria}>
                            <FaPlus />
                        </Button>
                    </div>
               </div>
            </div>
            <div className="h-screen overflow-y-auto w-full flex flex-col gap-y-5 pb-32">
                    {
                        categoriasSelected && categoriasSelected.length > 0 && categoriasSelected.map((categoria, index) => (
                        <div key={index}>
                            <h1 className='font-bold'>{categoria.nombre}</h1>
                            <Proyectos key={index} categoriaId={categoria.id.toString()} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
                        </div>
                        ))
                    }
                    {
                        (workspace.includes('') || workspace.length === 0) &&
                    ( <div>
                            {/* Sin Categoria */}
                            <h1 className='font-bold'>Sin Categoria</h1>
                            <Proyectos key={0} categoriaId={''} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView}/>
                        </div>)
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
            <FormProyecto currentProyecto={selectedProyect}  handleCancel={handleCancel} /> 
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
