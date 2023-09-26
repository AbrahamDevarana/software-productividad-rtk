
import { useAppSelector } from '@/redux/hooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
    slug: string
}


const Estrategia = ({slug}: Props) => {

    const { year, quarter } = useAppSelector(state => state.global.currentConfig)

    // Encontrar los objetivos estratégicos del área

    useEffect(() => {
        // Obtener los objetivos estratégicos del área
        
    }, [])


    return ( 
        <motion.div>
        
        </motion.div>
    );
}
 
export default Estrategia;