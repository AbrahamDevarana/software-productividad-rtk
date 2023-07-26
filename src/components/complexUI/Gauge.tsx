import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
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

    const chartWidth = document.querySelector('.charBox')?.getBoundingClientRect().width || 300;

    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return <></>;

    const gradientSegment = ctx.createLinearGradient(0, 0, chartWidth, 0);
    gradientSegment.addColorStop(0, 'red');
    gradientSegment.addColorStop(0.7, 'yellow');
    gradientSegment.addColorStop(1, 'green');

    const data = {
        labels: ["Score", "Gray Area"],
        datasets: [{
            data: [value, 100 - value],
            backgroundColor: [gradientSegment, 'rgba(0,0,0,0)'],
            borderWidth: 1,
            borderRadius: 20,
            cutout: "85%",
            circumference: 180,
            rotation: 270

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
            } else if (score < 100) {
                rating = 'Excellent';
            } else {
                rating = 'No Rating';
            }

            function textLabel({text, x, y, fontSize, textBaseLine, textAlign}: ChartProps) {
                ctx.font = `${fontSize}px Roboto`
                ctx.fillStyle = '#666'
                ctx.textBaseLine = textBaseLine
                ctx.textAlign = textAlign
                ctx.fillText(text, x, y )

            }

            textLabel({text: '0', x: left, y: yCoor + 20, fontSize: 17, textBaseLine: 'top', textAlign: 'left'})
            textLabel({text: '100', x: right, y: yCoor + 20, fontSize: 17, textBaseLine: 'top', textAlign: 'right'})
            textLabel({text: score, x: xCoor, y: yCoor, fontSize: 32, textBaseLine: 'bottom', textAlign: 'center'})
            textLabel({text: rating, x: xCoor, y: yCoor - 30, fontSize: 12, textBaseLine: 'bottom', textAlign: 'center'})
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
    };

    const plugins = [gaugeChartText];

    return (
        <div className="charBox">
            <Doughnut data={data} options={options} plugins={plugins} />
        </div>
    );
}
