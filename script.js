const form = document.getElementById('analisis-form');
const resultadoDiv = document.getElementById('resultado-texto');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Mostrar un mensaje de carga
    resultadoDiv.textContent = 'Analizando, por favor espera... Esto puede tardar un momento.';
    
    // Obtener los datos del formulario
    const asignatura = document.getElementById('asignatura').value;
    const semestre = document.getElementById('semestre').value;
    const secuencia = document.getElementById('secuencia').value;

    try {
        // Enviar los datos a nuestro "cerebro" en la ruta /api/analizar
        const response = await fetch('/api/analizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ asignatura, semestre, secuencia }),
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const data = await response.json();
        // Mostrar el resultado devuelto por el cerebro
        resultadoDiv.textContent = data.analisis;

    } catch (error) {
        resultadoDiv.textContent = `Hubo un error al procesar tu solicitud: ${error.message}`;
        console.error(error);
    }
});