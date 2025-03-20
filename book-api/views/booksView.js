// Formatea la respuesta de los libros para que sea legible
/**
 * Formatea la lista de libros en un formato legible.
 * @param {Array} books - Lista de libros a formatear
 * @returns {string} Cadena con la lista de libros formateada o un mensaje de no hay libros
 */
const formatBooksResponse = (books) => {
    if (books.length === 0) return ' No books v';

    // Formateamos cada libro para mostrar ID, título, autor y editorial
    return books.map(book =>
        ` ${book.id} - "${book.title}" (Year: ${book.year})\n   Author ID: ${book.author_id} | Publisher ID: ${book.publisher_id} | Genre: ${book.genre}`
    ).join('\n'); // Unimos todas las líneas en un solo string
};

/**
 * Formatea la respuesta cuando se agrega un nuevo autor
 * @param {Object} book - Objecto del libro agregado
 * @returns {string} Mensaje formateado con los datos del libros agregado
 */
const formatBookAddedResponse = (book) => {
    return `The book has been added: \nID: ${book.id} - Title ${book.title}`
}

//Exportamos el modulo para usarlo en otros lados de la aplicacion
module.exports = { formatBooksResponse, formatBookAddedResponse };