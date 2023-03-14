import { Alert, Modal, Select, Input, Form } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { Button } from '@/components/ui'

import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearCurrentDepartamentoThunk, createDepartamentoThunk, updateDepartamentoThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { ModalProps } from '@/interfaces/modal';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { useEffect } from 'react';


export const FormDepartamentos = ({visible, handleModal} : ModalProps ) => {

    const dispatch = useAppDispatch();
    
    const { currentDepartamento } = useAppSelector((state: any) => state.departamentos)
    const { areas } = useAppSelector((state: any) => state.areas)       

    useEffect(() => {
        dispatch(getAreasThunk({}))

        return () => {dispatch(clearCurrentDepartamentoThunk())}
    }, [dispatch])


    const handleOnSubmit = async (values: any) => {       
        if (currentDepartamento.id) {
            dispatch(updateDepartamentoThunk(values))
        }else {
            dispatch(createDepartamentoThunk(values))
        }
        handleCancel()
    } 

    const handleCancel = () => {
        handleModal(false)
        dispatch(clearCurrentDepartamentoThunk())
    }    


    return (
        <Modal 
            open={visible}
            onCancel={ handleCancel }
            destroyOnClose={true}
            width={700}
            footer={null}
        >
            <div className='animate__animated animate__fadeIn animate__faster'>
                    <h1 className='pb-3'>
                        {
                            currentDepartamento.id ? 'Editar Departamento' : 'Crear Departamento'
                        }
                    </h1>
                    <Formik
                        initialValues={currentDepartamento}
                        onSubmit={ (values) => handleOnSubmit(values) }
                        validationSchema={Yup.object({
                            nombre: Yup.string().required("El nombre es requerido"),
                            areaId: Yup.string().required("El departamento es requerido"),
                        })}
                        enableReinitialize={true}

                    >
                        {
                            ({ values, handleChange, handleBlur, handleSubmit, validateForm }) => (
                                <Form onFinish={handleSubmit} noValidate layout='vertical'>
                                    <div className='flex pt-4 flex-col gap-y-2'>
                                        <Form.Item
                                            label="Nombre"
                                            >
                                            <Input
                                                value={values.nombre}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="nombre"
                                                
                                            />
                                            <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Departamento"
                                        >
                                            <Select
                                                showSearch
                                                onChange={ (value) => handleChange({target: {name: 'areaId', value}}) }
                                                value={values.areaId}
                                                placeholder="Selecciona una opción"
                                                allowClear
                                                
                                            >
                                                {
                                                    areas.map((area: any) => (
                                                        <Select.Option key={area.id} value={area.id}>{area.nombre}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            <ErrorMessage name="areaId" render={msg => <Alert type="error" message={msg} showIcon />} />
                                        </Form.Item>
                                    </div>
                                    <div className='py-4'>
                                        <Button btnType="secondary" type="submit" className="mr-2"> { currentDepartamento.id ? 'Editar' : 'Crear' } </Button>
                                    </div>

                                </Form>
                        )}
                    </Formik>
            </div>
        </Modal>
    )
}
