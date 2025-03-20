const net = require('net');
const readline =require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const options = {
    port:8080,
    host : '127.0.0.1'
}

const client = net.createConnection(options, () => {
    console.log('Satisfactory connection established');
    // Llamada inicial para preguntar al usuario
    promptForCommand();
});

function promptForCommand() {
    rl.question('Write a command (for example: "GET BOOK" or "ADD BOOK {"id": 1, "title": "El Quijote", "author_id": 1, "publisher_id": 1, "year": 1605, "genre": "Novela" }")\n', (command) => {
        client.write(command); // Enviamos el comando al servidor

        // Después de enviar el comando, esperamos la respuesta del servidor
        //El método .once() de Node.js lo usamos cuando queremos que un evento se ejecute solo una vez. 
        // Esperamos una única respuesta del servidor
        client.once('data', (data) => {
            console.log('Server says: ' + data.toString());
            promptForCommand(); // Volvemos a preguntar por un nuevo comando
        });
    });
}

// Evento para manejar el cierre de la conexión

client.on('close',()=>{
    console.log('Communication has ended');
    rl.close(); // Cerramos la interfaz de readline
})

// Manejo de errores en la conexión
client.on('error', (err) => {
    console.error('Error with connection: ' + err.message);
    rl.close(); // Cerramos la interfaz de readline en caso de error
});