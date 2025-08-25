



export const truncateByWords = (text: string | null, limit: number) => {
    if (!text) return ""
    const word = text.split(" ");
    if (word.length <= limit) return text;
    return word.slice(0, limit).join(" ") + " ..."
}