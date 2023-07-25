import { Gauge } from 'smart-webcomponents-react/gauge';
window.Smart.License = "7C743E09-8C47-4BFC-9783-7CF87E92D987";
import '@/assets/scss/smart.custom.scss'

const GaugeChart = () => {
    return ( 
    <>
        <div className='w-[350px]'>
            <Gauge id="gauge" analogDisplayType="needle" digitalDisplay startAngle={-30} endAngle={210} min={0} max={100} value={0} 
                customInterval customTicks={[0, 20, 40, 60, 80, 100]} style={{
                    width: '100%',
                }}
                />
        </div>
    </> );
}
 
export default GaugeChart;