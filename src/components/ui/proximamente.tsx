import { getColor } from '@/helpers';
import { Progress } from 'antd';

interface Props {
    avance: number
	size?: 'small' | 'default'
}

export const Proximamente = ({avance, size = 'default'}: Props) => {

	const sizeBar:[number, number] = size === 'small' ? [150, 25] : [250, 25]

	return (
		<div className='max-w-lg m-auto text-center w-full'>
			<p className={`text-devarana-pink font-bold uppercase ${size === 'small' ? 'text-lg' : 'text-2xl'}`}>Próximamente</p>
			<p className='text-devarana-dark-graph'> Estamos preparando esta sección, para que pronto esté disponible para ti. </p>
			<div className='py-5'>
				<Progress className='drop-shadow progressStyle' 
					percent={avance}
					rootClassName='block'
					size={sizeBar}
					strokeColor={{
						'0%': getColor('EN_PROGRESO').lowColor,
						'100%': getColor('EN_PROGRESO', .8).color,
						direction: 'to top',
					}}
					trailColor={getColor('SIN_INICIAR', .2).color}
				
				/>
			</div>
		</div>
	)
}
