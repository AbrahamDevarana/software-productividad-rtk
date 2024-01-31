import { useCopyOperativoMutation, useGetOperativoQuery } from '@/redux/features/operativo/operativosThunk'
import { DatePicker, Input, Spin, Transfer, Tree, message } from 'antd'
import { Key, useMemo, useState } from 'react'
import { Button } from '../ui'
import { Spinner } from '../antd/Spinner'
import dayjs from 'dayjs'
import { useAppSelector } from '@/redux/hooks'
import { useGetHistorialQuery } from '@/redux/features/perfil/perfilThunk'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface Props {
    objetivoId: string
}

export const FormCopy = ({ objetivoId }: Props) => {

	const [objetivoCopy, {isLoading: isCopying}] = useCopyOperativoMutation()

	
	const {data: objetivoOperativo, isLoading} = useGetOperativoQuery({ objetivoId }, { skip: !objetivoId })
	const { userAuth } = useAppSelector(state => state.auth)
	const { data: historialRendimiento, isLoading: isLoadingPeriodos} = useGetHistorialQuery({usuarioId: userAuth?.id})

	const resultadosClave = useMemo(() => {
		if (objetivoOperativo) {
			return objetivoOperativo.resultadosClave.map((resultadoClave) => ({
				key: resultadoClave.id,
				title: resultadoClave.nombre,
				children: resultadoClave.task.map((tarea) => ({
					key: tarea.id.toString(),
					title: tarea.nombre
				}))
			}))
		}else {
			return []
		}
	}, [objetivoOperativo])

	const [checkedNodes, setCheckedNodes] = useState<Key[]>([]);
	const [leftCheckedKeys, setLeftCheckedKeys] = useState<Key[]>([]);
	const [targetNodes, setTargetNodes] = useState<any[]>([]);

	const [nuevoObjetivo, setNuevoObjetivo] = useState<any>({
		fecha: undefined,
		nombre: ''
	})

	const renderTreeNodes = (data: Array<{ key: string, title: string, children?: any[] }>) =>
	  data.map((item) =>
		item.children ? (
		  <Tree.TreeNode title={item.title} key={item.key}>
			{renderTreeNodes(item.children)}
		  </Tree.TreeNode>
		) : (
		  <Tree.TreeNode {...item} />
		)
	);
	
	const filterTree = (checked: Key[], halfChecked: Key[], rootNode: any) =>
	  rootNode
		? rootNode
			.filter((node:any)=> checked.includes(node.key) || halfChecked.includes(node.key))
			.map((nodeRoot:any) => ({
			  ...nodeRoot,
			  children: filterTree(checked, halfChecked, nodeRoot.children)
			}))
	: [];

	const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) => selectedKeys.includes(eventKey);
	
	const handleSubmitCopy = async () => {

		if(!nuevoObjetivo.fecha) return message.error('Selecciona una periodo')

		const newYear = dayjs(nuevoObjetivo.fecha).year()
		const newQuarter = dayjs(nuevoObjetivo.fecha).quarter()

		const query = {
			nombre: nuevoObjetivo.nombre ? nuevoObjetivo.nombre : objetivoOperativo?.nombre,
			objetivoOperativoId: objetivoId,
			oldYear: objetivoOperativo?.year,
			oldQuarter: objetivoOperativo?.quarter,
			newYear: newYear,
			newQuarter: newQuarter,
			resultadosClave: targetNodes.map((resultadoClave) => ({
				id: resultadoClave.key,
				tasks: resultadoClave.children.map((tarea: any) => tarea.key)
			}))
		}

		
		await objetivoCopy(query)
		

		
		
	}
	
	const handleRemove = (keys: string[]) => {

		// Función para eliminar elementos del arrayInicial que coincidan con el arrayBusqueda
		const filtrarArray = (targetNodes: any[], keys: string[]) => {
			return targetNodes.map(item => {
			// Si es un elemento con children, llamamos recursivamente a la función para filtrar los children
			if (item.children && item.children.length > 0) {
				item.children = filtrarArray(item.children, keys);
			}
				
			// Filtramos el array actual eliminando los elementos que coincidan con el keys
			return !keys.includes(item.key) ? item : null;
			}).filter(Boolean); // Eliminamos los elementos nulos generados por el filter anterior
		};
	
		const arrayResultado = filtrarArray(targetNodes, keys);
		setTargetNodes(arrayResultado);
		
	}


	if(isLoading || isLoadingPeriodos) return <div className='min-h-[500px] flex items-center justify-center'><Spinner  /></div>

	return (
		<>
			<div className='py-6'>
				<div className='flex gap-10 justify-between'>
					<div>
						<p className='text-devarana-graph'>Objetivo</p>
						<h1 className='text-2xl text-devarana-dark-graph'>
							{objetivoOperativo?.nombre}
						</h1>
						<p className='text-devarana-dark-graph'>
							{objetivoOperativo?.year} - Q{objetivoOperativo?.quarter}
						</p>
					</div>
					<div className='flex flex-col gap-y-2'>
						<p className='text-devarana-dark-graph'> Nuevo Objetivo </p>
						<Input defaultValue={objetivoOperativo?.nombre} 
							onChange={(e) => setNuevoObjetivo({
								...nuevoObjetivo,
								nombre: e.target.value
							})}
							onFocus={(e) => { e.currentTarget.select() }}
						/>
						<DatePicker
							style={{ width: '250px' }}			
							picker='quarter'
							placeholder='Selecciona un periodo'
							disabledDate={(current) => {

								const dateExists = historialRendimiento?.some(date => {
									return date.year === current.year() && date.quarter === Math.floor((current.month() + 3) / 3);
								});
							
								if (!dateExists) {
									return true; // Deshabilitar fechas no presentes en el array
								}
							
								const currentDate = historialRendimiento?.find(date => {
									return date.year === current.year() && date.quarter === Math.floor((current.month() + 3) / 3);
								});
							
								return currentDate?.status === "CERRADO";
							}}
							onChange={(date) => setNuevoObjetivo({
								...nuevoObjetivo,
								fecha: date
							})}
						/>
					</div>
				</div>
				<Transfer
					
					className='w-full py-5 tree-transfer min-h-[500px]'
					dataSource={resultadosClave}
					showSelectAll={false}
					titles={['Objetivo', 'Nuevo Objetivo']}
					targetKeys={targetNodes.map(({ key }) => key)}
					render={(item) => item.title}
					onChange={(_, direction, moveKeys) => {
						if (direction === 'right') {
							setLeftCheckedKeys([]);
							setTargetNodes(checkedNodes);
							
						} else {
							handleRemove(moveKeys);	
						}
					}}
					locale={{
						itemsUnit: 'Objetivos',
					}}
				>

				{ ({ direction, onItemSelect, selectedKeys, onItemSelectAll}) => {
					if (direction === 'left')  { 
						return (
						<Tree
							treeData={resultadosClave}
							showLine
							blockNode
							checkable
							defaultExpandAll
							checkedKeys={leftCheckedKeys}
							onCheck={(selectedKeys, { node: {key}, halfCheckedKeys}) => {
								setLeftCheckedKeys((selectedKeys as Key[]));
								const filteredTree = filterTree(
									selectedKeys as Key[],
									halfCheckedKeys as Key[],
									resultadosClave
								);
								setCheckedNodes(filteredTree);								
								onItemSelect(key as string, !isChecked(leftCheckedKeys, key));	
							}}
						/>
						)
					} else { 
					return (
						<Tree
							treeData={targetNodes}
							defaultExpandAll
							blockNode
							checkable
							checkStrictly
							onCheck={(selectedKeys, { node: {key}, halfCheckedKeys}) => {
								onItemSelect(key as string, !isChecked(leftCheckedKeys, key));						
							}}
						/>
					)}}}

				</Transfer>
				<div className='justify-end flex'>
					<Button 
						classColor='primary' 
						width={150} 
						classType='regular' 
						onClick={handleSubmitCopy}
						disabled={targetNodes.length === 0 || isCopying}
					>
						{ isCopying ? <AiOutlineLoading3Quarters size={20} className='text-white animate-spin' /> : 'Copiar'}
					</Button>
				</div>
			</div>
		</>
	)
}
