// Importamos el modelo de autores, que contiene la lógica de datos
const authorsModel = require('../models/authorsModel'); 
// Importamos la vista, que contiene las funciones para formatear las respuestas
const authorsView = require('../views/authorsView'); 

/**
 * Obtiene la lista de autores desde el modelo y la formatea antes de enviarla.
 * @returns {string} Lista de autores formateada o un mensaje si no hay autores disponibles.
 */
const getAuthors = () => {
    return authorsView.formatAuthorsResponse(authorsModel.getAuthors());
};

/**
 * Agrega un nuevo autor y retorna un mensaje formateado con los datos del autor agregado.
 * @param {Object} author - Objeto con los datos del autor a agregar.
 * @param {string} author.name - Nombre del autor.
 * @param {string} author.country - País del autor.
 * @returns {string} Mensaje confirmando la adición del autor con su información formateada.
 */
const addAuthors = (author) => {
    return `The author has been added:\n${authorsView.formatAuthorAddedResponse([authorsModel.addAuthors(author)])}`;
};

// Exportamos las funciones para que puedan ser utilizadas en otros módulos del servidor
module.exports = { getAuthors, addAuthors };