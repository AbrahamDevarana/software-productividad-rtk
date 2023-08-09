import { useSelectUser } from '@/hooks/useSelectUser'
import { UsuarioProps } from '@/interfaces'
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks'
import { updateResultadoThunk } from '@/redux/features/resultados/resultadosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd'
import { useEffect, useMemo } from 'react'
import { BsFillCalendarFill } from 'react-icons/bs'
import dayjs from 'dayjs'


export const FormResultados = () => {

    const dispatch = useAppDispatch()
    const { currentResultadoClave  } = useAppSelector(state => state.resultados)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const [form] = Form.useForm()

    const { tagRender, spanUsuario} = useSelectUser(usuarios)


    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

    const handleOnSubmit = () => {

        const query = {
            ...currentResultadoClave,
            ...form.getFieldsValue(),
        }
        dispatch(updateResultadoThunk(query))
    }

    const isVisible = useMemo(() => {
        return currentResultadoClave.tipoProgreso === 'progreso'
    }, [currentResultadoClave])

    return (
    <>
        <Form 
            form={form}
            onBlur={handleOnSubmit}
            layout='vertical' 
            className='grid grid-cols-12 md:gap-x-10 w-full'
            initialValues={{
                ...currentResultadoClave,
                propietarioId: currentResultadoClave.propietarioId,
                fechaInicio: dayjs(currentResultadoClave.fechaInicio),
                fechaFin: dayjs(currentResultadoClave.fechaFin)
            }}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                className='col-span-12'
                required
            >
                <Input />
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
                label="Tipo de progreso"
                name="tipoProgreso"
                className='col-span-12'
                required
            >
                <Radio.Group onChange={handleOnSubmit}>
                    <Radio value="progreso">Progreso</Radio>
                    <Radio value="acciones">Acciones</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                    label="Progreso"
                    name="progreso"
                    className='col-span-12'
                    hidden={!isVisible}
                >
                    <Input/>
            </Form.Item>
        </Form>
    
    </>
  )
}
