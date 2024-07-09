const api = 'http://localhost:4000';

// esto es solo ejemplo 
export async function getAll() { //misma logica para eliminar usuario
    const response = await fetch(`${api}/usuarios`);
    const resultado = await response.json();
    return resultado;
}


export async function create(usuario) {
    const response = await fetch(`${api}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    const resultado = await response.json(); //para hacer el post
    return resultado;
    
    //put actualizar la informacion del usuario
}

export async function update(id, usuario) {
    const response = await fetch(`${api}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    const resultado = await response.json();
    return resultado;
}

export async function deleteById(id) {
    const response = await fetch(`${api}/usuarios/${id}`, {
        method: 'DELETE'
    })
    const resultado = await response.json();
    return resultado;
}

document.getElementById('userDropdown').addEventListener('click', function(event) {
    event.preventDefault();
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('hidden');
});

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login/login.html';
});

// Cerrar el menú si se hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        const dropdowns = document.getElementsByClassName('dropdown-menu');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('hidden')) {
                openDropdown.classList.add('hidden');
            }
        }
    }
};

