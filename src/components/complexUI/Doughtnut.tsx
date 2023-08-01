import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useRef } from "react";
import { Doughnut } from 'react-chartjs-2';

interface Props {
    value: number
    firstColor: string
    secondColor: string
}

const DoughnutChart = ({value, firstColor, secondColor}:Props) => {


    const chartWidth = document.querySelector('.charBox')?.getBoundingClientRect().width || 200;
    ChartJS.register(ArcElement, Tooltip, Legend);
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return <></>;

    const chartRef = useRef(null)


    const doughnutText = {
        id: 'doughnutText',
        afterDatasetsDraw: function(chart: any) {
            const { ctx, data, chartArea: {top, button, left, right, width, height}, scales: {r}} = chart;
            ctx.save()

            const text = `${value.toFixed(2)}%`
            const xCoor = chart.getDatasetMeta(0).data[0].x
            const yCoor = chart.getDatasetMeta(0).data[0].y

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = '12px Roboto'
            ctx.fillStyle = '#848891'
            ctx.fillText(text, xCoor, yCoor)

            ctx.restore()

        },
    }
        

    
    
    useEffect(() => {
        ChartJS.register(ArcElement, Tooltip, Legend)

        
        
        return () => ChartJS.unregister()
    }, [value, firstColor, secondColor])
    
    const gradientSegment = ctx.createLinearGradient(0, 0, chartWidth, 0);
    gradientSegment.addColorStop(0, firstColor);
    gradientSegment.addColorStop(1, secondColor);
    

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
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

    const plugins = [doughnutText]

    return ( 
    <>
    
    <Doughnut
        ref={chartRef}
        options={options}
        data={data}
        plugins={plugins}
    />

</> );
}
 
export default DoughnutChart;