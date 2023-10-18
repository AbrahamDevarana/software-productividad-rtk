import { useGetValidationQuery } from "../redux/features/auth/authThunks"

export const useAuth = () => {

    // calcular el tiempo de expiracion del token
    // si el tiempo de expiracion es menor a 5 minutos, refrescar el token

    useGetValidationQuery(null, {
        skip: !localStorage.getItem('accessToken'),
        refetchOnReconnect: true,
        pollingInterval: 3600 * 60 * 360,
        refetchOnMountOrArgChange: true,
    })
}