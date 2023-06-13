import Loading from '@/components/antd/Loading';
import Box from '@/components/ui/Box';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home : React.FC = () => {


    const navigate = useNavigate();
    useEffect(() => {
        navigate('/perfil');
    }, []);


    return (
        <Loading />
    )

    return (
        <>
            <div className="grid grid-cols-6 gap-x-5">
                <Box className='col-span-4'>
                    <h1>Últimas actualizaciones</h1>
                    <div>

                    </div>
                </Box>
                <Box className='col-span-2'>
                   
                </Box>
            </div>
        </>
     );
}
 
export default Home;