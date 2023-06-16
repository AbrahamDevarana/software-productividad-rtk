import { useGetValidationQuery } from "../redux/features/auth/authThunks"

export const useAuth = () => {
    useGetValidationQuery(null, {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 30,
        refetchOnMountOrArgChange: true,
    })
}