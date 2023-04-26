import { HitosProps, ProyectosProps, UsuarioProps } from '@/interfaces'
import { updateHitoProyectoThunk } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Avatar, Collapse, DatePicker, Form, FormInstance, Input, Select, SelectProps, Table, } from 'antd'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs';

interface DataType extends HitosProps{
    key: React.Key;
    participantes: UsuarioProps[];
}
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
interface EditableRowProps {
    index: number;
}
interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof DataType;
    inputType: 'text' | 'avatar' | 'dropdown' | 'rangepicker' | 'datepicker' ;
    record: DataType;
    handleSave: (record: DataType) => void;
}

interface TableProyectosProps {
    currentProyecto: ProyectosProps
}



export const TableProyectos = ({currentProyecto}: TableProyectosProps) => {


    const { usuarios } = useAppSelector(state => state.usuarios)


    const EditableContext = React.createContext<FormInstance<any> | null>(null);
    
    const dispatch = useAppDispatch()
    const { Panel } = Collapse;
    const [form] = Form.useForm();

    const handleChangeHito = (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => {

        const { value } = e.target as HTMLInputElement

        if(value === hito.titulo) return
        if(!value) return e.currentTarget.focus()

        const query = {
            ...hito,
            titulo: value
        }

        dispatch(updateHitoProyectoThunk(query))
        

        
    };

   

    const defaultColumns = [
        {
            title: 'Actividad',
            dataIndex: 'nombre',
            key: 'nombre',
            editable: true,
            render: (nombre: string) => (
                <div className='w-full text-devarana-graph font-light py-1.5'>
                    { nombre }
                </div>
            ),
            width: '30%'
        },
        {
            title: 'Fecha de Cierre',
            dataIndex: 'fechaFin',
            key: 'fecha',
            inputType: 'rangepicker',
            editable: true,
            render: (fechaFin: string | Date | null) => (
                <div className='w-full '>
                    { fechaFin ? dayjs(fechaFin).format('DD/MM/YYYY') : <span className='text-devarana-graph font-light'>Seleccionar fecha</span> }
                </div>
            ),
            width: '20%'
        },
        {
            title: 'Responsables',
            dataIndex: 'participantes',
            key: 'participantes',
            editable: true,
            inputType: 'avatar',
            render: (participantes: any[]) => (
                <div className='w-full block'>
                    {
                        participantes?.length > 0? 
                            participantes.map((participante: any) => (
                            <Avatar key={participante}>AAG</Avatar>
                        ))
                        :
                        <span className='text-devarana-graph font-light'>Seleccionar participantes</span>
                    }
                </div>
            ),
            width: '20%'
        },
        {
            title: 'Avance',
            dataIndex: 'avance',
            key: 'fecha',
            inputType: 'text',
            render: (avance: number) => (
                <div className='bg-green-500 w-full text-center text-white'>
                    100%
                </div>
            ),
            width: '10%'
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            inputType: 'dropdown',
            editable: true,
            render: (status: number) => (
                <div className='w-full text-center text-white'>
                    <span className='bg-green-500 px-2 py-1 rounded-full'>
                        Activo
                        {/* {useColor(status).color} */}
                    </span>
                </div>

            ),
            width: '10%'
        },

    ]

    const handleSave = (record: ColumnTypes) => {
        console.log('save');
        console.log(record);
    }
    
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                inputType: col.inputType || 'text',
                handleSave,
            }),
        }
    });


    const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
          <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
              <tr {...props} />
            </EditableContext.Provider>
          </Form>
        );
    };
 
    const EditableCell: React.FC<EditableCellProps> = ({
        title,
        editable,
        children,
        inputType,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef<any>(null);
        const form = useContext(EditableContext)!;        
     
        useEffect(() => {
            if (editing) {
                inputRef.current!.focus();
            }
        }, [editing]);
      
        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };
        
      
        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };
      
        let childNode = children;

        if (editable) {            
                        
            
            childNode = editing ? (               
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                >
                {
                   
                    inputType === 'avatar' 
                    ?   (<Select
                            defaultOpen={true}
                            ref={inputRef}
                            onChange={save}
                            mode="multiple"
                            bordered={false}
                            tagRender={tagRender}
                            options={userOptions} 
                        />) 
                    :   inputType === 'dropdown' 
                    ?   ( <Select
                            ref={inputRef}
                            defaultOpen={true}
                            onChange={save}
                            bordered={false}
                            options={statusOptions}                            
                        /> ) 
                    :   inputType === 'rangepicker' 
                    ?   ( 
                            <DatePicker
                                format={'DD-MM-YYYY'}
                                ref={inputRef}
                                defaultOpen={true}
                                onChange={save}
                                bordered={false}
                            />
                        ) 
                    :   (<Input className='formInput' bordered={false} ref={inputRef} onPressEnter={save} onBlur={save} />) 
                }
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }
      
        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

        

    const statusOptions:SelectProps['options'] = [
        {
            label: 'Sin Iniciar',
            value: 1,
        },
        {
            label: 'En Proceso',
            value: 2
        },
        {
            label: 'Detenido',
            value: 3
        },
        {
            label: 'Finalizado',
            value: 4
        },
        {
            label: 'Cancelado',
            value: 5
        }

    ]

    const userOptions:SelectProps['options'] = useMemo(() => {
        return usuarios.map((usuario: UsuarioProps) => ({
            label: (<p> {usuario.nombre} {usuario.apellidoPaterno} </p>),
            value: usuario.id
        }))
    }, [usuarios])

    const tagRender = (props: any) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Avatar 
                key={value}
            >
                {label}
            </Avatar>
        );

    }

    return (
        <Collapse
            collapsible='header' 
            defaultActiveKey={currentProyecto.proyectos_hitos.map((hito: HitosProps) => hito.id)}
            ghost
        >
            {
                currentProyecto && currentProyecto.proyectos_hitos.map((hito: HitosProps, index: number) => (
                    <Panel 
                        header={
                            <Form 
                                onClick={ e => e.stopPropagation()}
                            >
                                <Input
                                    onBlur={ e => handleChangeHito(hito, e) } 
                                    defaultValue={hito.titulo} 
                                    onPressEnter={ (e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            e.currentTarget.blur()
                                        }
                                    }
                                    className='customInput'
                                    />
                            </Form>
                        } key={hito.id}>
                        <Table 
                            components={components}
                            scroll={{ x: 1000 }}
                            columns={columns as ColumnTypes}
                            bordered={false}
                            dataSource={hito.hitos_acciones || []}
                            pagination={false}
                            rowClassName="editable-row"
                            rowKey={(record: any) => record.id}
                        />
                    </Panel>
                ))
            }

        </Collapse>
    )
}
