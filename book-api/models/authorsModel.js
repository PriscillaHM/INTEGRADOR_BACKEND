const fs = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid'); // Para generar un ID único para cada autor

const authorsFilePath = path.join(__dirname, '../data/authors.json'); // Ruta al archivo authors.json

// Función para leer el archivo y parsearlo
const readAuthorsFromFile = () => {
    try {
        const data = fs.readFileSync(authorsFilePath, 'utf8');
        return JSON.parse(data); // Parseamos el JSON a un objeto JavaScript
    } catch (error) {
        return []; // Si no existe el archivo o hay un error, devolvemos un array vacío
    }
};

// Función para escribir los autores al archivo
const writeAuthorsToFile = (authors) => {
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 2), 'utf8');
};

// Función para obtener la lista de autores
const getAuthors = () => {
    return readAuthorsFromFile(); // Leemos los autores desde el archivo
};

// Función para agregar un nuevo autor
const addAuthor = (author) => {
    if (!author.name || !author.country) {
        throw new Error('Author must have name and country');
    }

    // Leemos los autores existentes
    const authors = readAuthorsFromFile();

    // Generamos un ID único para el nuevo autor
    const newAuthor = {
        id: uuid4(),
        name: author.name,
        country: author.country
    };

    // Agregamos el nuevo autor a la lista
    authors.push(newAuthor);

    // Escribimos la lista actualizada al archivo
    writeAuthorsToFile(authors);

    // Devolvemos el autor agregado 
    return newAuthor;
};

module.exports = { getAuthors, addAuthor };
