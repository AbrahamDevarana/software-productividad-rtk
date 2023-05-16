import { Divider, Popconfirm } from 'antd'
export const ResponsabilidadesInfo = ({responsabilidades}: any ) => {
    
  return (
    <>
        <ul>
        {responsabilidades && responsabilidades.length ? 
            responsabilidades.map( (item: any, index: number) => (
                <li key={index} className="text-sm py-2">
                    {item.descripcion}

                    <Popconfirm
                        title="Deseas borrar esto?"
                        // onConfirm={() => handleDelete(item.id)}
                        >
                        <button className="btn-danger py-1 px-2 rounded mx-2">X</button>
                    </Popconfirm>
                </li>
            ))
            :
            "No hay responsabilidades registradas"
        }
        </ul>
        <Divider />
        <div className="pt-3 flex">
            <div className="mr-4 w-full">
                {/* <Input title="Escribe una actividad" className="" value={newResponsabilidad.descripcion} inputName="responsabilidad" id="inpt_resp" fn={handleChangeResponsabilidad} /> */}
            </div>
            {/* <Button btnType="secondary-outline" className="block ml-auto" fn={(e) => handleNewResponsabilidad (e)}>  + </Button> */}
        </div>
    </>
  )
}
