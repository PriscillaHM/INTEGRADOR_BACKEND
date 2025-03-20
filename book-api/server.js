/**
 * Servidor TCP implementado con el módulo 'net' de Node.js.
 * - Escucha conexiones en el puerto 8080.
 * - Recibe comandos de clientes y devuelve respuestas adecuadas.
 * - Maneja múltiples conexiones simultáneamente.
 * - Implementa manejo de errores para asegurar una respuesta robusta.
 */

//Importamos el modulo net
const net = require('net');

// Importamos los controladores para gestionar libros, editoriales y autores
const booksController = require('./controllers/booksController');
const publishersController = require('./controllers/publishersController');
const authorsController = require('./controllers/authorsController');

// Importamos la función v4 de uuid para generar IDs únicos
const { v4: uuid4 } = require('uuid');

/**
 * Verifica si una cadena de texto tiene formato JSON válido.
 * @param {string} str - Cadena a validar.
 * @returns {boolean} true si la cadena tiene formato JSON, false en caso contrario.
 */
function isjson(str) {
    return str.startsWith('{') && str.endsWith('}');
}

//Creacion del servidor TCP
const server = net.createServer();

// Evento que maneja nuevas conexiones de clientes
server.on('connection', (socket) => {
    console.log('client connected');
    socket.on('data', (data) => {
        const command = data.toString().trim();

        // Manejo de comandos para obtener y agregar libros
        if (command === 'GET BOOKS') {
            const response = booksController.getBooks();
            console.log('Sending response:\n', response);
            socket.write(JSON.stringify(response, null, 2)); // Enviar como JSON
        }
        // Comando para agregar un libro
        else if (command.startsWith('ADD BOOK')) {
            const bookDataString = command.replace('ADD BOOK', '').trim();
            if (isjson(bookDataString)) {
                const bookData = JSON.parse(bookDataString);
                if (bookData && typeof bookData === 'object') {
                    const newBook = { id: uuid4(), ...bookData }; // Usamos uuid4 para generar el ID
                    const response = booksController.addBook(newBook);
                    socket.write(response);
                } else {
                    socket.write('Invalid book data');
                }
            } else {
                socket.write('Error: Invalid JSON format');
            }
        }

        // Manejo de comandos para obtener y agregar autores
        else if (command === 'GET AUTHORS') {
            const response = authorsController.getAuthors();
            console.log('Sending response:\n', response);
            socket.write(JSON.stringify(response, null, 2));
        }
        // Comando para agregar un autor
        else if (command.startsWith('ADD AUTHOR')) {
            const authorDataString = command.replace('ADD AUTHOR', '').trim();
            if (isjson(authorDataString)) {
                const authorData = JSON.parse(authorDataString);
                if (authorData && typeof authorData === 'object') {
                    const newAuthor = { id: uuid4(), ...authorData }; // Usamos uuid4 para generar el ID
                    const response = authorsController.addAuthor(newAuthor);
                    socket.write(response);
                } else {
                    socket.write('Invalid author data');
                }
            } else {
                socket.write('Error: Invalid JSON format');
            }
        }

        // Manejo de comandos para obtener y agregar editoriales
        else if (command === 'GET PUBLISHERS') {
            const response = publishersController.getPublishers();
            console.log('Sending response:\n', response);
            socket.write(JSON.stringify(response, null, 2));
        }
        // Comando para agregar una editorial
        else if (command.startsWith('ADD PUBLISHER')) {
            const publisherDataString = command.replace('ADD PUBLISHER', '').trim();
            if (isjson(publisherDataString)) {
                const publisherData = JSON.parse(publisherDataString);
                if (publisherData && typeof publisherData === 'object') {
                    const newPublisher = { id: uuid4(), ...publisherData }; // Usamos uuid4 para generar el ID
                    const response = publishersController.addPublisher(newPublisher);
                    socket.write(response);
                } else {
                    socket.write('Invalid publisher data');
                }
            } else {
                
                socket.write('Error: Invalid JSON format');
            }
        }

         // Respuesta para comandos no reconocidos
        else {
            socket.write('Unrecognized command');
        }
    });

     // Manejo del evento de finalización de la conexión
    socket.on('end', () => {
        console.log('Communication has ended');
    });
});

// Configuración del servidor para escuchar en el puerto 8080
server.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
})