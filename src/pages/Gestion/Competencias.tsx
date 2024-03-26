import { useMemo, useState } from 'react'

import Loading from '../../components/antd/Loading'
import { Avatar, Checkbox, Image, Input, Modal, Table, Tooltip, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Box, Button } from '@/components/ui'
import { FaEye } from 'react-icons/fa'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { GestionEvaluaciones } from '@/components/gestion/GestionEvaluaciones'
import { useGenerateAsignacionesEvaluacionMutation, useGetEvaluacionUsuariosQuery } from '@/redux/features/evaluaciones/evaluacionesThunk'
import { useAppSelector } from '@/redux/hooks'
import { LoadingMask } from '@/components/antd/LoadingMask'

export const Competencias = () => {

    const { currentConfig: { quarter, year } } = useAppSelector((state) => state.global)
    const { data, isLoading, isFetching } = useGetEvaluacionUsuariosQuery({year, quarter})
    const [ generateAsignacionesEvaluacion, { isError, isLoading: isGenerating }] = useGenerateAsignacionesEvaluacionMutation()
    const [ usuarioId, setUsuarioId ] = useState<string>('')
    const [ formVisible, setFormVisible ] = useState<boolean>(false)
    const [ filtros, setFiltros ] = useState<any>()
    const [ selected, setSelected ] = useState<any>()

    const { confirm } = Modal

    const filteredUsuarios = useMemo(() => {

        if (!data) return []
		if (!filtros?.nombre) return data
		const regex = new RegExp(filtros?.nombre, 'iu')
		return data.filter((usuario) => regex.test(usuario.nombre) || regex.test(usuario.apellidoPaterno) )
        
    }, [data, filtros])

    
    const usuarios = useMemo(() => {
        return  filteredUsuarios.map((usuario) => {
            const evaluacionLider = usuario.evaluacionesEvaluado
            .filter((evaluacion) => evaluacion.evaluacionId === 1)
            .map((evaluacion) => {
                return {
                    ...evaluacion.evaluador,
                    status: evaluacion.status
                }
            })

            const evaluacionColaborador = usuario.evaluacionesEvaluado
            .filter((evaluacion) => evaluacion.evaluacionId === 2)
            .map((evaluacion) => {
                return {
                    ...evaluacion.evaluador,
                    status: evaluacion.status
                }
            })

            const evaluacionPropia = usuario.evaluacionesEvaluado
            .filter((evaluacion) => evaluacion.evaluacionId === 3)
            .map((evaluacion) => {
                return {
                    ...evaluacion.evaluador,
                    status: evaluacion.status
                }
            })

            const evaluacionLiderColaborador = usuario.evaluacionesEvaluado
            .filter((evaluacion) => evaluacion.evaluacionId === 4)
            .map((evaluacion) => {
                return {
                    ...evaluacion.evaluador,
                    status: evaluacion.status
                }
            })


            return {
                ...usuario,
                evaluacionLider,
                evaluacionColaborador,
                evaluacionPropia,
                evaluacionLiderColaborador
            }
        })

        
    }, [data, filteredUsuarios])


    
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
            title: () => ( <p className='tableTitlePrincipal'>Evaluado</p>),
            key: "nombre",
			render: (text, record, index) => ( <p className="text-devarana-graph"> {record.nombre} {record.apellidoPaterno} {record.apellidoMaterno} </p>),
            width: 250,
			ellipsis: true,
            onHeaderCell: () => ({ className: 'border-r' }),
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Autoevaluación</p>),
            key: "nombre",
			ellipsis: true,
            children: [
                {
                    title: () => ( <p className='tableTitlePrincipal text-center'>Evaluador</p>),
                    width: 120,
                    
                    render: (text, record, index) => ( 
                        <div className='flex items-center justify-center'>
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
                },
                {
                    title: () => ( <p className='tableTitlePrincipal text-center'>Estatus</p>),
                    width: 120,
                    
                    render: (text, record, index) => (
                        <>
                            <p className='text-center text-devarana-graph'>
                                {
                                    // contar los que tienen status 1
                                    ` ${record.evaluacionPropia?.filter((evaluacion:any) => evaluacion.status === 1).length || 0} / ${record.evaluacionPropia?.length || 0}`
                                }
                            </p>
                        </>
                    )
                }
            ]
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Colaboración</p>),
            key: "nombre",
            ellipsis: true,
            onHeaderCell: () => ({ className: 'border-r' }),
			children: [
                {
                    title: () => ( <p className='tableTitlePrincipal text-center'>Evaluador</p>),
                    width: 120,
                    render: (text, record, index) => ( 
                        <div className='flex items-center justify-center'>
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
                },
                {
                    title: () => ( <p className='tableTitlePrincipal text-center'>Estatus</p>),
                    width: 120,
                    onHeaderCell: () => ({ className: 'border-r' }),
                    render: (text, record, index) => (
                        <>
                            <p className='text-center text-devarana-graph'>
                                {
                                    // contar los que tienen status 1
                                    ` ${record.evaluacionColaborador?.filter((evaluacion:any) => evaluacion.status === 1).length || 0} / ${record.evaluacionColaborador?.length || 0}`
                                }
                            </p>
                        </>
                    )
                }
            ],
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Liderazgo</p>),
            key: "nombre",
            ellipsis: true,
            onHeaderCell: () => ({ className: 'border-l' }),
            children: [
                {
                    title: () => ( <p className='tableTitlePrincipal text-center'>Evaluador</p>),
                    width: 120,
                    render: (text, record, index) => (
                            <div className='flex items-center justify-center gap-5'>
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
                },
                {
                    title: () => ( <p className='tableTitlePrincipal text-center'>Estatus</p>),
                    width: 120,
                    onHeaderCell: () => ({ className: 'border-r' }),
                    render: (text, record, index) => (
                        <>
                            <p className='text-center text-devarana-graph'>
                                {
                                    // contar los que tienen status 1
                                   ` ${record.evaluacionLider?.filter((evaluacion:any) => evaluacion.status === 1).length || 0} / ${record.evaluacionLider?.length || 0}`
                                }
                            </p>
                        </>
                    )
                }
            ],
        },
        
        
        {
            title: () => ( <p className='tableTitlePrincipal'>Acciones</p>),
            key: "acciones",
            width: 100,
            onHeaderCell: () => ({ className: 'border-l' }),
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
        setUsuarioId(id)
        setFormVisible(true)
    }

    

    const handleGenerate = () => {
        confirm({
            title: 'Generar evaluaciones',
            content: '¿Está seguro que desea generar las evaluaciones?',
            okText: 'Generar',
            okType: 'danger',
            onOk() {
                generateAsignacionesEvaluacion({year, quarter}).
                unwrap().
                then((args) => {
                    message.success('Evaluaciones generadas correctamente')
                }).
                catch((err: any) => {
                    message.error('Ocurrió un error al generar las evaluaciones')
                })
            },
            onCancel() {
                
            },
        });
    }

        
    if( isGenerating )  return < LoadingMask text='Generando evaluaciones, esto puede tomar unos segundos.' />
    if ( isLoading ) return < Loading />

    return (
        <>
            <div className="flex items-center justify-between  gap-5 pb-5">
                <Input
                    placeholder="Buscar"
                    className="max-w-xs w-full"
                    value={filtros?.nombre}
                    onChange={(e: any) => {
                        setFiltros({
                            ...filtros,
                            nombre: e.target.value
                        })
                    }}
                />
                <div className='flex items-center'>
                    <div>
                        <Checkbox.Group
                            className='flex items-center'
                            value={selected}
                            disabled={true}
                            onChange={(values) => {
                                setSelected(values)
                            }}
                        >
                            <Checkbox value="lider">Lider</Checkbox>
                            <Checkbox value="colaborador">Colaborador</Checkbox>
                            <Checkbox value="propia">Propia</Checkbox>
                        </Checkbox.Group>
                    </div>
                    <Button
                        classType="regular"
                        classColor="primary"
                        width={'auto'}
                        disabled={isGenerating}
                        onClick={() => {
                            handleGenerate()
                        } }
                    >
                        Generar Evaluaciones
                    </Button>
                </div>
            </div>
            <Box className="overflow-auto animate__animated animate__fadeIn animate__faster">
                <Table 
                    columns={columns}
                    dataSource={usuarios}
                    rowKey={(record) => record.id}
                    loading={isLoading || isFetching}
                />
			</Box>

            <Modal
                open={formVisible}
                width={1000}
                title={<p className='text-devarana-graph'>Evaluaciones</p>}
                footer={null}
                onCancel={() => setFormVisible(false)}
                destroyOnClose={true}
            >

                <GestionEvaluaciones usuarioId={usuarioId} />
            
            </Modal>
                
        </>
    )
}
