
const logoutLink = document.getElementById('logout-link');

// Agregar event listener al enlace "Cerrar Sesión"
logoutLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    window.location.href = '../login/login.html';
});


document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = `${user.nombre} ${user.apellido}`;
    } else {
        console.error('No se encontró información del usuario en localStorage.');
    }
});
