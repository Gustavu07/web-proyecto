const api = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-course-form');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Obtener el usuario desde localStorage y parsearlo
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id_user) {
            alert('Usuario no autenticado o inválido.');
            return;
        }

        const usuarioid = user.id_user;
        const formData = new FormData(event.target);

        formData.append('id_user', usuarioid );
        console.log([...formData.entries()]);

        try {
            const response = await fetch(`${api}/cursos`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                alert('Curso añadido exitosamente');
                form.reset();
                window.location.href = '../pages/admin.html';
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error al añadir curso:', error);
            alert('Error al añadir curso');
        }
    });
});
