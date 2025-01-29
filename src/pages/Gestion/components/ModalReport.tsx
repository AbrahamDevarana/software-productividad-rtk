import { generarReporteRendimientoThunk } from '@/api'
import { Spinner } from '@/components/antd/Spinner'
import { useGetAreasQuery } from '@/redux/features/areas/areasThunks'
import { useGetDepartamentosQuery } from '@/redux/features/departamentos/departamentosThunks'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Checkbox, Modal, Select } from 'antd'
import React, { FC, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface ModalReportProps {
    modalReportVisible: boolean
    setModalReportVisible: (value: boolean) => void
}

interface ReportData {
    id: number
    departamentosIds: number[],
    sign: boolean,
    send: boolean
}

const initialValues = {
    id: 0,
    departamentosIds: [],
    sign: true,
    send: false
} as ReportData

export const ModalReport: FC<ModalReportProps> = ({modalReportVisible, setModalReportVisible}) => {

    const {quarter, year} = useAppSelector(state => state.global.currentConfig)

    const dispatch = useAppDispatch()

    const [reportData, setReportData] = useState<ReportData>(initialValues)
    const [selectedArea, setSelectedArea] = useState<number | undefined>(undefined)
    const [isDisabled, setDisabled] = useState(false)
    const { data, isLoading} = useGetAreasQuery({})
    const { data: departamentos, isLoading: isLoadingDepartamentos,  } = useGetDepartamentosQuery({areaId: reportData?.id }, { skip: !reportData?.id })
    
    const filteredDepartamentos = useMemo(() => departamentos?.rows.filter( departamento => departamento.isEvaluableDepartment), [departamentos])

    const onChangeArea = (value: number) => {
        setSelectedArea(value)
        setReportData({
            ...initialValues,
            id: value,
        })
    }

    const onCheckDepartamento = (e :any) => {
        setReportData({
            ...reportData!,
            departamentosIds: e
        })
    }

    const onSelectAllDepartamentos = (e: any) => {

        const { checked } = e.target

        const dataDepa = filteredDepartamentos?.map( departamento => departamento.id) || []
        
        setReportData({
            ...reportData!,
            departamentosIds: checked ? dataDepa : []
        })
    }

    


    const handleGenerateReport = async () => {
        setDisabled(true)
        toast.promise(
            dispatch(generarReporteRendimientoThunk({ ...reportData, year, quarter }))
                .unwrap() // Asegura que se maneje correctamente el error
                .then((data) => {
                    setReportData(initialValues);
                    selectedArea && setSelectedArea(undefined);
                    setDisabled(false);
                    return 'Reporte generado correctamente';
                })
                .catch((error) => {
                    setDisabled(false);
                    throw new Error('Error al generar el reporte'); // Forzar el error para que `toast.promise` lo detecte
                }),
            {
                loading: 'Generando reporte...',
                success: (message) => message, // `message` proviene del `then()`
                error: 'Error al generar el reporte'
            }
        );
    }
    
    return (
        <Modal
            destroyOnClose
            open={modalReportVisible}
            onCancel={() => setModalReportVisible(false)}
            title={<p className='text-devarana-midnight text-lg'>Generar Reporte</p>}
            width={1000}
            okText='Generar'
            okButtonProps={{
                className: 'rounded-full mr-2 bg-primary',
                disabled: !reportData?.departamentosIds.length || isDisabled
            }}
            cancelButtonProps={{
                className: 'rounded-full mr-2 bg-error-light text-white'
            }}
            onOk={handleGenerateReport}
        >
           <div className='p-5'>
           <p className='text-devarana-midnight text-lg'>
                Área
            </p>
            <Select
                    placeholder='Selecciona un área'
                    loading={isLoading}
                    onChange={onChangeArea}
                    className='w-full'
                    value={selectedArea}
                >
                    {
                        data?.rows.map( area => (
                            <Select.Option key={area.id} value={area.id}>
                                {area.nombre}
                            </Select.Option>
                        ))
                    }
                    
                </Select>

                {
                    isLoadingDepartamentos && <Spinner  height='200px'/>
                }

                {
                    selectedArea && filteredDepartamentos && ( 
                        <>
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-devarana-midnight text-lg py-5'>
                                Departamentos
                            </p>
                            <Checkbox
                                onChange={onSelectAllDepartamentos}
                                indeterminate={reportData?.departamentosIds.length > 0 && reportData?.departamentosIds.length < filteredDepartamentos?.length }
                                checked={reportData?.departamentosIds.length === filteredDepartamentos?.length}
                            >
                                Seleccionar todos
                            </Checkbox>
                        </div>

                        <Checkbox.Group onChange={onCheckDepartamento} value={reportData?.departamentosIds}>
                            {
                                filteredDepartamentos?.map( departamento => (
                                    <Checkbox key={departamento.id} value={departamento.id} checked={reportData?.departamentosIds.includes(departamento.id)} onChange={ onCheckDepartamento }>
                                        {departamento.nombre}
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>

                        <div className='py-10'>
                            <Checkbox
                                checked={reportData?.sign}
                                onChange={(e) => setReportData({
                                    ...reportData!,
                                    sign: e.target.checked
                                })}
                            >
                                Firmar
                            </Checkbox>

                            <Checkbox
                                checked={reportData?.send}
                                onChange={(e) => setReportData({
                                    ...reportData!,
                                    send: e.target.checked
                                })}
                            >
                                Enviar
                            </Checkbox>
                        </div>
                    </>
                    )
                }
           </div>
        </Modal>
    )
}
