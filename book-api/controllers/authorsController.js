// Importamos el modelo de autores, que contiene la lógica de datos
const authorsModel = require('../models/authorsModel'); 
// Importamos la vista, que contiene las funciones para formatear las respuestas
const {formatAuthorsResponse} = require('../views/authorsView'); 

/**
 * Obtiene la lista de autores desde el modelo y la formatea antes de enviarla.
 * @returns {Array} Lista de autores formateada o un mensaje si no hay autores disponibles.
 */
const getAuthors = () => {
    //Llamamos al modelo para obtener los autores
    const authors = authorsModel.getAuthors()

     //Formateamos la respuesta antes de devolverla
    return formatAuthorsResponse(authors)
};

/**
 * Agrega un nuevo autor y retorna un mensaje formateado con los datos del autor agregado.
 * @param {Object} author - Objeto con los datos del autor a agregar.
 * @returns {string} Mensaje confirmando la adición del autor con su información formateada.
 */
const addAuthor = (author) => {
    //Llamamos al modelo para agregar el nuevo auor
    const addedAuthor = authorsModel.addAuthor(author)

    //Retornamos un mensaje confirmando la adicion de la informacion formateada
    return `The author has been added:\n${formatAuthorsResponse([addedAuthor])}`;
};

// Exportamos las funciones para que puedan ser utilizadas en otros módulos del servidor
module.exports = { getAuthors, addAuthor };