import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/hooks';
import { clearUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks';
// import { CustomDropdown } from './CustomDropdown'
import { Avatar, Select } from 'antd'
import { UsuarioProps } from '@/interfaces';
import { useDebounce } from '@/hooks/useDebouce';



interface UserDropDownProps {
    searchFunc: any;
    data: UsuarioProps[] | any;
    setUserState?: any;
}


export const UserDropDown = ({searchFunc, data}: UserDropDownProps) => {

    const dispatch = useAppDispatch();
    const [setUser, setUserState] = useState<any>([]) 
    const [search, setSearch] = useState<string>('');


    const {debouncedValue, isDebouncing} = useDebounce(search, 1000);
       
    useEffect(() => {
        if(debouncedValue === '') return;
        dispatch(searchFunc({search: debouncedValue}))
    }, [debouncedValue])


    
    const handleChange = (value: string) => {
        dispatch(clearUsuariosThunk())
        const user = data.find((d: any) => d.id === value);
        if(!user) return;
        // si ya existe en setUser, no lo agrega
        if(setUser.find((u: any) => u.id === user.id)) return;
        const users = [user, ...setUser];
        setUserState(users);
        dispatch(clearUsuariosThunk())
    }


    const handleDelete = (id: string) => {
        const users = setUser.filter((u: any) => u.id !== id);
        setUserState(users);
    }



    return (
        // <CustomDropdown buttonChildren='Persona' iconButton='faPerson'  >

        //     <div className='flex justify-center items-center'>
        //         <p className='font-light'>Buscar Persona</p>
        //     </div>
        //     <div className='flex py-3 gap-3 flex-wrap max-w-xs'>

        //         {
                    
        //             setUser.map((user: UsuarioProps) => (
        //                 <div key={user.id} className='flex flex-row gap-x-2 pr-2 py-0.5 bg-green-500 rounded-full items-center relative group'>
        //                     <Avatar size={'small'} src={user.foto}  className='relative'> 
        //                         {user.iniciales}

        //                     </Avatar>
        //                     <p className='text-white text-xs'>{ user.nombre } { user.apellidoPaterno }</p> 
        //                     <button className='text-white group-hover:block hidden absolute inset-0 bg-devarana-graph bg-opacity-40 rounded-full' onClick={ () => handleDelete(user.id) }>
        //                         X
        //                     </button>
        //                 </div>
        //             ))

        //         }
                
        //     </div>

        //     <Select
        //         showSearch
        //         value={''}
        //         className='w-full'
        //         defaultActiveFirstOption={false}
        //         showArrow={false}
        //         filterOption={false}
        //         onSearch={ setSearch }
        //         onChange={ handleChange }
        //         notFoundContent={ isDebouncing ? 'Buscando...' : null }
        //         loading={ isDebouncing }
        //         options={(data || []).map((d:any) => ({
        //             value: d.id,
        //             label: d.nombre,
        //         }))}
        //     />
        // </CustomDropdown>
        <></>
    )
}
