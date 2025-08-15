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
    const NavigationButtonscontainer = document.querySelector('#navigation-buttons-container');

    let currentIndex = -1;
    
    pages.forEach((page, index) => {
        if (page.name === currentPath) {
            currentIndex = index;
        }
    });
    
    if (currentIndex > 0) {
        const prevPage = pages[currentIndex - 1];
        NavigationButtonscontainer.innerHTML += `<button class="navigation-button" id="previous-page-navigation-button" onclick="window.location.href='${prevPage.name}'">☚ ${prevPage.title}</button>`;
    }
    
    if (currentIndex < pages.length - 1 && currentIndex !== 0) {
        const nextPage = pages[currentIndex + 1];
        NavigationButtonscontainer.innerHTML += `<button class="navigation-button" id="next-page-navigation-button" onclick="window.location.href='${nextPage.name}'">${nextPage.title} ☛</button>`;
    }

    if (currentIndex == 0) {
        const nextPage = pages[1];;
        NavigationButtonscontainer.style.justifyContent = "flex-end";
        NavigationButtonscontainer.innerHTML += `<button class="navigation-button" id="next-page-navigation-button" onclick="window.location.href='${nextPage.name}'">${nextPage.title} ☛</button>`;
    }
}