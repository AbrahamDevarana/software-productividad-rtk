import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

interface Props {
	values: number[]
	quarter: number
	year: number
}

const MixedChart = ({values, quarter, year}:Props) => {

	const [chartWidth, setChartWidth] = useState(200);
	const chartRef = useRef(null);

    ChartJS.register(
        CategoryScale,
		ChartDataLabels,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );


	  const ctx = document.createElement('canvas').getContext('2d');
	  if (!ctx) return <></>;

    const gradient = ctx.createLinearGradient(0, 0, chartWidth, 0);
    gradient.addColorStop(0, '#0967C9');
    gradient.addColorStop(1, '#0967C9');
    
	
	const updateChartWidth = () => {
		const chartContainer = document.querySelector('.barBox');

		if (chartContainer) {
			const chartContainerWidth = chartContainer.clientWidth;
			setChartWidth(chartContainerWidth);
		}
	}


	  useEffect(() => {
		  ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

      // on window resize, update the chart width
		const handleResize = () => {
			updateChartWidth();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};


	  }, [values, year])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
			datalabels: {
				display: true,
				color: 'white', // Esto establecerá el color del texto de las etiquetas a blanco.
				
				formatter: (value: number) => {
				  return `${value}%`; // Aquí, estamos devolviendo un string, no JSX.
				},
				// No necesitas la sección 'labels' aquí para la configuración que estás aplicando.
				// 'title' y 'value' dentro de 'labels' no son opciones estándar reconocidas por este plugin.
			}
		},
		scales: {
			y: {
			  beginAtZero: true,
			  min: 0,
			  max: 100, // Límite fijo en 100
			  ticks: {
				stepSize: 10, // Esto creará pasos de 20 en 20. Puedes cambiarlo según tus preferencias
			  },
			},
		},
	};

	const label = [
		{
			name: 'Ene - Mar',
			color: '#0967C9',
		},
		{
			name: 'Abr-Jun',
			color: '#0967C9',
		},
		{
			name: 'Jul-Sept',
			color: '#0967C9',
		},
		{
			name: 'Oct-Dic',
			color: '#0967C9',
		},
	]


    const data = {
        labels: label.map((item) => item.name),
        datasets: [
            {
				data: values,
				backgroundColor: label.map((item) => item.color),
				borderColor: label.map((item) => item.color),
				borderWidth: 1,
            },
        ],
	};

	return <div className="barBox">
	<Bar ref={chartRef} redraw options={options} data={data}  style={{
		width: '100%',
	}} />
	
	</div>;
}
 
export default MixedChart;