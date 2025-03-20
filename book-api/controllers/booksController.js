// Importamos el modelo de libros
const booksModel = require('../models/booksModel'); 
// Importamos la vista para formatear la respuesta
const { formatBooksResponse } = require('../views/booksView'); 

/**
 * Obtiene la lista de libros y la formatea antes de enviarla al servidor
 * @returns {Array} Lista de libros formateada
 */
const getBooks = () => {
    //Llamamos al modelo para obtener las editoriales
    const books = booksModel.getBooks()

    //Formateamos la respuesta antes de devolverla
    return formatBooksResponse(books);
};

/**
 * Agrega un libro, lo guarda en JSON y devuelve el resultado formateado
 * @param {Object} book - Objeto con la informacion de los libros a agregar
 * @returns {string}
 */
const addBook = (book) => {
    //Llamamos al modelo para agregar la nueva editorial
    const addedBook = booksModel.addBook(book)

    //Retornamos un mensaje confirmando la adicion de la informacion formateada
    return ` The book has been added:\n${formatBooksResponse([addedBook])}`;
};

// Exportamos las funciones para usarlas en el servidor
module.exports = { getBooks, addBook };
