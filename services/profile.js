const api = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const usuariosid = urlParams.get('id');

    if (courseId) {
        try {
            const response = await fetch(`${api}/usuarios/${usuariosid}`);
            const curso = await response.json();

            document.getElementById('course-name').textContent = curso.nombre;
            document.getElementById('course-description').textContent = curso.descripcion;
            document.getElementById('course-language').innerHTML = `<i class="fa-solid fa-language"></i> ${curso.idioma}`;
            document.getElementById('course-image').alt = curso.nombre;
        } catch (error) {
            console.error('Error al obtener los detalles del Usuario:', error);
        }
    } else {
        console.error('No se proporcionó un ID de Usuario.');
    }
});

//logica de carrsule en index