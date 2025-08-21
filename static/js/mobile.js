export function initMobileView() {
    const menuBtn = document.querySelector('.menu-btn');
    const sideMenu = document.querySelector('.side-menu');
    const body = document.body;
    const overlay = document.querySelector('.content-overlay');

    if (!menuBtn || !sideMenu || !overlay) return;

    function toggleMenu(forceClose = false) {
        if (forceClose) {
            body.classList.remove('menu-open');
            overlay.style.display = 'none';
        } else {
            sideMenu.scrollTop = 0;
            body.classList.toggle('menu-open');
            overlay.style.display = body.classList.contains('menu-open') ? 'block' : 'none';
        }
    }

    menuBtn.addEventListener('click', () => toggleMenu());

    overlay.addEventListener('click', () => toggleMenu(true));

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu(true);
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            toggleMenu(true);
        }
    });
}