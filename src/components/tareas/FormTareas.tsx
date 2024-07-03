import { Avatar, DatePicker, Dropdown, Form, Input, Select, Skeleton, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks'
import { TareasProps, UsuarioProps } from '@/interfaces'
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/assets/scss/quill.scss'
import { TabStatus } from '../ui/TabStatus'
import { statusType, statusTypes } from '@/types'
import type { MenuProps } from 'antd';



export const FormTareas = () => {

    return (
        <>
            FormTareas
        </>
    )
    // const dispatch = useAppDispatch()
    // const [ selectedUsers, setSelectedUsers ] = useState<any[]>([]);
    // const { usuarios } = useAppSelector(state => state.usuarios)
    // const { currentTarea, isLoadingCurrentTarea } = useAppSelector(state => state.tareas)
    // const [form] = Form.useForm();
    // const [status, setStatus] = useState<keyof typeof statusTypes>()

    // useEffect(() => {
    //     dispatch(getUsuariosThunk({}))
    // }, [])

    // useEffect(() => {
    //     setStatus(currentTarea?.status)
    // }, [currentTarea])

    // const tagRender = (props: any) => {
    //     const { label, value, closable, onClose } = props;

    //     const usuario = usuarios.find((usuario) => usuario.id === value)

    //     return (
    //         <Tooltip title={label} color='white' key={value} className='relative'>
    //             <Avatar 
    //                 src={ import.meta.env.VITE_STORAGE_URL + usuario?.foto || undefined}
    //                 style={{
    //                     marginRight: -5
    //                 }}
    //             >
    //                 {usuario?.iniciales}
    //             </Avatar>
    //         </Tooltip>
    //     );
    // }

    // const spanUsuario = (usuario: UsuarioProps) => (

    //     <div className='flex items-center gap-x-2'>
    //         <Avatar
    //             src={import.meta.env.VITE_STORAGE_URL + usuario.foto}
    //         >
    //             {usuario.iniciales}
    //         </Avatar>
    //         <p className='font-light text-devarana-graph'>
    //             {usuario.nombre} {usuario.apellidoPaterno} 
    //         </p>
    //     </div>
    // )

    // const items: MenuProps['items'] = Object.entries(statusTypes).map(([key, value]) => ({
    //     key,
    //     label: value
    // }))

    // const handleSubmit = () => {        
    //     const query = {
    //         ...currentTarea,
    //         ...form.getFieldsValue(),
    //     } as TareasProps

    //     if(query.id !== '') {
    //         dispatch(updateTareaThunk(query))
    //     }
    //     else {
    //         dispatch(createTareaThunk(query))
    //     }
    // }

    // const onClick:MenuProps['onClick'] = ({key}) => {
    //     setStatus(key as keyof typeof statusTypes)
    //     form.setFieldValue('status', key)   
    // }

    // if(isLoadingCurrentTarea) return ( <Skeleton active paragraph={{ rows: 10 }} /> )

    // return (
    //     <>
    //         <Form
    //             layout='vertical'
    //             className='grid grid-cols-12'
    //             initialValues={{
    //                 nombre: currentTarea.nombre,
    //                 fechaInicio: dayjs(currentTarea.fechaInicio).add(6, 'hour'),
    //                 fechaFin: dayjs(currentTarea.fechaFin).add(6, 'hour'),
    //                 descripcion: currentTarea.descripcion,
    //                 participantes: currentTarea.usuariosTarea.map((usuario) => usuario.id)
    //             }}
    //             form={form}
    //             onBlur={handleSubmit}
                
    //         >
    //             <Form.Item 
    //                 name='nombre'
    //                 className='col-span-12'
    //             >
    //                 <Input 
    //                     placeholder='Ingresa el nombre de la actividad' 
    //                     className='customInput customInput__title'
    //                     bordered={false} 
    //                     onPressEnter={
    //                         e => {
    //                             e.preventDefault()
    //                             e.stopPropagation()
    //                             e.currentTarget.blur()
    //                         }
    //                     }
    //                 />
    //             </Form.Item>

    //             <Form.Item
    //                 label='Status'
    //                 name='status'
    //                 className='col-span-12'
    //             >
    //                 <Dropdown menu={{items, onClick}} overlayClassName='bg-transparent' >
    //                     <button type='button' className='flex items-center gap-2' onClick={(e) => e.preventDefault()}>
    //                         <TabStatus status={status as statusType} />
    //                     </button>
    //                 </Dropdown>
    //             </Form.Item>


    //             <Form.Item
    //                 label='Fecha Inicio'
    //                 name={'fechaInicio'}
    //                 className='col-span-6'
    //             >
    //                 <DatePicker format={'D MMMM'} bordered={false} />
    //             </Form.Item>
    //             <Form.Item
    //                 label='Fecha Fin'
    //                 name={'fechaFin'}
    //                 className='col-span-6'
    //             >
    //                 <DatePicker format={'D MMMM'} bordered={false} />
    //             </Form.Item>

                

    //             <Form.Item
    //                 label='Participantes'
    //                 name='participantes'
    //                 className='col-span-12'
    //             >
    //                 <Select mode='multiple' placeholder='Please select' bordered={false}
    //                     onChange={(value) => setSelectedUsers(value)} value={selectedUsers}
    //                     tagRender={tagRender} maxTagCount={3} style={{ width: '100%' }}
    //                     maxTagPlaceholder={(omittedValues) => (
    //                         <span className='text-devarana-graph'>+{omittedValues.length}</span>
    //                     )}
    //                 >
    //                     {
    //                         usuarios.map((usuario) => (
    //                             <Select.Option key={usuario.id} value={usuario.id}>
    //                                 { spanUsuario(usuario) }
    //                             </Select.Option>
    //                         ))
    //                     }
    //                 </Select>
    //             </Form.Item>
    //             <div className='flex col-span-12'>
    //                 <Form.Item
    //                     label='Descripción de Acción'
    //                     className='formItem'
    //                     name='descripcion'
    //                 >
    //                     {/* <Input.TextArea placeholder='Descripción'rows={5} /> */}
    //                     <ReactQuill theme="snow" className='w-full' value={ currentTarea.descripcion } />
    //                 </Form.Item>
    //             </div>

    //         </Form>
    //         <hr />

    //     </>
    
}
