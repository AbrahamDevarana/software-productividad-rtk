import { Comentarios } from "@/components/general/Comentarios";
import { TaskProps } from "@/interfaces";
import { useGetComentariosQuery } from "@/redux/features/comentarios/comentariosThunk";

interface Props {
    activeTask: TaskProps | null;
}

const comentableType = 'TASK'

const TaskComentarios = ({activeTask}: Props) => {
    if( !activeTask ) return null

    return (
        <>
            <Comentarios comentableId={activeTask.id} comentableType={comentableType} maxSize={'auto'}/>
        </> );
}
 
export default TaskComentarios;