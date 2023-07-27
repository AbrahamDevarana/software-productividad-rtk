import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";


const MixedChart = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

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

    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 30, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            
          },
        ],
      };


      return <Bar options={options} data={data} style={{
        width: '100%',
      }} />;
}
 
export default MixedChart;