import { Editor } from '@/components/ui'
import { useCreateMinutaMutation, useGetMinutaQuery, useGetMinutasQuery, useUpdateMinutaMutation } from '@/redux/features/minutas/minutasApi'
import { Input, Form, message } from 'antd'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { MinutasProps } from '@/interfaces'
import { Spinner } from '@/components/antd/Spinner'

interface Props {
    proyectoId: string
}

type minuteableType = "PROYECTO" | "OBJETIVO_OPERATIVO" | undefined;

export const Minutas = ({proyectoId}: Props) => {
    const [selectedMinuta, setSelectedMinuta] = useState<MinutasProps | null>(null)
    const [search, setSearch] = useState<string>('')

    const {data: minutas, isLoading} = useGetMinutasQuery({proyectoId})   
    const {data: minuta, isLoading: isMinutaLoading} = useGetMinutaQuery({id: selectedMinuta?.id}, {skip: !selectedMinuta})
    const [ createMinuta, {isLoading: isCreating, isSuccess: isCreated} ] = useCreateMinutaMutation() 
    const [ updateMinuta, {isLoading: isUpdating, isSuccess: isUpdated}] = useUpdateMinutaMutation()


    const [form] = Form.useForm();
    const {setFieldValue, getFieldValue, resetFields, submit} = form


    const handleOnSubmit = () => {
        if (!getFieldValue('title') || !getFieldValue('content')) {
            return message.error('Por favor, rellene todos los campos')
        }

       let query = {
            minuteableId: proyectoId,
            titulo: getFieldValue('title'),
            descripcion: getFieldValue('content'),
            fecha: new Date(),
            minuteableType: 'PROYECTO' as minuteableType,
       }

       if(selectedMinuta){
            updateMinuta({...query, id: selectedMinuta.id}).unwrap().then(() => (
                message.success('Minuta actualizada')
            )).catch(() => (
                message.error('Error al actualizar minuta')
            ))
       }else {
            createMinuta(query).unwrap().then(() => (
                message.success('Minuta creada')
            )).catch(() => (
                message.error('Error al crear minuta')
            ))
       }
    }
    

    const searchedMinuta = useMemo(() => {
        if (!search) return minutas

        // use regex to search for the search term in the title or description of the minuta even its not the exact word and has accents or special characters
        const regex = new RegExp(search.replace(/[^a-zA-Z0-9]/g, ''), 'i')
        return minutas?.filter(minuta => regex.test(minuta.titulo) || regex.test(minuta.descripcion))

    }, [search, minutas])
    
    const convertToPlainText = (html: string) => {
        html = html.replace(/\\par[d]?/g, "");
        html = html.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
        // remove all the special characters and html tags
        html = html.replace(/<[^>]*>/g, "");
        return html.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
    }

    return (
        <div className='grid grid-cols-12 gap-10'>
            <div className='col-span-3'>
                <Input placeholder='Buscar minuta' onChange={(e) => setSearch(e.target.value)} />
                <div className='pt-5 flex flex-col gap-5 h-screen overflow-y-auto pr-3'>
                    {
                        isLoading ? <div className='flex h-full w-full items-center align-middle justify-center'> <Spinner/> </div> :
                        searchedMinuta?.map((minuta, key) => (
                            <div key={key} 
                                onClick={() => setSelectedMinuta(minuta)} 
                                className={`border border-devarana-graph border-opacity-40 rounded-md px-5 pt-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20 cursor-pointer ${selectedMinuta?.id === minuta.id ? 'bg-devarana-graph bg-opacity-20' : ''}`}>
                                <h3 className='text-bold text-sm'>{minuta.titulo}</h3>
                                <p className='line-clamp-3 text-devarana-graph text-xs'>
                                    {convertToPlainText(minuta.descripcion).slice(0, 50)}...
                                </p>
                                <p className='text-right text-xs py-1 opacity-25'>{dayjs(minuta.fecha).diff(dayjs(), 'days')} días</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='col-span-9'>
                {
                    isMinutaLoading ? <div className='flex h-full w-full items-center align-middle justify-center'> <Spinner/> </div> :
                    <Form form={form}
                        key={minuta?.id}
                        initialValues={{ content: minuta?.descripcion, title: minuta?.titulo}}
                        onFinish={handleOnSubmit}
                    >
                        <Form.Item name='title'>
                            <label className='text-sm'>Título</label>
                            <Input name='title' id='title' placeholder='Título' defaultValue={minuta?.titulo} onChange={(e) => setFieldValue('title', e.target.value)} />
                        </Form.Item>

                        <Editor setFieldValue={setFieldValue} getFieldValue={getFieldValue} resetFields={resetFields} />
                        <button type='submit' className='bg-devarana-blue text-white px-5 py-2 my-3 rounded-md'>Guardar</button>
                    </Form>
                }
            </div>
        </div>
  )
}
