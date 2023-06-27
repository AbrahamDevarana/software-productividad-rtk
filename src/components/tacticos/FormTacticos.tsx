
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { updateTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import { UsuarioProps } from '@/interfaces';
import { useParams } from 'react-router-dom';
import { Form, DatePicker, Input, Select, Radio, Divider, Checkbox, RadioChangeEvent, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { BsFillCalendarFill } from 'react-icons/bs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { hasGroupPermission } from '@/helpers/hasPermission';


interface FormTacticoProps {
    setShowEdit: (value: boolean) => void
    showEdit?: boolean
}

export const FormTactico:React.FC<FormTacticoProps> = ({showEdit, setShowEdit}) => {

    
    const {slug} = useParams<{slug:string}>()
    const inputRef = useRef<any>(null)
    const  dispatch = useAppDispatch()
    const { currentTactico, isLoadingCurrent } = useAppSelector(state => state.tacticos)
    const { TextArea } = Input;
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { estrategicos } = useAppSelector(state => state.estrategicos)
    const { areas } = useAppSelector(state => state.areas)
    const {userAuth, permisos} = useAppSelector(state => state.auth)

    const [isEstrategico, setIsEstrategico] = useState(false)

    const [form] = Form.useForm()

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
        dispatch(getAreasThunk({}))
        dispatch(getEstrategicosThunk({}))
    }, [])
    
    const handleOnSubmit = () => {

        if(hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true) return

        const query = {
            ...currentTactico,
            ...form.getFieldsValue(),
        }
        if(!isEstrategico){
            query.estrategicoId = null
        }
        
        dispatch(updateTacticoThunk(query))
    }
    

    const options = useMemo(() => {
        const perspectivas = estrategicos.map((estrategico) => estrategico.perspectivas.nombre).filter((perspectiva, index, self) => self.indexOf(perspectiva) === index)
        return perspectivas.map((perspectiva) => ({
            label: (<p className='text-devarana-dark-graph text-xs opacity-50'>{perspectiva}</p>),
            options: estrategicos.filter((estrategico) => estrategico.perspectivas.nombre === perspectiva).map((estrategico) => ({
                label: (<p className='text-devarana-graph'>{estrategico.nombre}</p>),
                value: estrategico.id
            }))
        }))
    }, [estrategicos])
   


    const handleChangeTipoEstrategia = (e: RadioChangeEvent) => {

        if(!hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos)) return
        setIsEstrategico(e.target.value)
    }


    useEffect(() => {
        if(!currentTactico.id) return

        if(currentTactico.estrategicoId){
            setIsEstrategico(true)
        }

    }, [currentTactico])

    

    if ( isLoadingCurrent ){
        return <Skeleton active paragraph={{ rows: 20 }} />
    }
    

    return (
        <>
            <Form
                onBlur={ () => {
                    form.validateFields()
                    handleOnSubmit()
                }}
                layout='vertical'
                className='grid grid-cols-12 gap-x-5'
                form={form}
                scrollToFirstError
                disabled={
                    hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) ? false : true
                }
                initialValues={{
                    ...currentTactico,
                    propietarioId: userAuth.id,
                    responsablesArray: currentTactico.responsables.map((responsable) => responsable.id),
                    areasArray: [ ...currentTactico.areas.map((area) => area.id), areas.find(area => area.slug === slug )?.id || 0 ],
                    fechaInicio: dayjs(currentTactico.fechaInicio).add(6, 'hour'),
                    fechaFin: dayjs(currentTactico.fechaFin).add(6, 'hour'),
                }}
            >
                <div className='pb-5 col-span-12'>
                    <label className='block pb-3'>Tipo de Objetivo Táctico</label>
                    <Radio.Group
                        value={ isEstrategico ? true : false}
                        onChange={handleChangeTipoEstrategia}
                        
                    >
                        <Radio value={true}>Táctico</Radio>
                        <Radio value={false}>Core</Radio>
                    </Radio.Group>

                </div>
                { ( isEstrategico )  && (
                <Form.Item
                    label="Objetivo estratégico"
                    name="estrategicoId"
                    className='col-span-12'
                    rules={[{ required: true, message: 'Selecciona el objetivo estratégico' }]}
                >
                    <Select
                        placeholder="Selecciona el objetivo estratégico"
                        disabled={options.length === 0}
                        allowClear
                        showSearch
                        options={options}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    >
                    </Select>
                </Form.Item>
                )}

                <div className='col-span-12'>
                    <Form.Item
                        label="Áreas"
                        name="areasArray"
                    >
                        <Checkbox.Group className='flex flex-1 flex-wrap'>
                            {
                                areas.map((area) => (
                                    <Checkbox key={area.id} value={area.id}> {area.nombre} </Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    </Form.Item>
                </div>

                <Divider  className='col-span-12'/>

                <Form.Item
                    label="Objetivo"
                    className='col-span-10'
                    name='nombre'
                >
                    <Input 
                        className='text-xl'
                        ref={inputRef}
                        onPressEnter={ (e) => e.currentTarget.blur() }
                        bordered={false}
                    />
                </Form.Item>
                <Form.Item
                    label="Clave"
                    className='col-span-2'
                    name="codigo" 
                >
                    <Input 
                        className='text-xl'
                        ref={inputRef}
                        onPressEnter={ (e) => e.currentTarget.blur() }
                        bordered={false}
                    />
                </Form.Item>


                <Form.Item
                    label="Fecha de inicio"
                    className='col-span-6'
                    name={"fechaInicio"}
                >
                    <DatePicker
                        format={"DD-MM-YYYY"}
                        className='w-full'
                        clearIcon={false}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Fecha de fin"
                    className='col-span-6'
                    name={"fechaFin"}
                >
                    <DatePicker
                        format={"DD-MM-YYYY"}
                        className='w-full'
                        clearIcon={false}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>

                <Form.Item
                    label="Propietario"
                    name="propietarioId"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        bordered = {false}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                    >
                        {
                            usuarios.map((usuario: UsuarioProps) => (
                                <Select.Option key={usuario.id} value={usuario.id}> { spanUsuario(usuario) } </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Co-Responsables"
                    name="responsablesArray"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"                      
                        allowClear
                        mode="multiple"
                        bordered = {false}
                        tagRender={tagRender}
                        maxLength={3}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                    >
                        {
                            usuarios.map((usuario: UsuarioProps) => (
                                <Select.Option key={usuario.id} value={usuario.id}>{spanUsuario(usuario)}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                        
                <Form.Item
                    label="Describe la meta a alcanzar"
                    className='col-span-12'
                    name="meta"
                >
                    <TextArea rows={3} name="meta" className='text-devarana-graph bg-[#F9F9F7] p-5 rounded-ext'  bordered={false} />
                </Form.Item>
                <Form.Item
                    label="Indicador"
                    className='col-span-12'
                    name="indicador"
                >
                    <TextArea rows={3} name="indicador" className='text-devarana-graph bg-[#F9F9F7] p-5 rounded-ext'  bordered={false} />
                </Form.Item>
            </Form>
                    
        </>
    )
}
