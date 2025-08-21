export function initMobileView() {
    const menuBtn = document.querySelector('.menu-btn');
    const sideMenu = document.querySelector('.side-menu');
    const body = document.body;
    const overlay = document.querySelector('.content-overlay');

    if (!menuBtn || !sideMenu || !overlay) return;

    // Переключение меню
    function toggleMenu(forceClose = false) {
        if (forceClose) {
            body.classList.remove('menu-open');
            overlay.style.display = 'none';
        } else {
            body.classList.toggle('menu-open');
            overlay.style.display = body.classList.contains('menu-open') ? 'block' : 'none';
        }
    }

    // Клик по кнопке меню
    menuBtn.addEventListener('click', () => toggleMenu());

    // Клик по оверлею закрывает меню
    overlay.addEventListener('click', () => toggleMenu(true));

    // Клик по пункту меню
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu(true); // Закрываем меню на мобильных после выбора
            }
        });
    });

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            toggleMenu(true);
        }
    });
}