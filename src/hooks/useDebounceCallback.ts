import { useCallback, useEffect, useRef } from "react"

export const useDebounceCallback = (callback: Function, delay: number) => {
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const debounced = useCallback((...args: any[]) => {
        if(timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    useEffect(() => {
        return () => {
            if(timeout.current) clearTimeout(timeout.current)
        }
    }, [])

    return debounced
}