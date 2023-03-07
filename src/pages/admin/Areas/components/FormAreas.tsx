import { Alert, Modal, Select } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { Box, Button, Input } from '../../../../components/ui'
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { createAreaThunk, updateAreaThunk } from '../../../../redux/features/admin/areas/areasThunks';
import { ModalProps } from '../../../../interfaces/modal';
import { ModalFooter } from '../../../../components/ModalFooter';


export const FormAreas = ({visible, handleModal} : ModalProps ) => {

    const dispatch = useAppDispatch();
    
    const { currentArea, errorMessage } = useAppSelector((state: any) => state.areas)
    const { areas } = useAppSelector((state: any) => state.areas)

    const handleOnSubmit = (values: any) => {

        console.log(values);
        
        
        // if (currentArea.id) {
        //     dispatch(updateAreaThunk(values))
        // } else {
        //     dispatch(createAreaThunk(values))
        //     values.nombre = ''
        //     values.descripcion = ''
        // }       
        // handleModal(false) 
    }

    console.log(currentArea);
    

    const handleCancel = () => {
        handleModal(false)
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
                            currentArea.id ? 'Editar Área' : 'Crear Área'
                        }
                    </h1>
                    <Formik
                        initialValues={currentArea}
                        onSubmit={ handleOnSubmit }
                        validationSchema={Yup.object({
                            nombre: Yup.string().required("El nombre es requerido"),
                            parentId: Yup.number(),
                        })}
                        enableReinitialize={true}

                    >
                        {
                            ({ values, handleChange, handleBlur, handleSubmit, validateForm }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className='flex pt-4 flex-col gap-y-10'>
                                        <div>
                                            <Input
                                                title="Nombre"
                                                inputName="nombre"
                                                value={values.nombre}
                                                fn={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                        </div>
                                        <div>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Selecciona un área"
                                                onChange={(value: any) => { values.parentId = value }}
                                                filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                defaultValue={currentArea.parentId}
                                            >
                                                <Select.Option value={null}>Ninguna</Select.Option>
                                                {
                                                    areas.map((area: any) => (
                                                        <Select.Option key={area.id} value={area.id}>{area.nombre}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='py-4'>
                                        <Button btnType="secondary" fn={ () => { validateForm().then((values) => (Object.keys(values).length === 0) ?? handleSubmit() )} }  type="submit" className="mr-2"> { currentArea.id ? 'Editar' : 'Crear' } </Button>
                                    </div>

                                </form>
                        )}
                    </Formik>
            </div>
        </Modal>
    )
}
