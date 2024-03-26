import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Drawer, Input, Segmented, Select } from 'antd';
import { FormTactico } from '@/components/tacticos/FormTacticos';
import Equipos from './Equipos';
import { Button } from '@/components/ui';
import { FaBrush } from 'react-icons/fa';
import { statusTypes } from '@/types';
import Estrategia from './Estrategicos';
import Core from './Core';
import { CoreProps, TacticoProps } from '@/interfaces';


export const Tactico: React.FC = () => {

    const {slug} = useParams<{slug:string}>()
    const [activeTactico, setActiveTactico] = useState<TacticoProps | CoreProps>()
    
    const [segmented, setSegmented] = useState<React.SetStateAction<any>>('equipos')
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const { year } = useAppSelector(state => state.global.currentConfig)


    const [filter, setFilter] = useState({})

    const handleCreateTactico = (e: React.MouseEvent<HTMLButtonElement>) => {
        // dispatch(createTacticoThunk({ year}))
    }

    const handleCloseDrawer = () => {
        setShowDrawer(false)
    }
    

    return (
        <>
            <div className='flex w-full items-center pb-5'>
                <div className='max-w-3xl w-full'>
                    <Segmented block
                        options={[
                            {label: 'Tácticos por Departamento', value: 'equipos'},
                            {label: 'Tácticos Estrategicos', value: 'listado'},
                            {label: 'Tácticos Core', value: 'core'},
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
                segmented === 'listado' && (<Estrategia slug={slug} setShowDrawer={setShowDrawer} setActiveTactico={setActiveTactico }/>)
            }
            {
                segmented === 'equipos' && (<Equipos handleCreateTactico={handleCreateTactico} slug={slug} setShowDrawer={setShowDrawer} setActiveTactico={setActiveTactico }/>)
            }
            {
                segmented === 'core' && ( <Core slug={slug} setShowDrawer={setShowDrawer} setActiveTactico={setActiveTactico }/>)
            }
            

            <Drawer
                open={showDrawer}
                width={window.innerWidth > 1200 ? 700 : '100%'}
                destroyOnClose={true}
                onClose={() => handleCloseDrawer()}
                closable={false}
                className='rounded-l-ext'
            >   

                {
                    activeTactico && <FormTactico handleCloseDrawer={handleCloseDrawer} year={year} slug={slug} activeTactico={activeTactico}/>
                }

            </Drawer>
        </>
    )
}
