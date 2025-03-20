//Importamos el modelo de editoriales
const publishersModel = require('../models/publishersModel'); 
//Importamo la vista
const { formatPublishersResponse } = require('../views/publishersView');

/**
 * Obtiene la lista de editoriales disponibles y da formato a la respuesta
 * @returns {Array} Lista de editoriales formateadas
 */
const getPublishers = () => {
    //Llamamos al modelo para obtener las editoriales
    const publishers = publishersModel.getPublishers(); 

    //Formateamos la respuesta antes de devolverla
    return formatPublishersResponse(publishers);
};

/**
 * Agrega una nueva editorial al sistema y retorna una respuesta formateada
 * @param {Object} publisher - Objeto con la infomacion de la editorial a agregar
 * @returns {string} Mensaje confirmando la adicion de la editorial, con los datos formateados
 */
const addPublisher = (publisher) => {
    //Llamamos al modelo para agregar la nueva editorial
    const addedPublisher = publishersModel.addPublisher(publisher);

    //Retornamos un mensaje confirmando la adicion de la informacion formateada
    return `The publisher '${addedPublisher.name}' has been added:\n${formatPublishersResponse([addedPublisher])}`;
};
// Exportamos las funciones para que puedan ser utilizadas en otros módulos del servidor
module.exports = { getPublishers,addPublisher };