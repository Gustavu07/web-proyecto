const api = 'http://localhost:4000';
let cursos = [];

document.addEventListener('DOMContentLoaded', async function() {
    const coursesContainer = document.getElementById('courses-container');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-button');
    const saveButton = document.getElementById('save-button');
    const deleteButton = document.getElementById('delete-button');
    const courseForm = document.getElementById('course-form');
    let currentCourseId = null; // Variable para almacenar el I
    
    
    if (!coursesContainer) {
        console.error('Error: No se encontró el elemento con id "courses-container".');
        return;
    }

    if (!modal) {
        console.error('Error: No se encontró el elemento con id "modal".');
        return;
    }

    if (!closeButton) {
        console.error('Error: No se encontró el elemento con id "close-button".');
        return;
    }


    try {
        const response = await fetch(`${api}/cursos`);
        cursos = await response.json();
        renderCourses(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        coursesContainer.innerHTML = '<p>Error al cargar los cursos.</p>';
    }

    function renderCourses(cursos) {
        coursesContainer.innerHTML = '';
        cursos.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${api}/${curso.imagenes}" alt="${curso.nombre}">
                <div class="card-content">
                    <h2>${curso.nombre}</h2>
                    <p>${curso.descripcion}</p>
                    <p>Fecha de inicio: ${new Date(curso.fecha_inicio).toLocaleDateString()}</p>
                    <p>Fecha de fin: ${new Date(curso.fecha_fin).toLocaleDateString()}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                openModal(curso);
            });
            coursesContainer.appendChild(card);
        });
        console.log(cursos);
    }


    function openModal(curso) {
        document.getElementById('course-name').value = curso.nombre;
        document.getElementById('course-description').value = curso.descripcion;
        document.getElementById('course-university').value = curso.universidad_o_procedencia;
        document.getElementById('course-level').value = curso.nivel;
        document.getElementById('course-language').value = curso.idioma;
        document.getElementById('course-start').value = new Date(curso.fecha_inicio).toISOString().split('T')[0];
        document.getElementById('course-end').value = new Date(curso.fecha_fin).toISOString().split('T')[0];

        currentCourseId = curso.id_curso;
        console.log('Current Course ID:', currentCourseId); // Verifica el ID del curso

    modal.style.display = 'flex';
    }


    saveButton.onclick = async function (e) {
        e.preventDefault();
        if (currentCourseId === null) {
            console.error('Error: currentCourseId es null.');
            return;
        }
        const updatedCourse = {
            nombre: document.getElementById('course-name').value,
            descripcion: document.getElementById('course-description').value,
            universidad_o_procedencia: document.getElementById('course-university').value,
            nivel: document.getElementById('course-level').value,
            idioma: document.getElementById('course-language').value,
            fecha_inicio: new Date(document.getElementById('course-start').value).toISOString(),
            fecha_fin: new Date(document.getElementById('course-end').value).toISOString(),
        };

        try {
            await fetch(`${api}/cursos/${currentCourseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCourse)
            });
            modal.style.display = 'none';
            const response = await fetch(`${api}/cursos`);
            cursos = await response.json();
            renderCourses(cursos);
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
        }
    };

    deleteButton.onclick = async function (e) {
        e.preventDefault();
        if (currentCourseId === null) {
            console.error('Error: currentCourseId es null.');
            return;
        }
        try {
            await fetch(`${api}/cursos/${currentCourseId}`, {
                method: 'DELETE'
            });
            modal.style.display = 'none';
            const response = await fetch(`${api}/cursos`);
            cursos = await response.json();
            renderCourses(cursos);
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    };

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});