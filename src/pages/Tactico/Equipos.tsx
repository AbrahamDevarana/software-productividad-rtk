import { useGetTacticosByEquiposQuery,  useGetTacticosByEquipoCoreQuery, useCreateTacticoMutation} from "@/redux/features/tacticos/tacticosThunk"
import { useAppSelector } from "@/redux/hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { Box } from "@/components/ui"
import { motion } from 'framer-motion';
import { Avatar, Checkbox, Image, Modal, Select, Tooltip, TreeSelect } from "antd"
import { FaQuestionCircle } from "react-icons/fa"
import { useGetAreaQuery } from "@/redux/features/areas/areasThunks"
import { TablaTacticos } from "@/components/tacticos/TablaTacticos"
import { getStorageUrl } from "@/helpers"
import getBrokenUser from "@/helpers/getBrokenUser"
import { CoreProps, DepartamentoProps, TacticoProps, UsuarioProps } from "@/interfaces";
import { Spinner } from "@/components/antd/Spinner";
import { useGetPerspectivasQuery } from "@/redux/features/perspectivas/perspectivasThunk";
import { useGetUsuariosQuery } from "@/redux/features/usuarios/usuariosThunks";
import { useSelectUser } from "@/hooks/useSelectUser";

interface Props {
    slug?: string
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, isEstrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
    setActiveTactico: (tactico: TacticoProps | CoreProps | undefined) => void;
}

