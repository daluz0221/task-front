


export const formatDate = (dateString: string) => {
  

    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formattedTime = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return `${ formattedDate } - ${ formattedTime }`


}