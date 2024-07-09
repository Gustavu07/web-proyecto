const api = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (courseId) {
        try {
            const response = await fetch(`${api}/cursos/${courseId}`);
            const curso = await response.json();

            document.getElementById('course-name').textContent = curso.nombre;
            document.getElementById('course-description').textContent = curso.descripcion;
            document.getElementById('course-language').innerHTML = `<i class="fa-solid fa-language"></i> ${curso.idioma}`;
            document.getElementById('course-instructor').innerHTML = `Instructor: <a href="#">${curso.universidad_o_procedencia}</a>`;
            document.getElementById('course-start-date').textContent = `Fecha de inicio: ${new Date(curso.fecha_inicio).toLocaleDateString()}`;
            document.getElementById('course-image').alt = curso.nombre;
        } catch (error) {
            console.error('Error al obtener los detalles del curso:', error);
        }
    } else {
        console.error('No se proporcionó un ID de curso en la URL.');
    }

    const redirectButton = document.getElementById('redirect-button');

    redirectButton.addEventListener('click', () => {
        window.location.href = '../pages/listacursos.html'; // Reemplaza 'otra_pagina.html' con la URL de la página a la que deseas redirigir
    });
});


