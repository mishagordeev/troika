document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('em').forEach(em => {
        em.innerHTML = em.innerHTML.replace(/([A-ZА-ЯЁ])/g, '<span class="capital-letter">$1</span>');
        em.innerHTML = em.innerHTML.replace(/([1-9])/g, '<span class="numbers">$1</span>');
    });
    document.querySelectorAll('em').forEach(em => {
        em.innerHTML = em.innerHTML.replace(/([1-9])/g, '<span class="numbers">$1</span>');
    });
});