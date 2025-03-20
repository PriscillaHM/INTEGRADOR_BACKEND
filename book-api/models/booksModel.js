//Importamos los modulos necesarios
//Modulo fs para manejar archivos
const fs = require('fs');
//Modulo para manejar rutas de archivos
const path = require('path');
// Para generar un ID único para cada autor
const { v4: uuid4 } = require('uuid'); 

// Definimos la ruta al archivo donde se almacenan los libros
const booksFilePath = path.join(__dirname, '../data/books.json'); // Ruta al archivo books.json

/**
 * Lee el archivo de libros y lo convierte a un objeto JavaScript.
 * @returns {Array} Lista de libros almacenadas en el archivo
 */
const readBooksFromFile = () => {
    try {
        // Leemos el contenido del archivo
        const data = fs.readFileSync(booksFilePath, 'utf8');

        // Parseamos el JSON a un objeto JavaScript
        return JSON.parse(data); 
    } catch (error) {
        // Si hay un error (por ejemplo, el archivo no existe), retornamos un array vacío
        return []; 
    }
};

/**
 * Escribe la lista de libros en el archivo JSON.
 * @param {Array} books - Lista de libros actualizada
 */
const writeBooksToFile = (books) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
};

/**
 * Obtiene la lista de todos los libros almacenados.
 * @returns {Array} - Lista de libros
 */
const getBooks = () => {
    // Leemos los libros desde el archivo
    return readBooksFromFile(); 
};

/**
 * Agrega un nuevo libros a la lista y lo gurada en el archivo
 * @param {Object} book - Objeto con los datos del libros
 * @returns {Object} El libro agregado con su ID
 */
const addBook = (book) => {
    // Validamos que el libro tenga los datos requeridos
    if (!book.title || !book.author_id || !book.publisher_id || !book.year || !book.genre) {
        throw new Error('Book must have title, author_id, publisher_id, year, and genre');
    }

    // Leemos los libros existentes
    const books = readBooksFromFile();

    // Generamos un ID único para el nuevo libro
    const newBook = {
        id: uuid4(),
        title: book.title,
        author_id: book.author_id,
        publisher_id: book.publisher_id,
        year: book.year,
        genre: book.genre
    };

    // Agregamos el nuevo libro a la lista
    books.push(newBook);

    // Escribimos la lista actualizada al archivo
    writeBooksToFile(books);

    // Devolvemos el libro agregado (puede ser útil para el controlador)
    return newBook;
};

// Exportamos las funciones para ser utilizadas en otros módulos
module.exports = { getBooks, addBook };