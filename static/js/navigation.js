document.addEventListener('DOMContentLoaded', function() {
    fetch('../static/json/pages.json')
        .then(response => response.json())
        .then(data => {
            const pages = data.pages.sort((a, b) => a.order - b.order);
            const currentPath = window.location.pathname.split('/').pop();
            
            generateMenu(pages, currentPath);
            
            generatePageNavigation(pages, currentPath);
        });
});

function generateMenu(pages) {
    const menuContainer = document.querySelector('.side-menu');
    
    let menuHTML = '<ul class="menu-list">';
    pages.forEach(page => {
        menuHTML += `<li class="menu-item"><a href="${page.name}">${page.title}</a></li>`;
    });
    menuHTML += '</ul>';
    
    menuContainer.innerHTML = menuHTML;
}

function generatePageNavigation(pages, currentPath) {
    const content = document.querySelector('#navigation-buttons');

    let currentIndex = -1;
    
    pages.forEach((page, index) => {
        if (page.name === currentPath) {
            currentIndex = index;
        }
    });
    
    if (currentIndex > 0) {
        const prevPage = pages[currentIndex - 1];
        content.innerHTML += `<button class="previous-page-button" id="previous-page-button"><a href="${prevPage.name}" class="prev">← ${prevPage.title}</a></button>`;
    }
    
    if (currentIndex < pages.length - 1 && currentIndex !== -1) {
        const nextPage = pages[currentIndex + 1];
        content.innerHTML += `<button class="next-page-button" id="next-page-button"><a href="${nextPage.name}" class="next">${nextPage.title} →</a></button>`;
    }
}
