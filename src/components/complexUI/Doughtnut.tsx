import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';

interface Props {
    value: number
}

const DoughnutChart = ({value}:Props) => {


    const chartWidth = document.querySelector('.charBox')?.getBoundingClientRect().width || 200;
    ChartJS.register(ArcElement, Tooltip, Legend);
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return <></>;
    
    useEffect(() => {
        ChartJS.register(ArcElement, Tooltip, Legend);
    }, [value])
    
    const gradientSegment = ctx.createLinearGradient(0, 0, chartWidth, 0);
    gradientSegment.addColorStop(0.50, 'red');
    gradientSegment.addColorStop(1, 'blue');
    

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const data = {

        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: [gradientSegment, "#e6e6e6"],
                borderWidth: 0,
                cutout: "85%",

            }
        ]

    }

    return ( 
    <>
    
    <Doughnut
        options={options}
        data={data}
    />

</> );
}
 
export default DoughnutChart;