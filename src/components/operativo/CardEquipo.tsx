import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Image, Popover } from "antd";
import { SinglePerfilProps } from "@/interfaces";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Props {
    equipo: SinglePerfilProps[]
    color: string
    handleMiEquipo?: (usuario: SinglePerfilProps) => void
    title?: string
}

export const CardEquipo = ({ equipo, color, handleMiEquipo, title }: Props) => {

    const { userAuth } = useAppSelector(state => state.auth)

    const handleOpenAdmin = (usuario: SinglePerfilProps) => {
        if(false){
            // @ts-ignore
            handleMiEquipo && handleMiEquipo(usuario)
        }
    }

    const getContent = (usuario: SinglePerfilProps) => (
        <div className='flex flex-col gap-y-2'>
            <Link to={`/perfil/${usuario.slug}`} className='text-devarana-blue hover:text-devarana-blue font-medium cursor-pointer hover:bg-devarana-graph hover:bg-opacity-20 px-2 py-1 transition-all duration-100 ease-in-out rounded-ext'>Ver perfil</Link>
            {
                usuario.leaderId === userAuth?.id && (
                    <></>
                    // <p className='text-devarana-blue font-medium cursor-pointer hover:bg-devarana-graph hover:bg-opacity-20 px-2 py-1 transition-all duration-100 ease-in-out rounded-ext' onClick={() => handleOpenAdmin(usuario)}>Evaluar</p>
                )
            }
        </div>
    )


    return ( 
        <>
        <div className={`p-5 shadow-ext rounded-ext from-${color} to-${color}-light bg-gradient-to-tr h-full max-h-[450px] hover:overflow-y-auto overflow-hidden cursor-auto`}>
            <h1 className='font-medium text-white'>{ title }</h1>
            <ul className="my-3">
                {
                    equipo && equipo.length > 0 && equipo.map((item, index) => (
                        <li className='flex justify-between items-center my-2 gap-x-5 w-full border-b border-white border-dotted border-opacity-40 py-3' key={index} >
                            <Avatar  size="large" src={<Image src={`${getStorageUrl(item?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                            <p className='font-medium text-white'>{item?.nombre} {item?.apellidoPaterno}</p>
                            <Popover content={getContent(item)} placement='bottom' trigger={'click'} >
                                <div className='p-2 bg-white rounded cursor-pointer'>
                                    <BsThreeDots className='text-devarana-blue font-medium' />
                                </div>
                            </Popover>
                        </li>
                    ))
                }
            </ul>                 
        </div>
            
        </>
     );
}
 
