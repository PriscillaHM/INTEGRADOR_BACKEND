//Importamos los modulos necesarios
//Modulo fs para manejar archivos
const fs = require('fs');
//Modulo para manejar rutas de archivos
const path = require('path');
// Para generar un ID único para cada autor
const { v4: uuid4 } = require('uuid'); 

// Definimos la ruta al archivo donde se almacenan los autores
const authorsFilePath = path.join(__dirname, '../data/authors.json'); // Ruta al archivo authors.json

// Función para leer el archivo y parsearlo
/**
 * Lee el archivo de autores y lo convierte a un objeto JavaScript.
 * @returns {Array} Lista de autores almacenados en el archivo.
 */
const readAuthorsFromFile = () => {
    try {
        // Leemos el contenido del archivo
        const data = fs.readFileSync(authorsFilePath, 'utf8');

        // Parseamos el contenido JSON a un objeto JavaScript y lo retornamos
        return JSON.parse(data); 
    } catch (error) {
        // Si hay un error (por ejemplo, el archivo no existe), retornamos un array vacío
        return [];
    }
};

// Función para escribir los autores al archivo
/**
 * Escribe la lista de autores en el archivo JSON.
 * @param {Array} authors - Lista de autores actualizada.
 */
const writeAuthorsToFile = (authors) => {
    // Guardamos la lista de autores en formato JSON con indentación de 2 espacios
    fs.writeFileSync(authorsFilePath, JSON.stringify(authors, null, 2), 'utf8');
};

/**
 * Obtiene la lista de todos los autores almacenados.
 * @returns {Array} - Lista de autores.
 */
const getAuthors = () => {
    // Leemos los autores desde el archivo
    return readAuthorsFromFile(); 
};

/**
 * Agrega un nuevo autor a la lista y lo guarda en el archivo.
 * @param {Objetc} author  - Objeto con los datos del autor a agregar.
 * @param {string} author.name - Nombre del autor
 * @param {string} author.country - País de origen del autor.
 * @returns {Object} El autor agregado con su ID
 * @throws {Error} Si falta el nombre o el país.
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

    // Devolvemos el autor agregado (puede ser útil para el controlador)
    return newAuthor;
};

// Exportamos las funciones para ser utilizadas en otros módulos
module.exports = { getAuthors, addAuthor };