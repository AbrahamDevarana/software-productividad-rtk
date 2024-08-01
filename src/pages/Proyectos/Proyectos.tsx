import { useGetProyectosQuery } from '@/redux/features/proyectos/proyectosThunk'
import React, { useEffect } from 'react'
import { ProyectoCard } from './components/ProyectoCard'

interface Props {
  categoriaId: string
    handleView: (proyecto: any) => void
    handleEdit: (proyecto: any) => void
    handleDelete: (proyecto: any) => void
    isDeleted?: boolean
}

export const Proyectos = ({categoriaId, handleView, handleEdit, handleDelete}: Props) => {

    const { data: proyectos, isLoading, refetch } = useGetProyectosQuery({categoriaId})

    return (
        <div  className='flex flex-wrap gap-5'>
            {   isLoading 
                ?   <div className="w-full">  </div>
                :   proyectos && proyectos.length > 0 
                ?   proyectos.map((proyecto, index) => (
                        <ProyectoCard proyecto={proyecto}
                            key={index}
                            handleView={handleView}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete} />
                    ))
                    : 
                <div className="w-full">
                    <div className="flex justify-center align-middle">
                        <p className="text-devarana-graph font-medium">No hay proyectos registrados</p>
                    </div>
                </div>
            }
        </div>
    )
}
