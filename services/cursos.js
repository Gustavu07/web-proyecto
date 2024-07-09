const api = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', async function() {
    const courseList = document.getElementById('course-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const autocompleteList = document.getElementById('autocomplete-list');
    //aqui
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');



    if (!courseList) {
        console.error('Error: No se encontró el elemento con id "course-list".');
        return;
    }

    if (!searchInput) {
        console.error('Error: No se encontró el elemento con id "search-input".');
        return;
    }
    if (!searchButton) {
        console.error('Error: No se encontró el elemento con id "search-button".');
        return;
    }

    if (!autocompleteList) {
        console.error('Error: No se encontró el elemento con id "autocomplete-list".');
        return;
    }

    try {
        const response = await fetch(`${api}/cursos`);
        cursos = await response.json();

        renderCourses(cursos);

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const filteredCourses = cursos.filter(curso => curso.nombre.toLowerCase().includes(query));
            renderAutocompleteList(filteredCourses);
        });
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase();
            const filteredCourses = cursos.filter(curso => curso.nombre.toLowerCase().includes(query));
            renderCourses(filteredCourses);
        });

        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterCourses();
            });
        });

    } catch (error) {
        console.error('Error al obtener los cursos:', error);
    }
});

function filterCourses() {
    const selectedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(checkbox => checkbox.value);
    const filteredCourses = cursos.filter(curso => {
        return selectedFilters.includes(curso.idioma) || selectedFilters.includes(curso.nivel);
    });
    renderCourses(filteredCourses);
}

function renderCourses(cursos) {
    const courseList = document.getElementById('course-list');
    if (!courseList) {
        console.error('Error: No se encontró el elemento con id "course-list" en renderCourses.');
        return;
    }
    courseList.innerHTML = '';
    console.log(cursos)
    cursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${api+'/'+curso.imagenes}" alt="${curso.nombre}">
            <div class="card-content">
                <h2>${curso.nombre}</h2>
                <p>${curso.descripcion}</p>   
                <p>Fecha de inicio: ${new Date(curso.fecha_inicio).toLocaleDateString()}</p>
                <p>Fecha de fin: ${new Date(curso.fecha_fin).toLocaleDateString()}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `../pages/details.html?id=${curso.id_curso}`;
        });

        courseList.appendChild(card);
    });
}

function renderAutocompleteList(filteredCourses) {
    const autocompleteList = document.getElementById('autocomplete-list');
    if (!autocompleteList) {
        console.error('Error: No se encontró el elemento con id "autocomplete-list" en renderAutocompleteList.');
        return;
    }
    autocompleteList.innerHTML = '';
    filteredCourses.forEach(curso => {
        const item = document.createElement('div');
        item.textContent = curso.nombre;
        item.addEventListener('click', () => {
            document.getElementById('search-input').value = curso.nombre;
            autocompleteList.innerHTML = '';
            // Aquí puedes agregar la funcionalidad para mostrar solo los cursos filtrados
            renderCourses([curso]);
        });
        autocompleteList.appendChild(item);
    });
}
