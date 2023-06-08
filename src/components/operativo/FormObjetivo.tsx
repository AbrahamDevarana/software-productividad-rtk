import { FC, useEffect } from 'react'
import { OperativoProps } from '@/interfaces'
import { getTacticosThunk } from '@/redux/features/tacticos/tacticosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DatePicker, Form, Input, Select, Skeleton } from 'antd'
import dayjs, {Dayjs} from 'dayjs';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks'
import { createOperativoThunk, updateOperativoThunk } from '@/redux/features/operativo/operativosThunk'
import { Button } from '../ui'
import { useSelectUser } from '@/hooks/useSelectUser'


export const FormObjetivo = () => {

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { tacticos } = useAppSelector(state => state.tacticos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { userAuth } = useAppSelector(state => state.auth)
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)


    useEffect(() => {
        dispatch(getTacticosThunk({}))
        dispatch(getUsuariosThunk({}))
    }, [])

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    const handleOnSubmit = () => {
        const query =  {
            ...currentOperativo,
            ...form.getFieldsValue(),
            propietarioId: userAuth.id,
        }
        if(currentOperativo.id === ''){
            dispatch(createOperativoThunk(query))
        }else{
            dispatch(updateOperativoThunk(query))
        }
    }

    const disabledDate = ( current: Dayjs ) => {
        return (
            current && (
            current.endOf('quarter') > dayjs().endOf('quarter') ||
            current.startOf('quarter') < dayjs().startOf('quarter')
            )
        );
    };

    if ( isLoadingObjetivo ) return <Skeleton active paragraph={{  rows: 10 }} />

    return (
    <>

        <Form 
            onFinish={handleOnSubmit}
            noValidate 
            layout='vertical' 
            className='grid grid-cols-12 md:gap-x-10'
            initialValues={{
                ...currentOperativo,
                operativosResponsable: currentOperativo.operativosResponsable.map((item) => item.id),
            }}
            form={form}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                className='col-span-12'
                required
            >
                <Input name="nombre" />
            </Form.Item>
            <Form.Item
                label="Meta"
                name="meta"
                className='col-span-12'
                required
            >
                <TextArea name="meta" />
            </Form.Item>
            <Form.Item
                label="Indicador"
                name="indicador"
                className='col-span-12'
                required
            >
                <TextArea name="indicador" />
            </Form.Item>
            <Form.Item
                label="Fecha"
                className='col-span-6'
                required
            >
                <RangePicker 
                    disabledDate={disabledDate}
                    className='w-full' 
                    format="DD/MM/YYYY"
                    value={[dayjs(currentOperativo.fechaInicio), dayjs(currentOperativo.fechaFin)]}
                    onChange={ (dates, dateStrings) => {
                        form.setFieldValue('fechaInicio', dateStrings[0])
                        form.setFieldValue('fechaFin', dateStrings[1])
                    }}
                />
            </Form.Item>
            <Form.Item
                className='col-span-6'
                label="Objetivo Tactico"
                name="tacticoId"
                required
            >

                <Select 
                    onChange={ (value) => { form.setFieldValue('tacticoId', value)}} 
                >
                    {
                        tacticos.map(tactico => (
                            <Select.Option key={tactico.id} value={tactico.id}>{tactico.nombre}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item
                className=' col-span-6'
                label="Participantes"
                name="operativosResponsable"
            >
                <Select
                    mode="multiple"
                    tagRender={tagRender}
                    onChange={ (value) => { setSelectedUsers(value) } }
                    value={selectedUsers}
                    maxTagCount={3} style={{ width: '100%' }}
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

            
            <div className='flex justify-end col-span-12'>
                <Button 
                    classColor='primary' 
                    classType='regular' 
                    type='submit' 
                    width={150} 
                    className='btn-primary'
                    disabled={
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                        form.getFieldsValue().nombre === ''
                    }
                >Guardar</Button>
            </div>
        </Form>
    
    </>
  )
}
