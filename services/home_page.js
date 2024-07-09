// home_page.js

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.results .card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const url = card.getAttribute('data-url');
            window.location.href = url;
        });
    });
});
