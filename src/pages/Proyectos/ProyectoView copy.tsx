import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk,  } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'


import type { SelectProps } from 'antd';
import { Avatar, Button, Collapse, DatePicker, Dropdown, Form, Input, Popconfirm, Select, Space, Table, Tooltip } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Box } from '@/components/ui';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { useMemo } from 'react';
import { UsuarioProps } from '@/interfaces';
import { useColor } from '../../hooks/useColor';
import dayjs from 'dayjs';

interface DataType {
    key: React.Key;
    titulo: string;
    participantes: any[]
    status: number;
    fechaFin: string | Date | null;
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


export const ProyectoView = () => {

    const EditableContext = React.createContext<FormInstance<any> | null>(null);

    const { Panel } = Collapse;
    const { RangePicker } = DatePicker;

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { currentProyecto } = useAppSelector(state => state.proyectos)
    const { usuarios } = useAppSelector(state => state.usuarios)

    useEffect(() => {
      if(id) {
        dispatch(getProyectoThunk(id))
      }

      dispatch(getUsuariosThunk({}))
    
      return () => {
        dispatch(clearProyectoThunk())
      }
    }, [id])

    const defaultColumns = [
        {
            title: 'Actividad',
            dataIndex: 'nombre',
            key: 'nombre',
            editable: true,
        },
        {
            title: 'Fecha de Cierre',
            dataIndex: 'fechaFin',
            key: 'fecha',
            inputType: 'rangepicker',
            editable: true,
            render: (fechaFin: string | Date | null) => (
                <div className='w-full text-center text-white'>
                    { fechaFin ? dayjs(fechaFin).format('DD/MM/YYYY') : 'Sin Fecha' }
                </div>
            )
        },
        {
            title: 'Responsables',
            dataIndex: 'participantes',
            key: 'participantes',
            editable: true,
            inputType: 'avatar',
            render: (participantes: any[]) => (
                participantes?.map((participante: any) => (
                    <Avatar key={participante}>AAG</Avatar>
                ))
            )
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
            )
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            inputType: 'dropdown',
            editable: true,
            render: (status: number) => (
                <div className='bg-red-500 w-full text-center text-white'>
                    Sin Iniciar
                </div>
            )
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
                rules={[
                    {
                    required: true,
                    message: `${title} is required.`,
                    },
                ]}
                >
                {
                    inputType === 'text' 
                    ?   (<Input ref={inputRef} onPressEnter={save} onBlur={save} />) 
                    :   inputType === 'avatar' 
                    ?   (<Select
                            defaultOpen={true}
                            ref={inputRef}
                            onChange={save}
                            defaultValue={record[dataIndex]}
                            style={{ width: '100%' }}
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
                            defaultValue={record[dataIndex]}
                            style={{ width: '100%' }}
                            bordered={false}
                            options={statusOptions}                            
                        /> ) 
                    :   inputType === 'rangepicker' 
                    ?   ( 
                            <DatePicker
                                defaultValue={dayjs('2021-01-01', 'YYYY-MM-DD')} 
                                format={'DD-MM-YYYY'}
                                ref={inputRef}
                                defaultOpen={true}
                                onChange={save}
                                style={{ width: '100%' }}
                                bordered={false}
                            />
                        ) 
                    :   <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
        <>
            <Box className='mb-16'>
                <Collapse 
                    collapsible='header' 
                    defaultActiveKey={[currentProyecto?.proyectos_hitos[0]?.id]}
                    ghost
                >
                    {
                        currentProyecto && currentProyecto.proyectos_hitos.map((hitos: any, index: number) => (
                            <Panel 
                                header={`${hitos.titulo}`} key={hitos.id}>
                                <Table 
                                    components={components}
                                    columns={columns as ColumnTypes}
                                    bordered
                                    dataSource={hitos.hitos_acciones || []}
                                    pagination={false}
                                    rowClassName="editable-row"
                                    rowKey={(record: any) => record.id}
                                />
                            </Panel>
                        ))
                    }

                </Collapse>
            </Box>

        </>
    )
}
