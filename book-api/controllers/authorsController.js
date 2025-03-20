// Importamos el modelo de autores
const authorsModel = require('../models/authorsModel'); 
// Importamos la vista
const { formatAuthorsResponse } = require('../views/authorsView'); 

/**
 * Obtiene la lista de autores y la formatea antes de enviarla
 * @returns {Array} Lista de los autores formateada
 */
const getAuthors = () => {
    return formatAuthorsResponse(authorsModel.getAuthors());
};

/**
 * Agrega un nuevo autor al sistema y retorma una respuesta formateada
 * @param {Object} author - Objeto con la informacion del autor a agregar
 * @returns {string} Mensaje de confirmacion de la adicion del autor
 */
const addAuthors = (author) => {
    return ` The author has been added:\n${formatAuthorsResponse([authorsModel.addAuthors(author)])}`;
};
// Exportamos la función para usarse en el servidor
module.exports = { getAuthors, addAuthors };