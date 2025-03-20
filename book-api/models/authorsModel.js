//Importamos los modulos necesarios
//Modulo fs para manejar archivos
const fs = require('fs');
//Modulo para manejar rutas de archivos
const path = require('path');
// Para generar un ID único para cada autor
const { v4: uuid4 } = require('uuid'); 

// Definimos la ruta al archivo donde se almacenan los autores
const authorsFilePath = path.join(__dirname, '../data/authors.json'); // Ruta al archivo authors.json

/**
 * Lee el archivo de autores y lo convierte a un objeto JavaScript.
 * @returns {Array} Lista de autores almacenadas en el archivo
 */
const readAuthorsFromFile = () => {
    try {
        // Leemos el contenido del archivo
        const data = fs.readFileSync(authorsFilePath, 'utf8');

        // Parseamos el JSON a un objeto JavaScript
        return JSON.parse(data); 
    } catch (error) {
        // Si hay un error (por ejemplo, el archivo no existe), retornamos un array vacío
        return []; 
    }
};

/**
 * Escribe la lista de autores en el archivo JSON.
 * @param {Array} authors - Lista de autores actualizada
 */
const writeAuthorsToFile = (authors) => {
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 2), 'utf8');
};

/**
 * Obtiene la lista de todos los autores almacenados.
 * @returns {Array} - Lista de autores
 */
const getAuthors = () => {
    // Leemos los autores desde el archivo
    return readAuthorsFromFile(); 
};

/**
 * Agrega un nuevo autor a la lista y lo gurada en el archivo
 * @param {Object} author - Objecto con los datos del autor
 * @returns {Object} El autor agregado con su ID
 */
const addAuthor = (author) => {
    // Validamos que el autor tenga los datos requeridos
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

// Exportamos las funciones para ser utilizadas en otros módulos
module.exports = { getAuthors, addAuthor };