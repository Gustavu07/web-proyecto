document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true' || false;
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', false);
                h.nextElementSibling.style.maxHeight = null;
            });
            header.setAttribute('aria-expanded', !expanded);
            const content = header.nextElementSibling;
            if (!expanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
