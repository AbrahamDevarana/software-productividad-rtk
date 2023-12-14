import React, { useMemo, useState } from 'react'

import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks'
import Loading from '../../components/antd/Loading'
import { Avatar, FloatButton, Image, Input, Modal, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Box, Button } from '@/components/ui'
import { FaEye, FaPlus } from 'react-icons/fa'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { GestionEvaluaciones } from '@/components/gestion/GestionEvaluaciones'
import { useGetEvaluacionUsuariosQuery } from '@/redux/features/evaluaciones/evaluacionesThunk'
import { useAppSelector } from '@/redux/hooks'

export const Competencias = () => {

    const { currentConfig: { quarter, year } } = useAppSelector((state) => state.global)
    // const { data, isLoading, isFetching} = useGetUsuariosQuery({})
    const { data, isLoading, isFetching} = useGetEvaluacionUsuariosQuery({year, quarter})
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [filtros, setFiltros] = useState<any>()

    const usuarios = useMemo(() => {        
        if (!data) return []
		if (!filtros?.nombre) return data
		const regex = new RegExp(filtros?.nombre, 'iu')



		const result =  data.filter((usuario) => regex.test(usuario.nombre) || regex.test(usuario.apellidoPaterno) )

        //  debe buscar por el 
    }, [data, filtros])


    const users = useMemo(() => {

        return data?.map((usuario) => {

            // EvaluacionLider = 1,
            // EvaluacionColaborador = 2,
            // EvaluacionPropia = 3,
            // EvaluacionLiderColaborador = 4
           

                const evaluacionLider = usuario.evaluacionesEvaluado
                .filter((evaluacion) => evaluacion.evaluacionId === 1)
                .map((evaluacion) => evaluacion.evaluador);

                const evaluacionColaborador = usuario.evaluacionesEvaluado
                .filter((evaluacion) => evaluacion.evaluacionId === 2)
                .map((evaluacion) => evaluacion.evaluador);

                const evaluacionPropia = usuario.evaluacionesEvaluado
                .filter((evaluacion) => evaluacion.evaluacionId === 3)
                .map((evaluacion) => evaluacion.evaluador);

                const evaluacionLiderColaborador = usuario.evaluacionesEvaluado
                .filter((evaluacion) => evaluacion.evaluacionId === 4)
                .map((evaluacion) => evaluacion.evaluador);


            return {
                ...usuario,
                evaluacionLider,
                evaluacionColaborador,
                evaluacionPropia,
                evaluacionLiderColaborador
            }
        })

    }, [data])

    const columns:ColumnsType<any> = [
        {
            title: () => ( <p className='tableTitle'></p>),
            width: 60,
            render: (text, record, index) => ( 
            <Avatar
                src={<Image src={`${getStorageUrl(record.foto)}`} preview={false} fallback={getBrokenUser()} />}
                className=''
            >
                {record.iniciales}
            </Avatar>),
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Nombre</p>),
            key: "nombre",
			render: (text, record, index) => ( <p className="text-devarana-graph"> {record.nombre} {record.apellidoPaterno} {record.apellidoMaterno} </p>),
			ellipsis: true,
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Evaluación Lider</p>),
            key: "nombre",
			render: (text, record, index) => (
                <div className='flex justify-end'>
                    <Avatar.Group maxCount={3} key={index} className='z-50'
                        maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                    >
                        {record.evaluacionLider?.map((evaluacion:any) => (
                            <Tooltip key={index} title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno}`}>
                                <Avatar
                                    key={evaluacion.id}
                                    src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                    className=''
                                >
                                    {evaluacion.iniciales}
                                </Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </div>
            ),
			ellipsis: true
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Evaluación Colaborador</p>),
            key: "nombre",
			render: (text, record, index) => ( 
            <div className='flex justify-end'>
                <Avatar.Group maxCount={3} className='z-50'
                    maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                >
                        {record.evaluacionColaborador?.map((evaluacion:any) => (
                            <Tooltip key={index} title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno}`}>
                                <Avatar
                                    key={evaluacion.id}
                                    src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                    className=''
                                >
                                    {evaluacion.iniciales}
                                </Avatar>
                            </Tooltip>
                        ))}
                </Avatar.Group>
                </div>
            ),
			ellipsis: true
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Evaluación Lider-Colaborador</p>),
            key: "nombre",
			render: (text, record, index) => ( 
                <div className='flex justify-end'>
                    <Avatar.Group maxCount={3} key={index} className='z-50'
                        maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                    >
                            {record.evaluacionLiderColaborador?.map((evaluacion:any) => (
                                <Avatar
                                    key={evaluacion.id}
                                    src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                    className=''
                                >
                                    {evaluacion.iniciales}
                                </Avatar>
                            ))}
                    </Avatar.Group>
                </div>
            ),
			ellipsis: true
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Evaluación Propia</p>),
            key: "nombre",
			render: (text, record, index) => ( 
                <div className='flex justify-end'>
                    <Avatar.Group maxCount={3} key={index} className='z-50'
                        maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                    >
                            {record.evaluacionPropia?.map((evaluacion:any) => (
                                <Avatar
                                    key={evaluacion.id}
                                    src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                    className=''
                                >
                                    {evaluacion.iniciales}
                                </Avatar>
                            ))}
                    </Avatar.Group>
                </div>
            ),
			ellipsis: true
        },
        {
            title: () => ( <p className='tableTitle'>Acciones</p>),
            key: "acciones",
            width: 100,
			render: (text, record, index) => (
                <div className="flex gap-2">
                    <Button
                        classType="regular"
                        classColor="info"
                        width={'auto'}
                        onClick={() => {
                            handleView(record.id)
                        } }
                    >
                        <FaEye />
                    </Button>
                </div>
            )
        },
    ]

    const handleView = (id: string) => {
        console.log('view', id)
        setFormVisible(true)
    }

    
    
    if (isLoading && isFetching) return < Loading />

    return (
        <>
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
            </div>
            <Box className="overflow-auto animate__animated animate__fadeIn animate__faster">
                    <Table 
                        columns={columns}
                        dataSource={users}
                        rowKey={(record) => record.id}
                        loading={isLoading || isFetching}
                    />
			</Box>

            <Modal
                open={formVisible}
                width={1000}
                title="Detalle de usuario"
                footer={null}
                onCancel={() => setFormVisible(false)}
            >

                <GestionEvaluaciones />
            
            </Modal>
                
        </>
    )
}
