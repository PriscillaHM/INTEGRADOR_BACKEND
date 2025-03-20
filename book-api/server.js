//En el archivo server.js, implementa el servidor TCP utilizando el módulo NET.
//Configura el servidor para escuchar conexiones en el puerto 8080 y para recibir comandos de los clientes.
//Asegúrate de manejar correctamente múltiples conexiones y de devolver respuestas claras a los clientes.
//Implementa el manejo de errores para asegurar que el servidor responda de manera adecuada a diferentes situaciones.


const net = require('net');

// Aca se importan los controladores
const booksController = require('./controllers/booksController');
const publishersController = require('./controllers/publishersController');
const authorsController = require('./controllers/authorsController');

// Importamos la funcion v4 del paquete uuid
const { v4: uuid4 } = require('uuid');

// Validamos si una cadena es o no JSON
function isjson(str) {
    return str.startsWith('{') && str.endsWith('}');
}

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('client connected');
    socket.on('data', (data) => {
        const command = data.toString().trim();

        // Comando para obtener libros
        if (command === 'GET BOOKS') {
            const response = booksController.getBooks();
            console.log('Sending response:', response);
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

        // Comando para obtener autores
        else if (command === 'GET AUTHORS') {
            const response = authorsController.getAuthors();
            console.log('Sending response:', response);
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

        // Comando para obtener editoriales
        else if (command === 'GET PUBLISHERS') {
            const response = publishersController.getPublishers();
            console.log('Sending response:', response);
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

        // Si el comando no se reconoce
        else {
            socket.write('Unrecognized command');
        }
    });

    socket.on('end', () => {
        console.log('Communication has ended');
    });
});

// Puerto a escuchar

server.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
})
