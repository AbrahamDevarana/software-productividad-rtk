import { OperativoProps, SinglePerfilProps } from "@/interfaces";
import { taskStatusTypes } from "@/types";
import { Progress } from "antd";

interface Props {
    objetivo: OperativoProps
    activeUsuario: SinglePerfilProps
}


const ObjetivoPreview = ({objetivo, activeUsuario}: Props) => {
    return ( 
        <div className="overflow-y-auto"
        style={{
            height: 'calc(100vh - 200px)'
        }}
        >

            <div className='flex gap-x-10 p-5 border shadow-ext rounded-ext justify-between bg-gradient-to-tr from-dark to-dark-light'>
				<div className='flex gap-x-10'>
					<div className='flex flex-col'>
						<h1 className='font-bold text-white'>{objetivo.nombre}</h1>
						<p className='text-white'>{objetivo.meta}</p>
					</div>
				</div>
				<div className='flex items-center gap-x-3'>
					<h2 className='font-light text-lg text-white'>Avance objetivo: </h2>
					<p className='text-2xl text-white'>
                        {
                            objetivo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.progresoReal
                        }
					</p>
				</div>
			</div>
            <div>
                {/* Resultados y sus objetivos */}
                {
                    objetivo.resultadosClave.map((resultado, index) => (
                        <div key={index} className="p-5">
                            <div className="bg-devarana-salmon bg-opacity-10 px-5 py-2 flex gap-x-10 items-center justify-between">
                                <h1>{resultado.nombre}</h1>
                                <Progress percent={resultado.progreso} className="max-w-md my-3" />
                            </div>
                            {
                                resultado.task.map((task, index) => (
                                    <div key={index} className="flex gap-x-10 ml-10">
                                        <h2>{task.nombre}</h2>
                                        <p>{taskStatusTypes[task.status]}</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default ObjetivoPreview;