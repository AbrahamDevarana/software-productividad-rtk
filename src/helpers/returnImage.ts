

export const returnImage = (image?: string) => {
    return `${import.meta.env.VITE_STORAGE_URL}${image}`
}