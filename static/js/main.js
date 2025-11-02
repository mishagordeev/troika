import { buildNavigationMenu } from "./navigation.js";
import { loadPages, loadPage, navigateTo, getPages, loadFooter } from "./pages.js";
import { initMobileView } from './mobile.js';

async function initApp() {
    await loadPages();
    const pages = getPages();

    buildNavigationMenu(pages,navigateTo);
    initMobileView();
    loadFooter();

    let initialPath = window.location.pathname;
    let page = pages.find((p) => p.path === initialPath);
    if (!page) {
        page = pages[0];
        history.replaceState({ pageId: page.id }, page.title, page.path);
    }

    loadPage(page.path);

    window.addEventListener("popstate", (event) => {
        if (event.state?.pageId) {
            const page = pages.find((p) => p.id === event.state.pageId);
            if (page) {
                loadPage(page.path);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", initApp);