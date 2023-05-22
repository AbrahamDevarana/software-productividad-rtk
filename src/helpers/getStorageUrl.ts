export const getStorageUrl = (file?: string) => {
    if(file) return `${import.meta.env.VITE_STORAGE_URL}${import.meta.env.VITE_STORAGE_FOLDER}/${file}`
}