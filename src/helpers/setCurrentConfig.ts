import { changeConfigThunk } from "@/redux/features/global/globalThunk"
import { useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"
import dayjs from "dayjs"


export const setCurrentConfig = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(changeConfigThunk({year: dayjs().year(), quarter: dayjs().quarter()}))
    }, [])
}
    