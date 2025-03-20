// Función que formatea la lista de editoriales en un formato legible
const formatPublishersResponse = (publishers) => {
    if (publishers.length === 0) return ' No publishers available ';
    
    // Se recorre cada editorial y se formatea con su ID, nombre y país
    return publishers.map(publisher =>
        ` ${publisher.id} - ${publisher.name} (Country: ${publisher.country})`
    ).join('\n'); // Unimos todas las líneas en un solo string para enviarlo como respuesta
};

const formatPublisherAddedResponse = (publisher) => {
    return `La editorial ha sifo agregada: \nID: ${publisher.id} - Nombre ${publicher.name} - Pais ${publicher.country}`
}

// Exportamos la función para que pueda ser usada en `publishersController.js`
module.exports = { formatPublishersResponse, formatPublisherAddedResponse };