import { ErrorMessage, Formik } from 'formik'
import { Button } from '@/components/ui'

import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearCurrentAreaThunk, createAreaThunk, updateAreaThunk } from '@/redux/features/admin/areas/areasThunks';
import { ModalProps } from '@/interfaces/modal';
import { useEffect } from 'react';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { Alert, Modal, Select, Input, Form } from 'antd'


export const FormAreas = ({visible, handleModal} : ModalProps ) => {

    const dispatch = useAppDispatch();
    
    const { currentArea } = useAppSelector((state: any) => state.areas)
    const { areas } = useAppSelector((state: any) => state.areas)
    const { usuarios } = useAppSelector((state: any) => state.usuarios)

    const handleOnSubmit = (values: any) => {       

        if (currentArea.id) {
            dispatch(updateAreaThunk(values))
        }else {
            dispatch(createAreaThunk(values))
        }
        handleCancel()
    } 

    const handleCancel = () => {
        handleModal(false)
        dispatch(clearCurrentAreaThunk())
    }    

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

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
                            currentArea.id ? 'Editar Área' : 'Crear Área'
                        }
                    </h1>
                    <Formik
                        initialValues={currentArea}
                        onSubmit={ (values) => handleOnSubmit(values) }
                        validationSchema={Yup.object({
                            nombre: Yup.string().required("El nombre es requerido"),
                        })}
                        enableReinitialize={true}

                    >
                        {
                            ({ values, handleChange, handleBlur, handleSubmit, validateForm }) => (
                                <Form onFinish={handleSubmit} noValidate layout='vertical'>
                                    <div className='flex pt-4 flex-col gap-y-2'>
                                        <Form.Item
                                            label="Nombre del área"
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
                                            label="Lider de área"
                                        >
                                            <Select
                                                showSearch
                                                onChange={ (value) => handleChange({target: {name: 'leaderId', value}}) }
                                                value={values.leaderId}
                                                placeholder="Selecciona una opción"
                                                allowClear
                                            >
                                                {
                                                    usuarios.map((usuario: any) => (
                                                        <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Área padre"
                                        >
                                            <Select
                                                showSearch
                                                onChange={ (value) => handleChange({target: {name: 'parentId', value}}) }
                                                value={values.parentId}
                                                placeholder="Selecciona una opción"
                                                allowClear

                                            >
                                                {
                                                    areas.map((area: any) => (
                                                        <Select.Option key={area.id} value={area.id}>{area.nombre}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className='py-4'>
                                        <Button btnType="secondary" type="submit" className="mr-2"> { currentArea.id ? 'Editar' : 'Crear' } </Button>
                                    </div>

                                </Form>
                        )}
                    </Formik>
            </div>
        </Modal>
    )
}
