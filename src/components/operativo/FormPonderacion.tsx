	import { OperativoProps } from '@/interfaces';
	import { useAppDispatch, useAppSelector } from '@/redux/hooks';
	import { Input, message } from 'antd'; // Import message from antd for alerts
	import { useState, useMemo } from 'react';
	import { Button } from '../ui';
	import { setPonderacionesThunk } from '@/redux/features/operativo/operativosThunk';

	interface Props {
	operativos: OperativoProps[];
	handleCancelPonderacion: () => void;
	}

	interface ResultItem {
		objetivoId: string;
		nombreObjetivo: string;
		progresoAsignado: number;
	}

	export const FormPonderacion = ({ operativos, handleCancelPonderacion}: Props) => {



	const { userAuth } = useAppSelector(state => state.auth);

	const dispatch = useAppDispatch();

	const initialPonderaciones = useMemo(() => {
		return operativos.reduce<ResultItem[]>((acc, objetivo) => {
		const usuario = objetivo.operativosResponsable.find(persona => persona.id === userAuth.id);

		if (usuario) {
			acc.push({
			objetivoId: objetivo.id,
			nombreObjetivo: objetivo.nombre,
			progresoAsignado: usuario.scoreCard.progresoAsignado,
			});
		}

		return acc;
		}, []);
	}, [operativos, userAuth]);

	const [ponderaciones, setPonderaciones] = useState(initialPonderaciones);

	const total = useMemo(() => {
		return ponderaciones.reduce((acc, ponderacion) => acc + ponderacion.progresoAsignado, 0);
	}, [ponderaciones]);

	const handleChange = (id: string, newValue: number) => {
		const updatedPonderaciones = ponderaciones.map(ponderacion =>
		ponderacion.objetivoId === id
			? { ...ponderacion, progresoAsignado: newValue }
			: ponderacion
		);

		const newTotal = updatedPonderaciones.reduce((acc, ponderacion) => acc + ponderacion.progresoAsignado, 0);

		if (newTotal > 100) {
			message.error({
				key: 'ponderacion',
				content: 'La suma de todas las ponderaciones no puede ser mayor al 100%'
			});
		return;
		}

		setPonderaciones(updatedPonderaciones);
	};

	const handleUpdate = () => {
		dispatch(setPonderacionesThunk({ ponderaciones, usuarioId: userAuth.id})).unwrap().then(() => {
			message.success({
				key: 'ponderacion',
				content: 'Ponderaciones actualizadas correctamente'
			});
			handleCancelPonderacion()
		})
	};


	const isActive = (objetivoId: string) => {

		const objetivo = operativos.find(objetivo => objetivo.id === objetivoId)

		if(!objetivo) return false

		const { status } = objetivo.operativosResponsable.find(responsable => responsable.id === userAuth.id)!.scoreCard

		return status

	}

	

	return (
		<div>
			<div className='text-center font-mulish pb-5'>
				<h1 className='text-2xl text-devarana-dark-graph'>Ponderación de Objetivos</h1>
				<p className='text-devarana-graph'>{total} / 100 %</p>
			</div>
			<div className='rounded-ext border mb-5'>
				<div className='from-primary to-primary-light bg-gradient-to-tr grid grid-cols-12 rounded-t-ext p-2'>
				<div className="col-span-10">
					<h3 className='text-white'>Objetivo</h3>
				</div>
				<div className="col-span-2">
					<h3 className='text-white'>Ponderación</h3>
				</div>
				</div>
				{ponderaciones.map(ponderacion => (
				<div key={ponderacion.objetivoId} className='grid grid-cols-12 p-2'>
					<div className="col-span-10">
					<p className='text-devarana-graph'>{ponderacion.nombreObjetivo}</p>
					</div>
					<div className="col-span-2">
					<Input
						type='number'
						min={0}
						max={100}
						value={ponderacion.progresoAsignado}
						onChange={e => handleChange(ponderacion.objetivoId, Number(e.target.value))}
						disabled={
							isActive(ponderacion.objetivoId) === 'CERRADO' 
							|| isActive(ponderacion.objetivoId) === 'PENDIENTE_APROBACION' 
							|| isActive(ponderacion.objetivoId) === 'PENDIENTE_AUTORIZAR' 
							// || isActive(ponderacion.objetivoId) === 'ABIERTO'
						}
					/>
					</div>
				</div>
				))}
			</div>
			<div className='flex justify-end'>
				<Button classColor='dark' classType='regular' width={100} onClick={handleUpdate}>Asignar</Button>
			</div>
		</div>
	);
	};