const Equipos = ({ slug, setShowDrawer, setActiveTactico }:Props) => {
    
    const {userAuth} = useAppSelector(state => state.auth)
    const { year } = useAppSelector(state => state.global.currentConfig)
    const [ activeTeam, setActiveTeam ] = useState<DepartamentoProps>()
    const [ showOnlyMe, setShowOnlyMe ] = useState(false)
    const newTacticoRef = useRef('');
    const usuarioRef = useRef('');
    
    const { data: usuarios } = useGetUsuariosQuery({status: 'ACTIVO'})
    const { data: currentArea, isLoading: isLoadingArea, status: statusArea } = useGetAreaQuery({areaSlug: slug}, {skip: !slug })
    const { data: objetivosTacticos, isLoading, isFetching } = useGetTacticosByEquiposQuery({year, departamentoId: activeTeam?.slug, showOnlyMe: showOnlyMe}, {skip: !activeTeam, refetchOnMountOrArgChange: true})
    const { data: objetivosCore, isLoading: isLoadingCore, isFetching: isFetchingCore } = useGetTacticosByEquipoCoreQuery({year, departamentoId: activeTeam?.slug, showOnlyMe: showOnlyMe}, {skip: !activeTeam, refetchOnMountOrArgChange: true})
    const { data: perspectivas, isLoading: isLoadingPerspectiva, isFetching: isFetchingPerspectiva} = useGetPerspectivasQuery({year})
    const [createTacticoMutation, {}] = useCreateTacticoMutation()
    const {confirm} = Modal;

    const { tagRender, spanUsuario } = useSelectUser(usuarios)

    useEffect(() => {
        if(statusArea === 'fulfilled' && currentArea){
            if(currentArea.departamentos?.length){
                setActiveTeam(currentArea.departamentos[0])
            }
        }
    }, [currentArea])

    const handleGetDepartamentos = (departamento: DepartamentoProps) => {
        setActiveTeam(departamento)
    }

    const activeDepartamento = useMemo(() => {
        const current = activeTeam ? currentArea?.departamentos?.find(equipo => equipo.slug === activeTeam.slug) : null
        return current
    }, [activeTeam])

    const optEstrategicos = useMemo(() => {
        if (!perspectivas || isLoadingPerspectiva || isFetchingPerspectiva) return [];
        return perspectivas.map(perspectiva => {
            return {
                key: perspectiva.id,
                label: (
                    <div style={{ padding: 5, display: 'flex', alignItems: 'center', gap: 5, backgroundColor: perspectiva.color, color: 'white' }} >
                        <p className={`text-white w-full`} >{perspectiva.nombre}</p>
                    </div>
                ),
                treeIcon: false,
                value: perspectiva.id,
                dataName: perspectiva,
                selectable: false,
                children: perspectiva.objetivosEstrategicos.map(estrategico => {
                    return {
                        label: <p className='text-devarana-graph'><span style={{ color: perspectiva.color }}>{estrategico.codigo}</span> | <Tooltip title={estrategico.nombre}></Tooltip> {estrategico.nombre}</p>,
                        value: estrategico.id,
                        dataName: estrategico.nombre,
                        isLeaf: true,
                    }
                })
            }
        }) // .filter(e  => e.dataName.id === currentArea?.perspectivas?.id)
    }, [perspectivas, isLoadingPerspectiva, isFetchingPerspectiva])

    const handleCreateObjetivo = () => {        
        usuarioRef.current = usuarios?.find(usuario => usuario.departamentoId === activeDepartamento?.id)?.id.toString() || ''
        confirm({
            maskClosable: true,
            closable: true,
            width: window.innerWidth > 768 ? '70%' : 500,
            title: 'Crear objetivo',
            content: (
            <div>
                <TreeSelect
                    treeExpandAction='click'
                    placeholder="Selecciona el objetivo estratégico"
                    showSearch
                    treeDefaultExpandedKeys={optEstrategicos.map(e => e.dataName.id === currentArea?.perspectivas?.id ? e.key : '')}
                    treeData={optEstrategicos}
                    showCheckedStrategy={TreeSelect.SHOW_CHILD}
                    multiple={false}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    className='w-full'
                    treeNodeFilterProp='dataName'
                    style={{ width: '100%' }}
                    onSelect={(value) => newTacticoRef.current = value.toString()}
                />
               <Select
                    style={{ width: '100%' }}
                    className="mt-3"
                    placeholder="Selecciona al propietario"
                    tagRender={tagRender}
                    size='large'
                    showSearch
                    defaultValue={usuarios?.find(usuario => usuario.departamentoId === activeDepartamento?.id)?.id}
                    onChange={(value) => usuarioRef.current = value.toString()}
                    maxTagPlaceholder={(omittedValues) => (
                        <span className='text-devarana-graph'>+{omittedValues.length}</span>
                    )}
                    // @ts-ignore
                    filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    
                >
                    {
                        usuarios?.map((usuario: UsuarioProps) => (
                            <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} 
                            > { spanUsuario(usuario) } </Select.Option>
                        ))
                    }
                </Select>
            </div>),
            okText: 'Crear',
            okButtonProps: { type: 'default', className: 'text-primary-light' },
            cancelText: 'Cancelar',
            async onOk() {
                newTacticoRef.current !== '' && createTacticoMutation({year, estrategicoId: newTacticoRef.current, slug, propietarioId: usuarioRef.current})
            },
            onCancel() {
               
            },
        });
    }

    const handleCreateObjetivoCore = () => {
        usuarioRef.current = usuarios?.find(usuario => usuario.departamentoId === activeDepartamento?.id)?.id.toString() || ''
        confirm({
            maskClosable: true,
            closable: true,
            width: window.innerWidth > 768 ? '70%' : 500,
            title: 'Crear objetivo',
            content: (
            <div>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Selecciona al propietario"
                    tagRender={tagRender}
                    size='large'
                    showSearch
                    maxTagPlaceholder={(omittedValues) => (
                        <span className='text-devarana-graph'>+{omittedValues.length}</span>
                    )}
                    defaultValue={usuarios?.find(usuario => usuario.departamentoId === activeDepartamento?.id)?.id}
                    onChange={(value) => usuarioRef.current = value.toString()}
                    // @ts-ignore
                    filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    
                >
                    {
                        usuarios?.map((usuario: UsuarioProps) => (
                            <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} 
                            > { spanUsuario(usuario) } </Select.Option>
                        ))
                    }
                </Select>
            </div>),
            okText: 'Crear',
            okButtonProps: { type: 'default', className: 'text-primary-light' },
            cancelText: 'Cancelar',
            async onOk() {
                usuarioRef.current !== '' && createTacticoMutation({year, slug, propietarioId: usuarioRef.current})
            },
            onCancel() {
               
            },
        });
    }

    const handleShowObjetivoT = (objetivo: TacticoProps | CoreProps) => {
        setActiveTactico(objetivo)  
        setShowDrawer(true)
    }
    const handleShowObjetivoC = (objetivo: TacticoProps | CoreProps) => {
        setActiveTactico(objetivo)      
        setShowDrawer(true)
    }

    const handleGetOnlyMe = (value : boolean) => {
        setShowOnlyMe(value)
    }


    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
        >
            <div className="flex gap-5 flex-row md:flex-nowrap flex-wrap">
                <div className="flex flex-col gap-x-5 gap-y-5 md:max-w-[280px] w-full md:max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                    <div className="bg-white shadow-ext rounded-ext md:w-[275px] w-full p-3">
                            {
                                currentArea && !isLoadingArea 
                                ? currentArea.departamentos?.map(equipo => (
                                    <div key={equipo.slug} 
                                        onClick={() => handleGetDepartamentos(equipo)} 
                                        className={`p-2 hover:bg-gray-200 transition duration-300 ease-in-out  first:rounded-t-ext last:rounded-b-ext cursor-pointer`}
                                        style={{
                                            backgroundColor: activeTeam?.slug === equipo.slug ? 'rgb(229, 231, 235)' : '',
                                        }}
                                    >
                                            <p className="font-medium text-devarana-graph"> {equipo.nombre} </p>
                                        </div>
                                ))
                                : <div className="h-32 flex justify-center"> <Spinner /> </div>
                            }
                    </div>
                </div>    
                <div className="pt-5 w-full flex flex-col gap-y-5">
                    <Box className="flex flex-col md:flex-row" style={{
                        backgroundColor: activeDepartamento?.color,
                    }}>
                        <div>
                            <h1 className="text-white font-medium md:text-left text-center">{activeDepartamento?.nombre}</h1>
                            <p className="text-white text-opacity-80 drop-shadow md:text-left text-center">{currentArea?.nombre}</p>
                        </div>

                        <div className="mx-5 px-5 md:border-r-0 md:border-t-0 md:border-b-0 md:border-white md:border items-center flex">
                            {
                                currentArea && currentArea.leader && activeDepartamento && (
                                    <div className="flex items-center gap-x-2 align-middle">
                                        <Avatar 
                                                src={<Image src={`${getStorageUrl(activeDepartamento?.leader?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                        />

                                        {
                                            activeDepartamento.leader &&
                                            ( 
                                            <div className="">
                                                <p className="text-white">{activeDepartamento.leader.nombre} {activeDepartamento.leader?.apellidoPaterno} {activeDepartamento?.leader?.apellidoMaterno}
                                                </p>
                                                <p className="text-sm text-opacity-80 text-white drop-shadow">Lider de seguimiento</p>
                                            </div>)
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className='ml-auto'>
                            <Checkbox
                                checked={showOnlyMe}
                                onChange={(e) => handleGetOnlyMe(e.target.checked)}
                                className='text-white'
                            >
                                <p className='text-white'>Solo mis objetivos {showOnlyMe} </p>
                            </Checkbox>

                        </div>
                    </Box>
                    <Box>
                        <div className="flex items-center gap-x-2">
                            <h2>Objetivos Tácticos Estratégicos</h2>
                            <Tooltip
                                title='Objetivos anuales de las áreas que contribuyen directamente al cumplimiento de la Estrategía'
                                color='#408FE3'
                            >
                                <FaQuestionCircle className='text-primary-light'/>
                            </Tooltip>
                        </div>
                            <TablaTacticos objetivos={objetivosTacticos || []} handleCreateObjetivo={ handleCreateObjetivo } isLoading={isLoading} isFetching={isFetching} handleShowObjetivo={handleShowObjetivoT}/>
                    </Box>
                    <Box>
                        <div className="flex items-center gap-x-2">
                            <h2>Objetivos Tácticos Core</h2>
                            <Tooltip>
                                <Tooltip
                                    title='Objetivos anuales de las áreas enfocados en mantener una operación eficiente'
                                    color='#408FE3'
                                >
                                    <FaQuestionCircle className='text-primary-light'/>
                                </Tooltip>
                            </Tooltip>
                        </div>
                            <TablaTacticos objetivos={objetivosCore || []} handleCreateObjetivo={ handleCreateObjetivoCore } isLoading={isLoadingCore} isFetching={isFetchingCore} handleShowObjetivo={handleShowObjetivoC}/>
                    </Box>
                    
                    
                </div>
            
            </div>
        </motion.div> 
    );
}
 
export default Equipos;