
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { useSelectUser } from '@/hooks/useSelectUser';
import { CoreProps, DepartamentoProps, TacticoProps, UsuarioProps } from '@/interfaces';
import { getAreaThunk } from '@/redux/features/areas/areasThunks';
import { useCreateTacticoMutation, useGetTacticosByEquipoCoreQuery } from '@/redux/features/tacticos/tacticosThunk';
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Checkbox, Modal, Select, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    slug?: string
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
    setActiveTactico: React.Dispatch<React.SetStateAction<TacticoProps | CoreProps | undefined>>
}


const Core = ({slug, setShowDrawer, setActiveTactico}: Props) => {

    const { year } = useAppSelector(state => state.global.currentConfig)
    const { data: usuarios } = useGetUsuariosQuery({status: 'ACTIVO'})
    const { currentArea } = useAppSelector(state => state.areas)
    const [ activeTeam, setActiveTeam ] = useState<DepartamentoProps>()
    const [showOnlyMe, setShowOnlyMe] = useState(false)
    const { data: objetivosCore, isLoading } = useGetTacticosByEquipoCoreQuery({year, departamentoId: activeTeam?.slug, showOnlyMe}, {skip: !activeTeam, refetchOnMountOrArgChange: true})
    const [createTacticoMutation, {isError, isSuccess}] = useCreateTacticoMutation()    
    const {confirm} = Modal
    const dispatch = useAppDispatch()
    const usuarioRef = useRef('');
    const { tagRender, spanUsuario } = useSelectUser(usuarios)

    useEffect(() => {
        if(slug){
            dispatch(getAreaThunk(slug))
        }
    }, [year])


    useEffect(() => {
        if(currentArea?.departamentos?.length){
            handleGetDepartamentos(currentArea.departamentos[0])
            setActiveTeam(currentArea.departamentos[0])
        }
    }, [currentArea])

    const handleGetDepartamentos = (departamento: DepartamentoProps) => {
        setActiveTeam(departamento)
    }

    const activeDepartamento = useMemo(() => {
        const current = activeTeam ? currentArea?.departamentos?.find(equipo => equipo.slug === activeTeam.slug) : null
        return current
    }, [activeTeam])

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
                    defaultValue={
                        usuarios?.find(usuario => usuario.departamentoId === activeDepartamento?.id)?.id
                    }
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
                usuarioRef.current !== '' && createTacticoMutation({year, slug, propietarioId: usuarioRef.current, departamentoId: activeDepartamento?.id})
            },
            onCancel() {
               
            },
        });
    }

    const handleShowObjetivo = (objetivo: TacticoProps | CoreProps) => {
        setActiveTactico(objetivo)   
        setShowDrawer(true)
    }

    const handleGetOnlyMe = (value : boolean) => {
        setShowOnlyMe(value)
    }

    return ( 
        <motion.div>

            <div className="flex gap-5 max-h-screen flex-row">
                <div className="flex flex-col gap-x-5 gap-y-5 md:max-w-[280px] w-full md:max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                    <div className="bg-white shadow-ext rounded-ext md:w-[275px] w-full p-3">
                            {
                                currentArea.departamentos?.map(equipo => (
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
                            }
                    </div>
                    
                </div>       
                    <div className="w-full flex flex-col gap-y-5 align-middle">
                        {
                            <Box className="flex flex-col md:flex-row" style={{
                                backgroundColor: activeDepartamento?.color,
                            }}>
                                <div>
                                    <h1 className="text-white font-medium">Objetivos Tácticos Core</h1>
                                    <p className="text-white text-opacity-80 drop-shadow"> Objetivos anuales de las áreas enfocados en mantener una operación eficiente </p>
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
                        }
                        <div className="w-full flex flex-col gap-y-5">
                            <Box>
                                <div className="flex items-center gap-x-2">
                                    <h2>Objetivos Tácticos Estratégicos</h2>
                                    <Tooltip
                                        title='Objetivos anuales de las áreas enfocados en mantener una operación eficiente'
                                        color='#408FE3'
                                    >
                                        <FaQuestionCircle className='text-primary-light'/>
                                    </Tooltip>
                                </div>
                                    <TablaTacticos objetivos={objetivosCore || []} handleCreateObjetivo={ handleCreateObjetivoCore }  isLoading={isLoading} handleShowObjetivo={handleShowObjetivo}/>
                            </Box>
                        </div>
                    </div>
            </div>
        </motion.div>
    );
}
 
export default Core;