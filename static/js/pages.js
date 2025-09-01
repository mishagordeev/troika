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

            if (section.is_have_search) {
                addSearchField(secDiv, section.search_label, section.is_have_collapse_button);
            } else {
                if (section.isExpandablePanel) {
                    secDiv.classList.add("expandable-panel");
                    secDiv.innerHTML = `<div class="panel-header"><h2>${section.title}</h2><span class="arrow">▼</span></div><div class="panel-content"><div class="panel-inner">${section.content}</div></div>`;
                } else {
                    secDiv.classList.add("section");
                    if (section.is_page_search_ignored) 
                        secDiv.innerHTML = `<h2 class='page-search-ignored'>${section.title}</h2>${section.content}`; 
                    else {
                        secDiv.innerHTML = `<h2>${section.title}</h2>${section.content}`; 
                    }
                }
            }

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

    const panels = document.querySelectorAll('.expandable-panel');
    
    panels.forEach(panel => {
        const header = panel.querySelector('.panel-header');
        const content = panel.querySelector('.panel-content');
        const arrow = panel.querySelector('.arrow');
        
        header.addEventListener('click', function() {

            ExpandablePanelClick(content,header,arrow);


        });
    });

    generatePageNavigation(pages, page);
}

function ExpandablePanelClick(content, header, arrow) {
    if (content.classList.contains('open')) {
        content.style.height = content.scrollHeight + 'px';
        requestAnimationFrame(() => {
            content.style.height = '0px';
        });
        content.classList.remove('open');
    } else {
        content.classList.add('open');
        content.style.height = content.scrollHeight + 'px';
        content.addEventListener('transitionend', () => {
            content.style.height = 'auto';
        }, { once: true });
    }

    header.classList.toggle('open');
    arrow.classList.toggle('open');
}


function addSearchField(container, searchLabel, isHaveCollapseButton) {
    const searchContainer = document.createElement('div');
    searchContainer.id = 'search_container';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'searchInput';
    input.placeholder = searchLabel;

    searchContainer.appendChild(input);
    container.prepend(searchContainer);

    const clearBtn = document.createElement('span');
    clearBtn.classList.add('clear-btn');
    clearBtn.innerHTML = '&times;';

    clearBtn.style.display = 'none';

    if (isHaveCollapseButton) {
        const collapseButton = document.createElement('button');
        let isCooldown = false;
        // collapseButton.textContent = "▼▼";
        collapseButton.innerHTML = "<span class='arrow'>▼</span><span class='arrow'>▼</span>"
        collapseButton.classList.add('collapse-button');
        collapseButton.addEventListener('click', function() {


        });

        searchContainer.appendChild(collapseButton);

        collapseButton.addEventListener('click', function() {

            if (isCooldown) {
                console.log(isCooldown);
                return;
            }

            isCooldown = true;

            const arrows = collapseButton.querySelectorAll('.arrow');
            arrows.forEach(arrow => {
                arrow.classList.toggle('open');
            });

            const panels = document.querySelectorAll('.expandable-panel');
            panels.forEach(panel => {
                const header = panel.querySelector('.panel-header');
                const content = panel.querySelector('.panel-content');
                const arrow = panel.querySelector('.arrow');     
                
                ExpandablePanelClick(content,header,arrow);
            });

            setTimeout(() => {
                isCooldown = false;
                console.log(isCooldown);
            }, 500);
        });
    }

    searchContainer.appendChild(clearBtn);

    input.addEventListener('input', function () {
        clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
        filterContent(this.value);
    });

    clearBtn.addEventListener('click', function () {
        input.value = '';
        clearBtn.style.display = 'none';
        filterContent('');
        input.focus();
    });
}

function filterContent(query) {
    const sections = document.querySelectorAll('#content h2');
    sections.forEach(h2 => {
        if (!h2.classList.contains('page-search-ignored')) {
            const section = h2.closest('.section') || h2.closest('.expandable-panel');
            if (h2.textContent.toLowerCase().includes(query.toLowerCase())) {
                section.style.display = '';
                if (section.classList.contains('expandable-panel')) {
                    section.style.marginBottom = '15px';
                }
            } else {
                section.style.display = 'none';
                if (section.classList.contains('expandable-panel')) {
                    section.style.marginBottom = 0;
                }
            }
        }
    });
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