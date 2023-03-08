import { useGetValidationQuery } from "../redux/features/auth/authThunks"

export const useAuth = () => {
    useGetValidationQuery(null, {
        refetchOnReconnect: true,
        pollingInterval: 180000,
        refetchOnMountOrArgChange: true,
    })
}