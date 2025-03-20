const fs = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid'); // Para generar un ID único para cada libro

const booksFilePath = path.join(__dirname, '../data/books.json'); // Ruta al archivo books.json

// Función para leer el archivo y parsearlo
const readBooksFromFile = () => {
    try {
        const data = fs.readFileSync(booksFilePath, 'utf8');
        return JSON.parse(data); // Parseamos el JSON a un objeto JavaScript
    } catch (error) {
        return []; // Si no existe el archivo o hay un error, devolvemos un array vacío
    }
};

// Función para escribir los libros al archivo
const writeBooksToFile = (books) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
};

// Función para obtener la lista de libros
const getBooks = () => {
    return readBooksFromFile(); // Leemos los libros desde el archivo
};

// Función para agregar un nuevo libro
const addBook = (book) => {
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

module.exports = { getBooks, addBook };

