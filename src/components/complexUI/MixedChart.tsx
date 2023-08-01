import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Bar, Chart } from "react-chartjs-2";

interface Props {
	values: number[]
	quarter: number
	year: number
}

const MixedChart = ({values, quarter, year}:Props) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
	  const chartWidth = document.querySelector('.barBox')?.getBoundingClientRect().width || 200;
	  const ctx = document.createElement('canvas').getContext('2d');
	  if (!ctx) return <></>;

    const gradient = ctx.createLinearGradient(0, 0, chartWidth, 0);
    gradient.addColorStop(0, '#0967C9');
    gradient.addColorStop(1, '#0967C9');
    
	  
	  useEffect(() => {
		ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
	  }, [values, year])

    const labels = ['Ene - Abr', 'May-Jun', 'Jul-Ago', 'Sep-Dic'];	

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
        },
	};

	const label = [
		{
			name: 'Ene - Abr',
			color: '#0967C9',
		},
		{
			name: 'May-Jun',
			color: '#0967C9',
		},
		{
			name: 'Jul-Ago',
			color: '#0967C9',
		},
		{
			name: 'Sep-Dic',
			color: '#0967C9',
		},
	]

    const data = {
        labels: label.map((item) => item.name),
        datasets: [
          {
            label: 'Dataset 1',
            data: values,
            // backgroundColor: [gradient, ...label.map((item) => item.color),]
            backgroundColor: [gradient]
            
          },
        ],
      };


      return <div className="barBox">
        <Bar options={options} data={data} style={{
          width: '100%',
        }} />
      
      </div>;
}
 
export default MixedChart;