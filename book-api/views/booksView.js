// Formatea la respuesta de los libros para que sea legible
const formatBooksResponse = (books) => {
    if (books.length === 0) return ' No hay libros disponibles.';

    // Formateamos cada libro para mostrar ID, título, autor y editorial
    return books.map(book =>
        ` ${book.id} - "${book.title}" (Año: ${book.year})\n   Autor ID: ${book.author_id} | Editorial ID: ${book.publisher_id} | Género: ${book.genre}`
    ).join('\n'); // Unimos todas las líneas en un solo string
};

module.exports = { formatBooksResponse };
