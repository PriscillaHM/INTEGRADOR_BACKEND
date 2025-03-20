/**
 * Formatea la lista de editoriales en un formato legible.
 * @param {*} publishers - Lista de editoriales a formatear
 * @returns {string} Cadena con la lista de editoriales formateada o un mensaje si no hay editoriales
 */
const formatPublishersResponse = (publishers) => {
    if (publishers.length === 0) return ' No publishers available ';
    
    // Se recorre cada editorial y se formatea con su ID, nombre y país
    return publishers.map(publisher =>
        ` ${publisher.id} - ${publisher.name} (Country: ${publisher.country})`
    ).join('\n'); // Unimos todas las líneas en un solo string para enviarlo como respuesta
};

/**
 * Formatea la respuesta cuando se agrega una nueva editorial
 * @param {Object} publisher - Objecto del autor agregado
 * @returns {string} Mensaje formateado con los datos del la editorial agregada
 */
const formatPublisherAddedResponse = (publisher) => {
    return `The publisher has been added: \nID: ${publisher.id} - NAME ${publisher.name} - Country ${publisher.country}`
}

// Exportamos la función para que pueda ser usada en `publishersController.js`
module.exports = { formatPublishersResponse, formatPublisherAddedResponse };