import { FC, useEffect, useMemo } from 'react'
import { OperativoProps, TacticoProps } from '@/interfaces'
import { getTacticosThunk } from '@/redux/features/tacticos/tacticosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DatePicker, Divider, Form, Input, Select, Skeleton } from 'antd'
import dayjs, {Dayjs} from 'dayjs';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks'
import { createOperativoThunk, updateOperativoThunk } from '@/redux/features/operativo/operativosThunk'
import { Button } from '../ui'
import { useSelectUser } from '@/hooks/useSelectUser'

interface Props {
    year: number
    quarter: number
}

export const FormObjetivo = ({year, quarter}:Props) => {

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;

    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { tacticosGeneral } = useAppSelector(state => state.tacticos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { userAuth } = useAppSelector(state => state.auth)
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)


    useEffect(() => {
        dispatch(getTacticosThunk({ year }))
        dispatch(getUsuariosThunk({}))
    }, [])

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    const handleOnSubmit = () => {
        const query =  {
            ...currentOperativo,
            ...form.getFieldsValue(),
            propietarioId: userAuth.id,
            fechaInicio: dayjs(form.getFieldsValue().fecha[0]).format('YYYY-MM-DD'),
            fechaFin: dayjs(form.getFieldsValue().fecha[1]).format('YYYY-MM-DD'),
            quarter, year
        }

        if(currentOperativo.id === ''){
            dispatch(createOperativoThunk(query))
        }else{
            dispatch(updateOperativoThunk(query))
        }
    }

    const disabledDate = ( current: Dayjs ) => {
        return current.quarter() !== quarter
    };

    const options = useMemo(() => {
    //    agrupar tacticosGeneral en los que tengan estrategicoId y los que no, los que tengan estrategicoId se agrupan por su estrategico.nombre y los que no lo tienen se agrupan en core
        const estrategicos = tacticosGeneral.filter((tactico) => tactico.estrategicoId !== null)
        const core = tacticosGeneral.filter((tactico) => tactico.estrategicoId === null)

        // estrategicos[0].estrategico.nombre

        const estrategicosGroup = estrategicos.reduce((acc, tactico) => {
            const { estrategico } = tactico
            if(acc[estrategico.nombre]){
                acc[estrategico.nombre].push(tactico)
            }else{
                acc[estrategico.nombre] = [tactico]
            }
            return acc
        }
        , {} as any)

        const options = Object.keys(estrategicosGroup).map((estrategico) => {
            return {
                label: <p className='text-devarana-pink font-medium'>{estrategico}</p>,
                options: estrategicosGroup[estrategico].map((tactico: TacticoProps) => ({
                    label: <p className='text-devarana-graph'>{tactico.nombre}</p>,
                    value: tactico.id,
                    dataName: tactico.nombre
                }))
            }
        })
        return [
            ...options,
            {
                label: 'Core',
                options: core.map((tactico) => ({
                    label: <p className='text-devarana-graph'>{tactico.nombre}</p>,
                    value: tactico.id,
                    dataName: tactico.nombre
                }))
            },

           
        ]
    }, [tacticosGeneral])
    
    

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
                progresoAsignado: currentOperativo.operativosResponsable.find((item) => item.id === userAuth.id)?.scoreCard.progresoAsignado,
                fecha: [dayjs(currentOperativo.fechaInicio), dayjs(currentOperativo.fechaFin)],
            }}
            form={form}
        >
            <Form.Item
                label="Objetivo"
                name="nombre"
                className='col-span-12'
                required
            >
                <Input placeholder='Nombre del objetivo' bordered={false} />
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
                name="fecha"
            >
                <RangePicker 
                    disabledDate={disabledDate}
                    className='w-full' 
                    format="DD/MM/YYYY"
                />
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
                    // @ts-ignore
                    filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                >
                    {
                        usuarios.map(usuario => (
                            <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno}>{ spanUsuario(usuario) }</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
            
            <Form.Item
                className='col-span-6'
                label="Objetivo Tactico"
                name="tacticoId"
                required
            >
                {/* <Select >

                </Select>

                <Select>

                </Select> */}

                <Select
                    onChange={ (value) => { form.setFieldValue('tacticoId', value)}}
                    options={
                        tacticosGeneral.map((tactico) => ({
                            label: <p className='text-devarana-graph'>{tactico.nombre}</p>,
                            value: tactico.id,
                            dataName: tactico.nombre
                        }))
                    }
                />
                {/* <Select 
                    onChange={ (value) => { form.setFieldValue('tacticoId', value)}} options={options} showSearch
                    // @ts-ignore
                    filterOption={(input, option) => (option as DefaultOptionType)?.dataName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                >
                </Select> */}
            </Form.Item>

          
            <Divider className='col-span-12' />

            <Form.Item
                label="Progreso Asignado"
                name="progresoAsignado"
                className='col-span-6'
                required
            >
                <Input name="progresoAsignado" />
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
