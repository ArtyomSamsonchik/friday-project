//This function coerces image string to empty string if image is not a file 64
export const coerceImage64 = (src?: string) => (src?.startsWith('data:image') ? src : '')
