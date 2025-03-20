/**
 * Formatea la lista de autores en un formato legible.
 * @param {Array} authors - Lista de autores a formatear.
 * @returns {string} Cadena con la lista de autores formateada o un mensaje si no hay autores.
 */
const formatAuthorsResponse = (authors) => {
    if (authors.length === 0) return 'No authors available.';
    
    // Se recorre cada autor y se formatea con su ID, nombre y país
    return authors.map(author =>
        `ID: ${author.id} - Name: ${author.name} (Country: ${author.country})`
    ).join('\n'); // Unimos todas las líneas en un solo string para enviarlo como respuesta
};

/**
 * Formatea la respuesta cuando se agrega un nuevo autor.
 * @param {Object} author - Objeto del autor agregado.
 * @param {string} author.id - ID único del autor.
 * @param {string} author.name - Nombre del autor.
 * @param {string} author.country - País del autor.
 * @returns {string} Mensaje formateado con los datos del autor agregado.
 */
const formatAuthorAddedResponse = (author) => {
    return `The author has been added:\nID: ${author.id} - Name: ${author.name} (Country: ${author.country})`;
};

// Exportamos las funciones para ser usadas en el controlador
module.exports = { formatAuthorsResponse, formatAuthorAddedResponse };
