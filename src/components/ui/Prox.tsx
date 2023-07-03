import { Progress } from 'antd';
import { getColor } from '@/helpers';

interface Props {
    avance: number
	size?: 'small' | 'default'
}

export const Prox = ({avance, size = 'default'}: Props) => {

	const sizeBar:[number, number] = size === 'small' ? [150, 15] : [250, 15]

	return (
		<div className='max-w-lg m-auto text-center w-full'>
			<p className={`text-devarana-pink font-bold ${size === 'small' ? 'text-lg' : 'text-2xl'}`}>Próximamente</p>
			<p className='text-devarana-dark-graph'> Estamos preparando esta sección, para que pronto esté disponible para ti. </p>
			<div className='py-5'>
				<Progress className='drop-shadow progressStyle' 
					percent={avance}
					strokeLinecap='square'
					rootClassName='block'
					strokeColor={{
						'0%': '#56739B',
						'100%': '#d64767',
						direction: 'to right',
					}}
					trailColor={getColor('SIN_INICIAR', .3).color}
					strokeWidth={20} 
				/>
			</div>
		</div>
	)
}
