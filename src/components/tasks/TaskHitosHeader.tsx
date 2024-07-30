import { HitosProps } from "@/interfaces"
import { ColorPicker, Form, Input, Popconfirm, Popover, Tooltip } from "antd"
import { BiTrash } from "react-icons/bi"
import { BsThreeDots } from "react-icons/bs"
import { FaCopy } from "react-icons/fa"

interface Props {
    record: HitosProps
    handleDeleteHito: (hito: HitosProps) => void
    handleChangeHito: (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => void
    handleChangeColor: (hito: HitosProps, color: string) => void
    isClosed?: boolean
}

export const taskHitosHeader = ({ record, handleDeleteHito, handleChangeHito, handleChangeColor, isClosed }: Props) => (
    <div className='flex items-center gap-x-5' onClick={e => e.stopPropagation()}>
        <Form
            layout='vertical'
            className='w-full'
            onClick={ e => e.stopPropagation()}
            initialValues={{
                titulo: record.titulo
            }}
        >
            <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Sección</p>
            <Form.Item
                name='titulo'
                className='mb-0'
                >
                <Input
                    style={{
                        color: record.color
                    }}
                    className="rs-input border-none bg-transparent hover:bg-white hover:drop-shadow-sm font-medium text-lg disabled:bg-transparent"
                    onBlur={ e => handleChangeHito(record, e) } 
                    name='titulo'
                    onPressEnter={ (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            e.currentTarget.blur()
                        }
                    }
                />
            </Form.Item>
        </Form>
        <div className='flex items-center'>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Color</p>
                <ColorPicker onChange={(color) => handleChangeColor(record, color.toHexString())} defaultValue={record.color} />
            </div>
        </div>
        <div className='flex flex-col items-center' onClick={e => e.stopPropagation()}>
        <Popover
            trigger="click"
            content={<div className='flex gap-x-5'>
                <Tooltip title="Duplicar Sección">
                    <Popconfirm
                        disabled={isClosed}
                        title="¿Estas seguro de duplicar esta sección?"
                        // onConfirm={ () => handleDupliateResultado( resultado.id )}
                        onCancel={() => {}}
                        okText="Si"
                        cancelText="No"
                        placement="left"
                        okButtonProps={{
                            className: 'rounded-full mr-2 bg-primary'
                        }}
                        cancelButtonProps={{
                            className: 'rounded-full mr-2 bg-error-light text-white'
                        }}

                    >
                        <FaCopy className='text-default text-right hover:text-dark-light text-lg cursor-pointer' />
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Eliminar Sección" >
                    <Popconfirm
                        title="¿Estás seguro de eliminar esta Sección?"
                            onConfirm={() => handleDeleteHito(record)}
                            onCancel={() => {}}
                            okText="Si"
                            cancelText="No"
                            placement="left"
                            okButtonProps={{
                                className: 'rounded-full mr-2 bg-primary'
                            }}
                            cancelButtonProps={{
                                className: 'rounded-full mr-2 bg-error-light text-white'
                            }}
                        >
                            <BiTrash className='text-default text-right hover:text-error-light text-xl cursor-pointer' />
                            
                        </Popconfirm>        
                    </Tooltip> 
            </div>}
        >
            <BsThreeDots className='text-devarana-babyblue text-2xl cursor-pointer' />
        </Popover>
        
        </div>
    </div>
)