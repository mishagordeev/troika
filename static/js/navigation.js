export function buildNavigationMenu(pages, navigateTo) {
    const menuContainer = document.querySelector('.side-menu');
    const list = document.createElement('ul'); 
    list.className = 'menu-list';

    pages
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .forEach((page) => {
      const listItem = document.createElement('li');  
      listItem.className = 'menu-item';  

      const link = document.createElement("a");
      link.textContent = page.title;
      link.href = page.path;
      link.dataset.pageId = page.id;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(page.path);
      });

      listItem.appendChild(link);
      list.appendChild(listItem);

    });

    menuContainer.appendChild(list)
}