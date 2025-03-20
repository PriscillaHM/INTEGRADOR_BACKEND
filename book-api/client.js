//Importamos el modulo net
const net = require('net');
//Importamos el modulo readline
const readline =require('readline');

/**
 * Creamos una interfaz para leer la entrada del usuario desde la terminal
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Configuración de la conexión con el servidor
 */
const options = {
    port:8080,
    host : '127.0.0.1'
}

/**
 * Establecemos la conexión con el servidor TCP
 */
const client = net.createConnection(options, () => {
    console.log('Satisfactory connection established');
    // Llamada inicial para preguntar al usuario
    promptForCommand();
});

/**
 * unción para solicitar un comando al usuario y enviarlo al servidor.
 */
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


/**
 * Evento que se ejecuta cuando la conexión con el servidor se cierra
 */
client.on('close',()=>{
    console.log('Communication has ended');
    rl.close(); // Cerramos la interfaz de readline
})

/**
 * Evento para manejar errores en la conexión
 */
client.on('error', (err) => {
    console.error('Error with connection: ' + err.message);
    rl.close(); // Cerramos la interfaz de readline en caso de error
});