// Función que formatea la lista de autores en un formato legible
const formatAuthorsResponse = (authors) => {
    if (authors.length === 0) return 'No authors available.';
    
    // Se recorre cada autor y se formatea con su ID, nombre y país
    return authors.map(author =>
        `ID: ${author.id} - Nombre: ${author.name} (País: ${author.country})`
    ).join('\n'); // Unimos todas las líneas en un solo string para enviarlo como respuesta
};

// Función que formatea la respuesta de un autor agregado
const formatAuthorAddedResponse = (author) => {
    return `El autor ha sido agregado:\nID: ${author.id} - Nombre: ${author.name} (País: ${author.country})`;
};

// Exportamos las funciones para ser usadas en el controlador
module.exports = { formatAuthorsResponse, formatAuthorAddedResponse };
