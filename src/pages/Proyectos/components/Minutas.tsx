import { Editor } from '@/components/ui'
import { Input, Form } from 'antd'
import React from 'react'

export const Minutas = () => {

    const [form] = Form.useForm();

    const {setFieldValue, getFieldValue, resetFields, submit} = form

    const [minuta, setMinuta] = React.useState({
        content: 'Texto Inicial de la minuta'
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinuta({
            ...minuta,
            content: form.getFieldValue('content')
        })
    }

    return (
        <div className='grid grid-cols-12 gap-10'>
            <div className='col-span-3'>
                <Input placeholder='Buscar minuta' />
                <div className='pt-5 flex flex-col gap-5 h-screen overflow-y-auto pr-3'>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md px-5 pt-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                    <div className='border border-devarana-graph border-opacity-40 rounded-md p-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20'>
                        <h3 className='text-bold text-sm'>Minutas</h3>
                        <p className='line-clamp-2 text-xs text-devarana-graph'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloremque iste rerum dolor. Optio, quas? A rerum, nesciunt iure, temporibus libero natus enim eaque suscipit, itaque aspernatur doloremque ipsum eveniet? </p>
                        <p className='text-right text-xs py-1 opacity-25'>Hace 2 horas</p>
                    </div>
                </div>
            </div>
            <div className='col-span-9'>
                <Form form={form}
                    onFinish={handleOnChange}
                    initialValues={{ content: minuta.content }}
                >
                    <Editor setFieldValue={setFieldValue} getFieldValue={getFieldValue} resetFields={resetFields} submit={submit}/>
                </Form>
            </div>
        </div>
  )
}
