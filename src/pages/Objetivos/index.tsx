import { Icon } from '@/components/Icon';
import { Avatar as Avt, FloatButton } from 'antd'
import { useState } from 'react';

export const Objetivos : React.FC = () => {

    const {Group} = Avt

    const [value, setValue] = useState<string | number>('Estrategicos'); 

    return (<>
    
    
    <FloatButton
        shape="circle"
        icon={<Icon iconName='faPlus' />}
    />
    </>) 

}
