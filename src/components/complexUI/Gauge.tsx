import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";


interface ChartProps {
    text: string
    x: number
    y: number
    fontSize: number
    textBaseLine: 'top' | 'bottom' | 'middle'
    textAlign: 'left' | 'right' | 'center'
}

interface Props {
    value: number
}

export const GaugeChart = ({value = 0}: Props) => {


    
    ChartJS.register(ArcElement, Tooltip, Legend);
    
    const chartWidth = document.querySelector('.charBox')?.getBoundingClientRect().width || 200;
    
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return <></>;
    
    useEffect(() => {
        ChartJS.register(ArcElement, Tooltip, Legend);
    }, [value])
    
    const gradientSegment = ctx.createLinearGradient(0, 0, chartWidth, 0);
    gradientSegment.addColorStop(0.10, '#FF3131');
    gradientSegment.addColorStop(0.20, '#FF914D');
    gradientSegment.addColorStop(0.30, '#FFBD59');
    gradientSegment.addColorStop(0.40, '#FFDE59');
    gradientSegment.addColorStop(0.50, '#C1FF72');
    gradientSegment.addColorStop(0.60, '#7ED957');
    gradientSegment.addColorStop(0.70, '#00BF63');
    gradientSegment.addColorStop(0.80, '#5CE1E6');
    gradientSegment.addColorStop(0.90, '#0CC0DF');

    const data = {
        labels: ["Score", "Gray Area"],
        datasets: [{
            data: [value, 100 - value],
            backgroundColor: [gradientSegment, "#e6e6e6"],
            borderWidth: 0,
            cutout: "85%",
            circumference: 180,
            rotation: 270,
        }]
    };

    const gaugeChartText = {
        id: 'gaugeChartText',
        afterDatasetsDraw(chart:any, args:any, options:any) {
            const { ctx, data, chartArea: {top, button, left, right, width, height}, scales: {r}} = chart;
            
            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x
            const yCoor = chart.getDatasetMeta(0).data[0].y

            const score = data.datasets[0].data[0]
            let rating;            

            if (score < 20) {
                rating = 'Poor';
            } else if (score < 40) {
                rating = 'Fair';
            } else if (score < 60) {
                rating = 'Good';
            } else if (score < 80) {
                rating = 'Very Good';
            } else if (score <= 100) {
                rating = 'Excellent';
            } else {
                rating = 'No Rating';
            }

            function textLabel({text, x, y, fontSize, textBaseLine, textAlign}: ChartProps) {
                // responsive font size
                const fontSizeResponsive = fontSize * (width / 300)
                ctx.font = `${fontSizeResponsive}px Roboto`
                ctx.fillStyle = '#848891'
                ctx.textBaseLine = textBaseLine
                ctx.textAlign = textAlign
                // responsive x and y coordinates
                
                ctx.fillText(text, x, y )

            }

            textLabel({text: '0', x: left, y: yCoor + 15, fontSize: 17, textBaseLine: 'top', textAlign: 'left'})
            textLabel({text: '100', x: right, y: yCoor + 15, fontSize: 17, textBaseLine: 'top', textAlign: 'right'})
            // textLabel({text: score, x: xCoor, y: yCoor - 50, fontSize: 32, textBaseLine: 'bottom', textAlign: 'center'})
            // textLabel({text: rating, x: xCoor, y: yCoor - 80, fontSize: 12, textBaseLine: 'bottom', textAlign: 'center'})
        }
    }


    const gaugeNeedle = {
        id: 'gaugeNeedle',
        afterDatasetsDraw(chart:any, args:any, options:any) {
            const { ctx, data, chartArea: {top, button, left, right, width, height}, scales: {r}} = chart;

            ctx.save();

            const dataTotal = data.datasets[0].data.reduce((a:any, b:any) => a + b, 0);
            const needleValue = data.datasets[0].data[0];

            const xCoor = chart.getDatasetMeta(0).data[0].x
            const yCoor = chart.getDatasetMeta(0).data[0].y

            const angle = Math.PI + (1 / dataTotal * needleValue) * Math.PI

            // Needle
            ctx.translate(xCoor, yCoor);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -8);
            ctx.lineTo(yCoor - 40 , 0);
            ctx.lineTo(0, 8);
            ctx.fillStyle = '#848891'
            ctx.fill()

            ctx.translate(-xCoor, -yCoor);
            ctx.beginPath();
            ctx.arc(xCoor, yCoor, 8, 8, 20);
            ctx.fill()
            ctx.restore();
        }
    }

    const options = {
        aspectRatio: 1.5,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    const plugins = [gaugeChartText, gaugeNeedle];

    return (
        <div className="charBox w-full">
            <Doughnut data={data} options={options} plugins={plugins} style={{
                width: '100%',
            }} />
        </div>
    );
}
