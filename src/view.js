// Frontend FAQ Accordion JS (optional for interactivity)
document.addEventListener('DOMContentLoaded', function () {
    const accordions = document.querySelectorAll('.em-faq-accordion .faq-question');
    accordions.forEach(btn => {
        btn.addEventListener('click', function () {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            const answer = btn.nextElementSibling;
            if (answer) {
                answer.hidden = expanded;
            }
        });
    });
});
