# INTEGRADOR BACKEND - 📚 BOOK API
Trabajo practico inetgrador de Backend Modulo 3

#  Descripción
Este proyecto es una API para gestionar libros, autores y editoriales usando Node.js. Implementa un servidor TCP para interactuar con los datos.

# Prerrequisitos
Antes de comenzar, asegúrate de tener instalados los siguientes programas y herramientas en tu computadora:
1. **Node.js:** Plataforma de ejecución para código JavaScript y dependencias del proyecto.
2. **npm:** Necesario para la gestión de paquetes y dependencias del proyecto.

# Instalación 
En caso de tener las herramientas, te mostraremos cómo instalarlas.
#Instalacion en Windows
Para instalar Node.js y npm, puede descargarlo desde [la pagina oficial Node.js.](https://nodejs.org/en) Durante la instalación, asegúrate de seleccionar la opción para instalar npm, que viene incluido.

 Verificamos que se hayan instalado de manera correcta con los siguientes comandos en el simbolo de sistema o powershell:
 ```
node -v
```
```
npm -v
```
# Clonar repositorio 
Para clonar el repositorio debes crear una carpeta nueva, despues desde la terminar navegas hacia esa carpeta y usas el siguiente comando: 
```
git clone https://github.com/PriscillaHM/INTEGRADOR_BACKEND
```
Despues debes navegar hacia la carpeta principal del proyecto 
```
cd book-api
```
Y nuevamente usas el comando para ingresar a la segunda carpeta
```
cd book-api
```

#  Estructura del Proyecto
book-api/
│── controllers/      # Lógica de negocio
│── data/             # Archivos JSON (libros, autores, editoriales)
│── models/           # Modelos para manejar datos
│── views/            # Formato de respuesta
│── server.js         # Servidor TCP
│── client.js         # Cliente TCP
│── package.json      # Configuración del proyecto
│── README.md         # Documentación

# Ejecutar servidor 
En la terminar usa el comando 
```
npm start
```
Debe salir el mensaje: 

**Servidor escuchando en el puerto 8080**

# Ejecutar cliente
En una terminar nueva debes usar el siguiente comando:
```
node client.js
```
Al ejecutar el cliente, en la terminal del servidor saldra el siguiente mensaje:

**client connected**

#  Comandos disponibles
En el cliente TCP, puedes ejecutar los siguientes comandos:

- Obtener todos los libros:GET BOOKS

- Agregar un nuevo libro: ADD BOOK {"title": "Nuevo Libro", "author": "Autor X", "publisher": "Editorial Y"}

- Obtener todos los autores: GET AUTHORS

- Agregar un nuevo autor: ADD AUTHOR {"name": "Autor X", "nationality": "Argentina"}

# Manejo de errores
Si se ingresa un comando incorrecto, el cliente devolverá un mensaje de error, por ejemplo:

**"error": "Comando no reconocido"**

# Desconectar el servidor y cliente 
Para desconectar el servidor y el cliente debes usar:

**ctrl + C**
