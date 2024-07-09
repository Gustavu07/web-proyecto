const api = 'http://localhost:4000';

document.getElementById('toggle-switch').addEventListener('change', function() {
    const isChecked = this.checked;
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const formTitle = document.getElementById('form-title');
    
    if (isChecked) {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        formTitle.textContent = 'Iniciar Sesión';
    } else {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        formTitle.textContent = 'Crear Cuenta';
    }
});

const registerFormElement = document.querySelector('#register-form form');
const loginFormElement = document.querySelector('#login-form form');

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (!errorSpan) return; // Añadido: Verifica que el errorSpan exista
        if (input.value.trim() === '') {
            errorSpan.textContent = 'Este campo es requerido';
            errorSpan.style.display = 'block';
            isValid = false;
        } else {
            errorSpan.style.display = 'none';
        }
    });
    return isValid;
}

registerFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(registerFormElement)) {
        return;
    }

    const nombre = document.querySelector('#name').value;
    const apellido = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const contrasena = document.querySelector('#password').value;

    if (contrasena.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    try {
        const response = await fetch(`${api}/usuarios/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, email, contrasena })
        });

        const result = await response.json();
        if (response.ok) {
            showNotification('Cuenta creada exitosamente', 'success');
            localStorage.setItem('user', JSON.stringify(result));
            console.log('Usuario registrado:', result);
            document.getElementById('toggle-switch').checked = true;
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            document.getElementById('form-title').textContent = 'Iniciar Sesión';
        } else {
            showNotification(`Error: ${result.message}`, 'error');
        }
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
});

loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(loginFormElement)) {
        return;
    }

    const email = document.querySelector('#login-email').value;
    const contrasena = document.querySelector('#login-password').value;

    try {
        const response = await fetch(`${api}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contrasena })
        });

        const result = await response.json();
        if (response.ok) {
            showNotification('Inicio de sesión exitoso', 'success');
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            console.log('Usuario autenticado:', result.user);
            if(result.user.rol === 1){
                window.location.href = '../pages/admin.html';
            }else{
                window.location.href = '../pages/home_page.html';
            }
        } else {
            showNotification(`Error: ${result.message}`, 'error');
        }
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
});

