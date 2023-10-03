import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearCurrentTacticoThunk, createTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Drawer, Input, Segmented, Select } from 'antd';
import { FormTactico } from '@/components/tacticos/FormTacticos';
import Equipos from './Equipos';
import { Button } from '@/components/ui';
import { FaBrush } from 'react-icons/fa';
import { statusTypes } from '@/types';
import Estrategia from './Estrategia';
import Core from './Core';
import { setCurrentConfig } from '@/helpers';

export const Tactico: React.FC = () => {

    const {slug} = useParams<{slug:string}>()

    const dispatch = useAppDispatch()
    const {currentTactico} = useAppSelector(state => state.tacticos)
    const [segmented, setSegmented] = useState<React.SetStateAction<any>>('listado')
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const { quarter, year } = useAppSelector(state => state.global.currentConfig)

    const [filter, setFilter] = useState({})

    setCurrentConfig()


    const handleCreateTactico = (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => {
        e.stopPropagation()
        e.preventDefault()
        
        dispatch(createTacticoThunk({slug, year: 2023, estrategico}))
    }

    const handleCloseDrawer = () => {
        setShowDrawer(false)
        dispatch(clearCurrentTacticoThunk())
    }
    

    return (
        <>
            <div className='flex w-full items-center pb-5'>
                <div className='max-w-lg w-full'>
                    <Segmented block
                        options={[
                            {label: 'Tácticos Estrategicos', value: 'listado'},
                            {label: 'Tácticos Core', value: 'core'},
                            {label: 'Tácticos por Equipos', value: 'equipos'},
                        ]}
                        value={segmented}
                        onChange={setSegmented}
                    />

                </div>
                <div className='gap-1 ml-auto items-center hidden'>
                 <Input
                        placeholder="Buscar"
                        allowClear
                        style={{ width: 200 }}
                        onChange={(e) => setFilter({...filter, search: e.target.value})}
                    />
                    <Select
                        allowClear
                        placeholder="Estatus"
                        mode='tags'
                        onChange={(value) => setFilter({...filter, status: value})}
                        maxLength={1}
                        maxTagCount={1}
                        style={{ width: 200 }}
                    >
                        
                        {
                           Object.entries(statusTypes).map(([key, value]) => (
                                <Select.Option key={key} value={key}>
                                    <p className='text-devarana-graph'>{value}</p>
                                </Select.Option>
                           ))
                        }
                    </Select>

                    <Select
                        allowClear
                        placeholder="Periodos"
                        mode='tags'
                        onChange={(value) => setFilter({...filter, periodos: value})}
                        maxTagCount={1}
                        style={{ width: 150 }}
                    >
                        
                        <Select.Option key={1} value={1}> <p className='text-devarana-graph'> Q1 </p></Select.Option>
                        <Select.Option key={2} value={2}> <p className='text-devarana-graph'> Q2 </p></Select.Option>
                        <Select.Option key={3} value={3}> <p className='text-devarana-graph'> Q3 </p></Select.Option>
                        <Select.Option key={4} value={4}> <p className='text-devarana-graph'> Q4 </p></Select.Option>

                    </Select>
                    <Button classType='regular' width={50} classColor='primary'><FaBrush/></Button>
                </div>
            </div>

            {
                // segmented === 'listado' && (<ListadoTacticos handleCreateTactico={handleCreateTactico} filter={filter} slug={slug} year={year} setShowDrawer={setShowDrawer} />)
                segmented === 'listado' && (<Estrategia handleCreateTactico={handleCreateTactico} filter={filter} slug={slug} setShowDrawer={setShowDrawer} />)
            }
            {
                segmented === 'equipos' && (<Equipos handleCreateTactico={handleCreateTactico} filter={filter} slug={slug} year={year} setShowDrawer={setShowDrawer} />)
            }
            {
                segmented === 'core' && ( <Core handleCreateTactico={handleCreateTactico} filter={filter} slug={slug} setShowDrawer={setShowDrawer} />)
            }
            

            <Drawer
                open={showDrawer}
                width={window.innerWidth > 1200 ? 700 : '100%'}
                destroyOnClose={true}
                onClose={() => handleCloseDrawer()}
                closable={false}
            >   

                {
                    currentTactico && <FormTactico handleCloseDrawer={handleCloseDrawer} year={year} slug={slug}/>
                }

            </Drawer>
        </>
    )
}
