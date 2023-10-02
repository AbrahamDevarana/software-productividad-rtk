import { OperativoProps } from "@/interfaces";

interface Props {
    objetivo: OperativoProps
}


const ObjetivoPreview = ({objetivo}: Props) => {
    return ( 
        <div className="overflow-y-auto"
        style={{
            height: 'calc(100vh - 200px)'
        }}
        >
         
           <pre>
            {
                JSON.stringify(objetivo, null, 2)
            }
            </pre>
        </div>
    );
}
 
export default ObjetivoPreview;