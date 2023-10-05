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

    const labels = ['Ene - Mar', 'Abr-Jun', 'Jul-Sept', 'Oct-Dic'];	

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
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
        <Bar options={options} data={data}  style={{
          width: '100%',
        }} />
      
      </div>;
}
 
export default MixedChart;