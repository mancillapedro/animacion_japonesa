addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#formAnimation');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('submiteado');
    });
});