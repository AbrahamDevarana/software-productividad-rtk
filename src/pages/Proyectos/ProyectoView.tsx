import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk,  } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'


import type { InputRef } from 'antd';
import { Avatar, Button, Collapse, Form, Input, Popconfirm, Space, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { Box } from '@/components/ui';

interface DataType {
    key: React.Key;
    titulo: string;
    participantes: any[]
    status: number;
    fecha: string | Date;
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

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { currentProyecto } = useAppSelector(state => state.proyectos)

    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '0',
            titulo: 'Acción 1',
            participantes: ['Participante 1', 'Participante 2'],
            status: 1,
            fecha: '2021-01-01'
        },
        {
            key: '1',
            titulo: 'Acción 2',
            participantes: ['Participante 1', 'Participante 2'],
            status: 1,
            fecha: '2021-01-01'
        },

    ]);

    useEffect(() => {
      if(id) {
        dispatch(getProyectoThunk(id))
      }
    
      return () => {
        dispatch(clearProyectoThunk())
      }
    }, [id])


    const defaultColumns = [
        {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'nombre',
            editable: true,
        },
        {
            title: 'Participantes',
            dataIndex: 'participantes',
            key: 'participantes',
            editable: true,
            inputType: 'avatar',
            render: (participantes: any[]) => (
                <Space size="middle">
                    {participantes.map((participante: any) => (
                        <Avatar key={participante}>{participante}</Avatar>
                    ))}
                </Space>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            inputType: 'dropdown',
            editable: true,
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            inputType: 'rangepicker',
            editable: true,
        },
    ]

    const handleSave = () => {}

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
        const inputRef = useRef<InputRef>(null);
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
                    inputType === 'text' ? (<Input ref={inputRef} onPressEnter={save} onBlur={save} />) : 
                    inputType === 'avatar' ? (<Input ref={inputRef} onPressEnter={save} onBlur={save} />) :
                    inputType === 'dropdown' ? (<Input ref={inputRef} onPressEnter={save} onBlur={save} />) :
                    inputType === 'rangepicker' ? (<Input ref={inputRef} onPressEnter={save} onBlur={save} />) : 
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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


    return (
        <>
            <Box className='mb-16'>
                <Collapse 
                    collapsible='header' 
                    defaultActiveKey={[0]}
                    ghost
                >
                    <Panel 
                        header={` Hito 1 del proyecto ${currentProyecto?.titulo}`} key={0}>
                        <Table 
                            components={components}
                            columns={columns as ColumnTypes}
                            bordered
                            dataSource={dataSource}
                            pagination={false}
                            rowClassName="editable-row"
                        />
                    </Panel>

                </Collapse>
            </Box>

        </>
    )
}
