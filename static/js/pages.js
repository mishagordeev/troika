let pages = [];

export async function loadPages() {
    const res = await fetch("/pages");
    pages = await res.json();
}

export function getPages() {
    return pages;
}

export function loadPage(path) {
    const page = pages.find(p => p.path === path);
    if (!page) return;

    window.scrollTo(0, 0);

    document.title = `Тройка! – ${page.title}`

    const title = document.getElementById("page-title");
    const content = document.getElementById("content");

    title.textContent = page.title;
    content.innerHTML = "";

    if (page.content) {
        const mainDiv = document.createElement("div");
        mainDiv.innerHTML = page.content;
        content.appendChild(mainDiv);
    }

    if (page.sections?.length) {
        page.sections.forEach((section) => {
            const secDiv = document.createElement("div");
            secDiv.classList.add("section");
            secDiv.innerHTML = `<h2>${section.title}</h2>${section.content}`;
            content.appendChild(secDiv);
        });
    }

    document.querySelectorAll('em').forEach(em => {
        em.innerHTML = em.innerHTML.replace(/([A-ZА-ЯЁ])/g, '<span class="capital-letter">$1</span>');
        em.innerHTML = em.innerHTML.replace(/([1-9])/g, '<span class="numbers">$1</span>');
    });
    document.querySelectorAll('em').forEach(em => {
        em.innerHTML = em.innerHTML.replace(/([1-9])/g, '<span class="numbers">$1</span>');
    });
    generatePageNavigation(pages, page);
}

export function navigateTo(path) {
    const page = pages.find((p) => p.path === path);
    if (!page) return;
    history.pushState({ pageId: page.id }, page.title, page.path);
    loadPage(page.path);
}

function generatePageNavigation(pages, currentPage) {
    const NavigationButtonscontainer = document.querySelector('#navigation-buttons-container');
    NavigationButtonscontainer.innerHTML = "";

    let currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex > 0) {
        const prevPage = pages[currentIndex - 1];
        const button = document.createElement('button');  
        button.id = 'previous-page-navigation-button';
        button.className = 'navigation-button';  
        button.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo(prevPage.path);
        });
        button.textContent = `☚ ${prevPage.title}`;
        NavigationButtonscontainer.appendChild(button);
    }
    
    if (currentIndex < pages.length - 1 && currentIndex !== 0) {
        NavigationButtonscontainer.style.justifyContent = "space-between";
        const nextPage = pages[currentIndex + 1];
        const button = document.createElement('button');  
        button.id = 'next-page-navigation-button';
        button.className = 'navigation-button';  
        button.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo(nextPage.path);
        });
        button.textContent = `${nextPage.title} ☛`;
        NavigationButtonscontainer.appendChild(button);
    }

    if (currentIndex == 0) {
        const nextPage = pages[1];;
        NavigationButtonscontainer.style.justifyContent = "flex-end";
        const button = document.createElement('button');  
        button.id = 'next-page-navigation-button';
        button.className = 'navigation-button';  
        button.addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo(nextPage.path);
        });
        button.textContent = `${nextPage.title} ☛`;
        NavigationButtonscontainer.appendChild(button);
    }
}