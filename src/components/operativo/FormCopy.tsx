import { Transfer, Tree } from 'antd'
import { DataNode } from 'antd/es/tree'
import React from 'react'

interface Props {
    objetivoId: string
}

export const FormCopy = ({ objetivoId }: Props) => {

	const resultadosClave = [ 
		{ key: '1', title: 'Resultados clave 1' },
		{ key: '2', title: 'Resultados clave 2', tasks: [
			{ key: '1', title: 'Tarea 1' },
			{ key: '2', title: 'Tarea 2' },
			{ key: '3', title: 'Tarea 3' },
		] },
	]

	const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) => selectedKeys.includes(eventKey);
	const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
	treeNodes.map(({ children, ...props }) => ({
		...props,
		disabled: checkedKeys.includes(props.key as string),
		tasks: generateTree(children, checkedKeys),
	}));


	const [ targetKeys, setTargetKeys ] = React.useState<string[]>([])
	const onChange = (nextTargetKeys: string[]) => {
		setTargetKeys(nextTargetKeys)
	}
	

	return (
		<>
			<div>
				<Transfer
					dataSource={resultadosClave}
					showSearch
					targetKeys={targetKeys}
					render={item => item.title}
					oneWay
					listStyle={{
						width: 300,
						height: 300,
					}}
				>
					{({ direction, onItemSelect, selectedKeys }) => {
						if (direction === 'left') {
							const checkedKeys = [...selectedKeys, ...targetKeys];
							return (
								<div>
									<Tree
										blockNode
										checkable
										checkStrictly
										defaultExpandAll
										checkedKeys={checkedKeys}
										treeData={generateTree(resultadosClave, targetKeys)}
										onCheck={(_, { node: { key } }) => {
										onItemSelect(key as string, !isChecked(checkedKeys, key));
										}}
										onSelect={(_, { node: { key } }) => {
										onItemSelect(key as string, !isChecked(checkedKeys, key));
										}}
									/>
								</div>
							)
						}
					}}

				</Transfer>
			</div>
		</>
	)
}
