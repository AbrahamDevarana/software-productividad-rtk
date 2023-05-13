import getBrokenUser from "./getBrokenUser"

const STORAGE_FOLDER = import.meta.env.STORAGE_FOLDER
const STORAGE_URL = import.meta.env.STORAGE_URL


export const getFile = (file?:string) => {

    if(!file) return ''

    return `${STORAGE_URL}${STORAGE_FOLDER}${file}`
}