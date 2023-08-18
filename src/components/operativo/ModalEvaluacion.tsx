import { UsuarioProps } from "@/interfaces";
import { Avatar, Modal, Rate, Segmented, Space } from "antd";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";


interface Props {
    usuario: UsuarioProps
    visible: boolean
    handleCancel: () => void
}

const ModalEvaluacion = ({usuario, visible, handleCancel}: Props) => {

    const [activeEvaluate, setActiveEvaluate] = useState<string | number>('user1')

    const options = [
        {
        label: (
            <div style={{ padding: 4 }}>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                <div>Abraham</div>
            </div>
        ),
        value: 'user1',
        },
        {
        label: (
            <div style={{ padding: 4 }}>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                <div>Fatima</div>
            </div>
        ),
        value: 'user2',
        },
        {
        label: (
            <div style={{ padding: 4 }}>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                <div>Ximena</div>
            </div>
        ),
        value: 'user3',
        },
    ]
    
    return (
    <>
        <Modal
            open={visible}
            footer={null}
            width={800}
            closable={false}
            destroyOnClose={true}
            onCancel={handleCancel}
            title={  <h1 className='font-medium'> Evaluación competitiva </h1> }
        >
            <div>
                <div className="gap-5 grid">
                    <Space direction="vertical" align="center" size={12}>
                        <Segmented
                            options={options}
                            value={activeEvaluate}
                            onChange={setActiveEvaluate}

                        />
                    </Space>
                   <div className="border rounded-ext">
                        <table className="w-full">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="w-1/2">Competencia</th>
                                    <th className="w-1/2">Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="p-2">
                                    <td className="px-2">Competencia 1</td>
                                    <td>
                                        <Rate />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2">Competencia 2</td>
                                    <td>
                                        <Rate />
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td className="px-2">Competencia 3</td>
                                    <td>
                                        <Rate />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-2">Competencia 4</td>
                                    <td>
                                        <Rate />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
                </div>
            </div>
        </Modal>
    </> );
}
 
export default ModalEvaluacion;