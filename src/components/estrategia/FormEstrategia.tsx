import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Select, Slider, Skeleton, MenuProps, Dropdown, Divider, Button, Space, Switch, Tabs, TabsProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createEstrategicoFromPerspectivaThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import dayjs from 'dayjs';
import { PerspectivaProps } from '@/interfaces';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TabStatus } from '../ui/TabStatus';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { statusType } from '@/types';
import { getColor } from '@/helpers';
import { BsFillCalendarFill } from 'react-icons/bs';
import { useSelectUser } from '@/hooks/useSelectUser';
import { FaEdit, FaTimes } from 'react-icons/fa';



interface FormEstrategiaProps {
    setOpen: (open: boolean) => void;
    setShowEdit?: (show: boolean) => void;
}


export const FormEstrategia: React.FC<FormEstrategiaProps> = ({setOpen, setShowEdit}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { currentEstrategico, isLoadingCurrent } = useAppSelector(state => state.estrategicos)
    const { perspectivas } = useAppSelector(state => state.perspectivas)
    const { userAuth } = useAppSelector(state => state.auth)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const [statusEstrategico, setStatusEstrategico] = useState<statusType>(currentEstrategico.status);
    const [viewMeta, setViewMeta] = useState<boolean>(false);

    const [form] = Form.useForm();
    
    const inputRef = useRef<any>(null)
    const { TextArea } = Input;

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)
    

    const handleOnSubmit = () => {

        
        const query =  {
            ...currentEstrategico,
            ...form.getFieldsValue(),
        }

        delete query.status

        if(query.id){            
            dispatch(updateEstrategicoThunk(query))
        }else if(query.nombre.trim() !== '' && query.descripcion.trim() !== '' && query.perspectivaId.trim() !== '' && query.fechaInicio && query.fechaFin && query.propietarioId && query.indicador.trim() !== ''){
            dispatch(createEstrategicoFromPerspectivaThunk(query))
        }
    }

    useEffect(() => {
        dispatch(getUsuariosThunk({})) 
    }, [])

    useEffect(() => {
        if(currentEstrategico.id !== ''){
            setStatusEstrategico(currentEstrategico.status)
        }
    }, [currentEstrategico])


    const handleChangeProgreso = (value: number) => {
        
        if(currentEstrategico.id && currentEstrategico.progreso !== value){

            const updateEstrategico = {
                ...currentEstrategico,
                progreso: value
            }
            dispatch(updateEstrategicoThunk(updateEstrategico));  
        }  
    }

    const handleChangeStatus = (value: statusType) => {  
        console.log(value);
        

        setStatusEstrategico(value); 
        const updateEstrategico = {
            ...currentEstrategico,
            status: value
        }
        
        dispatch(updateEstrategicoThunk(updateEstrategico));       
    }
    

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <button onClick={() => handleChangeStatus('SIN_INICIAR')}> <TabStatus status={'SIN_INICIAR'} /> </button>
          ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => handleChangeStatus('EN_PROGRESO')}> <TabStatus status={'EN_PROGRESO'} /> </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => handleChangeStatus('FINALIZADO')}> <TabStatus status={'FINALIZADO'} /> </button>
            ),
        },
        {
            key: '4',
            label: (
                <button onClick={() => handleChangeStatus('DETENIDO')}> <TabStatus status={'DETENIDO'} /> </button>
            ),
        },
        {
            key: '5',
            label: (
                <button onClick={() => handleChangeStatus('CANCELADO')}> <TabStatus status={'CANCELADO'} /> </button>
            ),
        },
    ]

    const handleView = (id:string) => {
        navigate(`/estrategia/${id}`)
    }


    const itemTab: TabsProps['items'] = [
        {
            key: '1',
            label: 'Indicador',
        },
        {
            key: '2',
            label: 'Comentarios',
        }
    ]


    if(isLoadingCurrent) return <Skeleton paragraph={ { rows: 20 } } />

    return (
        <>
            <Form
                layout='vertical'
                initialValues={{
                    ...currentEstrategico,
                    responsables: currentEstrategico.responsables.map(responsable => responsable.id),
                }}
                form={form}
                className='w-full grid grid-cols-12 md:gap-x-5 editableForm'
            >
        
                <Form.Item
                    label="Objetivo"
                    className='col-span-10'
                    name={'nombre'}
                >
                    <Input
                        className='text-2xl'
                        bordered={false}
                        ref={inputRef}
                        onBlur={handleOnSubmit}
                        onPressEnter={ () => inputRef.current?.blur() }
                    />
                </Form.Item>
                <Form.Item
                    label="Clave"
                    className='col-span-2'
                    name={'codigo'}
                >
                    <Input
                        bordered={false}
                        name="codigo"
                        className='text-2xl'
                        ref={inputRef}
                        onBlur={handleOnSubmit}
                        onPressEnter={ () => inputRef.current?.blur() }
                    />
                </Form.Item>
                <Space className={`${ form.getFieldValue('id') === ''? 'hidden': 'block'} col-span-12`}>
                    <Divider className='col-span-12'  />
                    <Form.Item
                        className='col-span-12'
                        name={'progreso'}
                    >

                        <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Progreso</p>
                            <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                                    <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                        <TabStatus status={statusEstrategico} />
                                    </button>
                            </Dropdown>
                        </div>
                        <div className='inline-flex w-full'>
                            <p className='text-3xl font-bold pr-2' style={{ 
                                color: getColor(form.getFieldValue('status')).color,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundImage: `linear-gradient(to top, ${getColor(form.getFieldValue('status')).lowColor}, ${getColor(form.getFieldValue('status')).color})`
                            }}> { currentEstrategico.progreso }% </p>
                            <Slider
                                className='drop-shadow progressStyle w-full'
                                defaultValue={currentEstrategico.progreso}
                                min={0}
                                max={100}
                                onAfterChange={ (value ) => handleChangeProgreso(value) }
                                trackStyle={{
                                    backgroundColor: getColor(form.getFieldValue('status')).color,
                                    borderRadius: 10,

                                }}
                                railStyle={{
                                    backgroundColor: getColor(form.getFieldValue('status'), .3).color,
                                    borderRadius: 10,
                                }}
                                handleStyle={{
                                    borderColor: getColor(form.getFieldValue('status')).color,
                                }}
                            />
                        </div>
                    </Form.Item>
                    <Divider className='col-span-12' />
                </Space>
                <Form.Item
                    label="Perspectiva"
                    className='col-span-12'
                >
                    <div className='flex flex-wrap gap-3'>
                        {
                            perspectivas && perspectivas.map((perspectiva: PerspectivaProps) => (
                                <button 
                                    type='button'
                                    onClick={() => form.setFieldValue('perspectivaId', perspectiva.id)}
                                    key={perspectiva.id} 
                                    className={`rounded-ext px-2 py-1 text-white font-bold hover:transform transition-all duration-200 hover:scale-105 ${form.getFieldValue('perspectivaId') === perspectiva.id? 'opacity-100': 'opacity-70'}`}
                                    style={{
                                        backgroundColor: perspectiva.color,
                                    }}
                                > { perspectiva.nombre }
                                </button>
                            ))
                        }
                    </div>

                </Form.Item>
                <Form.Item
                    label="Fecha de inicio"
                    className='col-span-6'
                >
                    <DatePicker
                        onChange={(date, dateString) => form.setFieldValue('fechaInicio', dayjs(dateString, 'DD-MM-YYYY'))}
                        value={dayjs(form.getFieldValue('fechaInicio'))}
                        format={"DD-MM-YYYY"}
                        defaultValue={dayjs(form.getFieldValue('fechaInicio'))}
                        name="fechaInicio"
                        className='w-full'
                        clearIcon={false}
                        ref={inputRef}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Fecha de fin"
                    className='col-span-6'
                >
                    <DatePicker
                        onChange={(date, dateString) => form.setFieldValue('fechaFin', dayjs(dateString, 'DD-MM-YYYY'))}
                        value={dayjs(form.getFieldValue('fechaFin'))}
                        defaultValue={dayjs(form.getFieldValue('fechaFin'))}
                        name="fechaFin"
                        className='w-full'
                        clearIcon={false}
                        ref={inputRef}
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </Form.Item>
                <Form.Item
                    label="Propietario"
                    className='col-span-6'
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"
                        onChange={(value) => form.setFieldValue('propietarioId', value)}
                        mode="multiple"
                        tagRender={tagRender}
                        bordered = {false}
                        value={ form.getFieldValue('propietarioId') }
                        maxLength={1}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                    >
                        {
                            usuarios.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id}>{ spanUsuario(usuario) }</Select.Option>
                            )).filter( usuario => usuario.key !== userAuth?.id)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Co-Responsables"
                    className='col-span-6'
                    name='responsables'
                >

                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Selecciona los responsables"
                        onChange={(value) => {
                            form.setFieldValue('responsables', value)
                        }}           
                        onDeselect={(value) => {
                            form.setFieldValue('responsables', value)
                        }}                            
                        allowClear
                        bordered = {false}
                        value={ form.getFieldValue('responsables') }
                        tagRender={tagRender}
                        maxLength={3}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                    >
                        {
                            usuarios.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id}>{ spanUsuario(usuario) }</Select.Option>
                            )).filter( usuario => usuario.key !== userAuth?.id)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    className='col-span-12'
                    name="meta"
                >
                    <div className='flex justify-between items-center'>
                            <p className='text-devarana-graph font-medium'>Meta</p>
                            <button onClick={() => setViewMeta(!viewMeta)} className='font-bold text-devarana-graph'>
                                {
                                    viewMeta ? <FaTimes /> : <FaEdit />
                                }
                            </button>
                            
                        </div>
                    {
                        viewMeta 
                        ? (
                            <ReactQuill
                                value={form.getFieldValue('descripcion')}
                                onChange={(value) => form.setFieldValue('descripcion', value)}
                            />    
                        ) 
                        : ( <div className='text-devarana-graph bg-[#F9F9F7] p-5 rounded-ext' dangerouslySetInnerHTML={{ __html: form.getFieldValue('descripcion')}}></div> )
                    }
                </Form.Item>
                <div className='col-span-12'>
                    <Tabs defaultActiveKey='1' items={itemTab} className='text-devarana-graph active:text-devarana-dark-graph'>
                    </Tabs>
                    
                </div>

                <Form.Item
                    label="Indicador"
                    className='col-span-12'
                >
                    <TextArea rows={1} onChange={(e) => form.setFieldValue('indicador', e.target.value)} value={form.getFieldValue('indicador')}
                    name="indicador" className='editableInput' bordered={false}/>
                </Form.Item>
            </Form>
            <Button onClick={()=>handleView(currentEstrategico.id)} className='bg-gradient-to-t from-dark to-dark-light rounded-full text-white border-none absolute -left-4 top-20 hover:opacity-80' icon={<Icon iconName='faArrowLeft' className='text-white' />} /> 
        </>
    )
}
