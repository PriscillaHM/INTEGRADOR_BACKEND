//Importamos los modulos necesarios
//Modulo fs para manejar archivos
const fs = require('fs');
//Modulo para manejar rutas de archivos
const path = require('path');
// Para generar un ID único para cada editorial
const { v4: uuid4 } = require('uuid');

// Definimos la ruta al archivo donde se almacenan las editoriales
const publishersFilePath = path.join(__dirname, '../data/publishers.json'); // Ruta al archivo publishers.json

/**
 * Lee el archivo de editoriales y lo convierte a un objecto js
 * @returns {Array} Lista de editoriales almacenadas en el archivo
 */
const readPublishersFromFile = () => {
    try {
        // Leemos el contenido del archivo
        const data = fs.readFileSync(publishersFilePath, 'utf8');

        // Parseamos el JSON a un objeto JavaScript
        return JSON.parse(data); 
    } catch (error) {
        // Si no existe el archivo o hay un error, devolvemos un array vacío
        return []; 
    }
};

/**
 * Escribe la lista de editoriales en el archivo JSON.
 * @param {Array} publishers  - Lista de editoriales actualizada
 */
const writePublishersToFile = (publishers) => {
    // Guardamos la lista de autores en formato JSON con indentación de 2 espacios
    fs.writeFileSync(publishersFilePath, JSON.stringify(publishers, null, 2), 'utf8');
};

/**
 * Obtiene la lista de todas las editoriales almacenados.
 * @returns {Array} - Lista de editoriales
 */
const getPublishers = () => {
    return readPublishersFromFile(); // Leemos las editoriales desde el archivo
};

/**
 * Agrega una nueva editorial a la lista y la guarda en el archivo
 * @param {Object} publisher - Objecto con los datos del la editorial a agregar
 * @returns {Object} La editorial agregada
 */
const addPublisher = (publisher) => {
    // Validamos que la editorial tenga los datos requeridos
    if (!publisher.name || !publisher.country) {
        throw new Error('Publisher must have a name and country');
    }

    // Leemos las editoriales existentes
    const publishers = readPublishersFromFile();

    // Generamos un ID único para la nueva editorial
    const newPublisher = {
        id: uuid4(),
        name: publisher.name,
        country: publisher.country
    };

    // Agregamos la nueva editorial a la lista
    publishers.push(newPublisher);

    // Escribimos la lista actualizada al archivo
    writePublishersToFile(publishers);

    // Devolvemos la editorial agregada (puede ser útil para el controlador)
    return newPublisher;
};

// Exportamos las funciones para ser utilizadas en otros módulos
module.exports = { getPublishers, addPublisher };