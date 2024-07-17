import { Editor } from '@/components/ui'
import { useCreateMinutaMutation, useDeleteMinutaMutation, useGetMinutasQuery, useLazyGetMinutaQuery, useUpdateMinutaMutation } from '@/redux/features/minutas/minutasApi'
import { Input, Form, message, Popconfirm } from 'antd'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { MinutasProps } from '@/interfaces'
import { Spinner } from '@/components/antd/Spinner'
import { FaTrash } from 'react-icons/fa'
import { IoClose, IoCreate } from 'react-icons/io5'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { useGetTipTapTokenQuery } from '@/redux/features/tiptap/tiptapApi'
import { useAppSelector } from '@/redux/hooks'

interface Props {
    proyectoId: string
}

type minuteableType = "PROYECTO" | "OBJETIVO_OPERATIVO" | undefined;

export const Minutas = ({proyectoId}: Props) => {

    const {nombre, apellidoPaterno, id} = useAppSelector(state => state.auth.userAuth)
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [selectedMinuta, setSelectedMinuta] = useState<MinutasProps | null>(null)
    const [search, setSearch] = useState<string>('')
    const [showForm, setShowForm] = useState<boolean>(false)

    const {data: minutas, isLoading} = useGetMinutasQuery({proyectoId})   
    const [ getMinuta, {data: minuta, isLoading:isMinutaLoading}] = useLazyGetMinutaQuery()
    const [ createMinuta, {isLoading: isCreating, isSuccess: isCreated} ] = useCreateMinutaMutation() 
    const [ updateMinuta, {isLoading: isUpdating, isSuccess: isUpdated}] = useUpdateMinutaMutation()
    const [ deleteMinuta, {isLoading: isDeleting, isSuccess: isDeleted}] = useDeleteMinutaMutation()
    const { data: token} = useGetTipTapTokenQuery({})
    const [form] = Form.useForm();
    const {setFieldValue, getFieldValue, resetFields, submit} = form

    const handleOnUpdate = () => {
        if(!minuta) return
        let query = {
                minuteableId: proyectoId,
                titulo: getFieldValue('title'),
                descripcion: getFieldValue('content'),
                fecha: new Date(),
                minuteableType: 'PROYECTO' as minuteableType,
        }

        updateMinuta({...query, id: minuta.id}).unwrap().then(() => (
            setStatus('success')
        )).catch(() => {
            setStatus('error'),
            message.error('Error al actualizar minuta')
        }).finally(() => {
            setStatus('idle')
        })
       
    }

    const handleSelectMinuta = (minuta: MinutasProps) => {
        if (minuta) {
            provider?.destroy()
        } 
        getMinuta({id: minuta.id})
        setShowForm(true)
    }

    const handleOnDelete = async () => {
        if (!minuta) return
        
        await deleteMinuta({minuta}).unwrap().then(() => {
            message.success('Minuta eliminada')
            setSelectedMinuta(null)
            setShowForm(false)
        }).catch(() => {
            message.error('Error al eliminar minuta')
        })
    }

    const handleOnCreate = async() => {
       await createMinuta({
            minuteableId: proyectoId,
            minuteableType: 'PROYECTO' as minuteableType,
        }).unwrap().then((data) => {
            message.success('Minuta creada')
            setSelectedMinuta(data)
            setShowForm(true)
        }).catch(() => {
            message.error('Error al crear minuta')
        })
        
    }
    

    const searchedMinuta = useMemo(() => {
        if (!minutas) return []
        const sortedData = [...minutas].sort((a, b) => dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf());
        if (!search) return sortedData
        const regex = new RegExp(search.replace(/[^a-zA-Z0-9]/g, ''), 'i')
        const filtered =  sortedData?.filter(minuta => regex.test(minuta.titulo) || regex.test(minuta.descripcion))
        return filtered
    }, [search, minutas])
    
    const convertToPlainText = (html: string) => {
        if (!html) return ''
        html = html.replace(/\\par[d]?/g, "");
        html = html.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
        // remove all the special characters and html tags
        html = html.replace(/<[^>]*>/g, "");
        return html.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
    }


    const provider = useMemo(() => {

        if (!minuta || !token) return null
        
        return new TiptapCollabProvider({
            name: `minuta-${import.meta.env.VITE_TIP_TAP_ENV}-${minuta?.id}`,
            appId: import.meta.env.VITE_TIP_TAP_APP_ID, // Your app ID
            token: token, // Your app token
            // document: doc
        })
    }, [minuta])

    provider?.setAwarenessField('user', {
        name: `${nombre} ${apellidoPaterno}`,
        id: id
    })


    const getMinutaContent = ( content: string) => {
        setFieldValue('content', content)
    }


    return (
        <div className='grid grid-cols-12 gap-10'>
            <div className='col-span-3 overflow-hidden'>
                <Input placeholder='Buscar minuta' onChange={(e) => setSearch(e.target.value)} />
                <div className='pt-5 flex flex-col gap-5 overflow-y-auto pr-3' style={{
                    height: 'calc(100vh - 150px)'
                
                }}>
                    {
                        isLoading ? <div className='flex h-full w-full items-center align-middle justify-center'> <Spinner/> </div> :
                        searchedMinuta?.map((minuta, key) => (
                            <button key={key} 
                                disabled={isUpdating}
                                onClick={() => handleSelectMinuta(minuta)}
                                className={`border border-devarana-graph border-opacity-40 overflow-hidden rounded-md px-5 pt-2 hover:bg-devarana-graph transition-all duration-300 ease-in-out hover:bg-opacity-20 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer ${selectedMinuta?.id === minuta.id ? 'bg-devarana-graph bg-opacity-20' : ''}`}>
                                <h3 className='text-bold text-sm text-left'> {minuta.titulo ? minuta.titulo : 'Sin título'} </h3>
                                <p className='line-clamp-3 text-devarana-graph text-xs text-left'>
                                    {convertToPlainText(minuta.descripcion).slice(0, 50)}...
                                </p>
                                {/* humanize */}
                                <p className='text-right text-xs py-1 opacity-25'>{ dayjs(minuta.fecha).fromNow() }</p>
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='col-span-9 overflow-hidden'>
                {
                    showForm ? 
                    isMinutaLoading || isCreating ? <div className='flex h-full w-full items-center align-middle justify-center'> <Spinner/> </div> :
                    <div>
                        <div className='flex items-center justify-end'>
                            <button type='button' onClick={() => setShowForm(false)} className=' text-devarana-blue px-2 rounded-md'>
                                <IoClose size={18}/>
                            </button>
                            <button type='button' onClick={() => {
                                setSelectedMinuta(null)
                                setShowForm(true)
                            }} className='text-devarana-blue px-2 rounded-md '>
                                <IoCreate size={18}/>
                            </button>
                            <Popconfirm placement='bottomRight' title="¿Estás seguro de eliminar esta minuta?" onConfirm={handleOnDelete} okText="Si" cancelText="No" okButtonProps={{className: 'text-white bg-error-light'}} cancelButtonProps={{className: 'text-devarana-dark-graph'}}>
                                <button type='button' className='px-2'>
                                    <FaTrash className='text-error hover:opacity-70 transition-all duration-300 ease-in-out cursor-pointer' />
                                </button>
                            </Popconfirm>
                        </div>
                        
                        <Form
                            form={form}
                            key={minuta?.id}
                            initialValues={{ content: minuta?.descripcion, title: minuta?.titulo, id: minuta?.id}}
                            onFinish={
                                handleOnUpdate
                            }
                            layout='vertical'
                        >
                            <Form.Item name='title' label ="Título">
                                <div className='flex gap-x-3'>
                                    <Input name='title' id='title' placeholder='Título' defaultValue={minuta?.titulo} onChange={(e) => {
                                        setFieldValue('title', e.target.value)
                                    }} />
                                </div>
                            </Form.Item>
                            <Form.Item name="content" className="hidden" label="Contenido">
                                <Input id="content" name="content" type='hidden' placeholder="Contenido" defaultValue={minuta?.descripcion} onChange={(e) => setFieldValue('content', e.target.value)} />
                            </Form.Item>

                            { provider && (<Editor provider={provider} setFieldValue={setFieldValue} minutaId={minuta?.id} getMinutaContent={getMinutaContent} status = {status} />)}
                            <button type='submit' className='bg-devarana-blue text-white px-5 py-2 my-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'>Guardar</button>
                        </Form>
                    </div>
                    : (
                        <div className='flex flex-col h-full w-full items-center align-middle justify-center'>
                            <h1 className='text-devarana-graph text-lg'>Puedes crear una minuta nueva o seleccionar una ya existente</h1>
                            
                            <button
                                disabled={isCreating || isUpdating}
                                onClick={handleOnCreate}
                                className='bg-devarana-blue text-white px-5 py-2 my-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
                            >Crear nueva minuta</button>
                        </div>
                    )
                }
            </div>
        </div>
  )
}
