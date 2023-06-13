
import { Timeline } from "antd";
import Box from "@/components/ui/Box";
import { Icon } from "@/components/Icon";
import { Proximamente } from "@/components/ui/proximamente";

interface Props {
    visitante?: boolean
}

const Actividad: React.FC<Props> = ({visitante = false}) => {
    
    return <Proximamente />
    return ( 
    <div className="animate__animated animate__fadeIn animate__faster">
       <Box>
            <h1 className='text-2xl'>Actividad</h1>
            <Timeline className='p-10'>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon iconName="faClock" />}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
                </Timeline.Item>
                <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon iconName="faClock"  />}>
                Technical testing 2015-09-01
                </Timeline.Item>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon iconName="faClock"  />}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
                </Timeline.Item>
                <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon iconName="faClock"  />}>
                Technical testing 2015-09-01
                </Timeline.Item>
            </Timeline>
        </Box>
    </div>
     );
}
 
export default Actividad;