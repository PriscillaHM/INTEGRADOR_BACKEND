//Importamos los modulos necesarios
//Modulo fs para manejar archivos
const fs = require('fs');
//Modulo para manejar rutas de archivos
const path = require('path');
// Para generar un ID único para cada editorial
const { v4: uuid4 } = require('uuid');

// Definimos la ruta al archivo donde se almacenan las editoriales
const publishersFilePath = path.join(__dirname, '../data/publishers.json'); // Ruta al archivo publishers.json

// Función para leer el archivo y parsearlo
const readPublishersFromFile = () => {
    try {
        const data = fs.readFileSync(publishersFilePath, 'utf8');
        return JSON.parse(data); // Parseamos el JSON a un objeto JavaScript
    } catch (error) {
        return []; // Si no existe el archivo o hay un error, devolvemos un array vacío
    }
};

// Función para escribir las editoriales al archivo
const writePublishersToFile = (publishers) => {
    fs.writeFileSync(publishersFilePath, JSON.stringify(publishers, null, 2), 'utf8');
};

// Función para obtener la lista de editoriales
const getPublishers = () => {
    return readPublishersFromFile(); // Leemos las editoriales desde el archivo
};

// Función para agregar una nueva editorial
const addPublisher = (publisher) => {
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

module.exports = { getPublishers, addPublisher };
