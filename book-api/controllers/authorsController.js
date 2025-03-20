const authorsModel = require('../models/authorsModel'); // Importamos el modelo de autores
const authorsView = require('../views/authorsView'); // Importamos la vista

// Obtiene la lista de autores y la formatea antes de enviarla
const getAuthors = () => {
    return authorsView.formatAuthorsResponse(authorsModel.getAuthors());
};

const addAuthors = (author) => {
    return ` The author has been added:\n${authorsView.formatAuthorAddedResponse([authorsModel.addAuthors(author)])}`;
};
// Exportamos las funciones para usarse en el servidor
module.exports = { getAuthors, addAuthors };
