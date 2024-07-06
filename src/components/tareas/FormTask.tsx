import { DatePicker, Dropdown, Form, Input, message, Select, Skeleton } from 'antd'
import { useState } from 'react'
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks'
import { TaskProps } from '@/interfaces'
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/assets/scss/quill.scss'
import { TabStatus } from '@/components/ui/TabStatus';
import { statusType, statusTypes } from '@/types'
import type { MenuProps } from 'antd';
import { useGetTaskQuery, useUpdateTaskMutation } from '@/redux/features/tasks/tasksThunk'
import { BsFillCalendarFill } from 'react-icons/bs';



interface Props {
    selectedTask: TaskProps
    handleClose: () => void
}
export const FormTask = ({selectedTask, handleClose}: Props) => {

    const { data: task, isLoading} = useGetTaskQuery({taskId: selectedTask.id}, {skip: !selectedTask.id})
    const { data: usuarios } = useGetUsuariosQuery({status: 'ACTIVO'})
    const [ updateTask, { isLoading: isUpdating } ] = useUpdateTaskMutation()


    const [form] = Form.useForm();
    const [status, setStatus] = useState<keyof typeof statusTypes>()


    const handleSubmit = async () => {      
        
        
        const query = {
            ...selectedTask,
            ...form.getFieldsValue()
        }

        await updateTask(query).unwrap().then(() => {
            message.success('Tarea actualizada correctamente')
            handleClose()
        }).catch(() => {
            message.error('Ocurrió un error al actualizar la tarea')
        })


    }

    const handleChangeStatus = (status: keyof typeof statusTypes) => {
        setStatus(status)
        form.setFieldValue('status', status)
    }



    if(isLoading || !task) return ( <Skeleton active paragraph={{ rows: 10 }} /> )

    return (
        <>
            <p className='text-xs text-gray-400 text-right'>Fecha de creación: {dayjs(task.created).format('D MMMM YY')}</p>
            <Form
                layout='vertical'
                className='w-full grid grid-cols-12 md:gap-x-5 editableForm'
                initialValues={{
                    nombre: task.nombre,
                    fechaInicio: dayjs(task.created).add(6, 'hour'),
                    fechaFin: dayjs(task.fechaFin).add(6, 'hour'),
                    descripcion: task.descripcion,
                }}
                form={form}
                onBlur={handleSubmit}
                
            >
                <Form.Item 
                    name='nombre'
                    label='Nombre de la Actividad'
                    className='col-span-12'
                >
                    <Input 
                        variant='borderless'
                        onPressEnter={
                            e => {
                                e.preventDefault()
                                e.stopPropagation()
                                e.currentTarget.blur()
                            }
                        }
                    />
                </Form.Item>

                {/* <Form.Item
                    label='Status'
                    name='status'
                    className='col-span-12'
                >
                     <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                            <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
                                <TabStatus status={task.status} />
                            </button>
                    </Dropdown>
                </Form.Item> */}


                


                <Form.Item
                    label='Fecha Cierre'
                    name={'fechaFin'}
                    className='col-span-6'
                >
                    <DatePicker format={'D MMMM YY'} variant='borderless' suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}/>
                </Form.Item>

                

                
                <div className='flex col-span-12'>
                    <Form.Item
                        label='Descripción de Acción'
                        className='formItem'
                        name='descripcion'
                    >
                  
                    </Form.Item>
                </div>

            </Form>
            <hr />

        </>
    )
}
