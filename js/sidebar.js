import { sidebarItems } from './sidebar-model.js';

document.addEventListener("DOMContentLoaded", function() {
    function createSidebarItem(item) {
        const li = document.createElement('li');
        li.className = 'nav-item';

        if (item.children) {
            // Jika memiliki anak, buat struktur collapse
            const collapseId = `collapse-${Math.random().toString(36).substr(2, 9)}`;
            li.innerHTML = `
                <a data-bs-toggle="collapse" href="#${collapseId}" class="collapsed" aria-expanded="false">
                    <i class="${item.icon}"></i>
                    <p>${item.title}</p>
                    <span class="caret"></span>
                </a>
                <div class="collapse" id="${collapseId}">
                    <ul class="nav nav-collapse">
                        ${item.children.map(subItem => createSidebarItem(subItem).outerHTML).join('')}
                    </ul>
                </div>
            `;
        } else {
            // Jika tidak memiliki anak, buat link biasa
            li.innerHTML = `
                <a href="${item.link}">
                    <i class="${item.icon}"></i>
                    <p>${item.title}</p>
                </a>
            `;
        }

        return li;
    }

    function buildSidebar(items) {
        const ul = document.createElement('ul');
        ul.className = 'nav nav-secondary';
        items.forEach(item => {
            ul.appendChild(createSidebarItem(item));
        });
        return ul;
    }

    const sidebar = document.querySelector('.sidebar-content');
    if (sidebar) {
        sidebar.appendChild(buildSidebar(sidebarItems));
    }
});
