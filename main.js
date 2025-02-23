document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Navigation link clicked:', this.textContent);
        });
    });

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const input = form.querySelector('input[type="text"]');
            if (input && input.value.trim() === '') {
                event.preventDefault();
                alert('Please fill out the required field.');
            }
        });
    }
});