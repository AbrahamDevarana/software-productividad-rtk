import ResultadoClaveForm from "../resultados/FormResultado";

interface Props {
    resultado: any
    isClosed?: boolean
    currentOperativo: any
}

export const taskResultadosHeader = ({ resultado, isClosed, currentOperativo }: Props) => (
    <div onClick={ event => event.stopPropagation() }>
        <ResultadoClaveForm resultado={resultado} isClosed={isClosed} currentOperativo={currentOperativo}/>
    </div>
)