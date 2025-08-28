export function initMobileView() {
    const menuBtn = document.querySelector('.menu-btn');
    const sideMenu = document.querySelector('.side-menu');
    const body = document.body;
    const overlay = document.querySelector('.content-overlay');

    if (!menuBtn || !sideMenu || !overlay) return;

    let scrollPosition = 0;

    function toggleMenu(forceClose = false) {

        if (forceClose) {
            body.classList.remove('menu-open');
            overlay.style.display = 'none';

            document.body.classList.remove('no-scroll');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);

        } else {
            sideMenu.scrollTop = 0;
            body.classList.toggle('menu-open');
            overlay.style.display = body.classList.contains('menu-open') ? 'block' : 'none';

            scrollPosition = window.scrollY;
            document.body.classList.add('no-scroll');
            document.body.style.top = `-${scrollPosition}px`;
        }
    }

    menuBtn.addEventListener('click', function() {
        if (body.classList.contains('menu-open')) {
            toggleMenu(true)
        } else {
            toggleMenu();
        }
    });

    overlay.addEventListener('click', () => toggleMenu(true));

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                scrollPosition = 0;
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