const app = document.getElementById("app");

function createHeader() {
    const header = document.createElement("header");
    header.className = "header";
    app.appendChild(header);

    const logo = document.createElement("a");
    logo.href = "/";
    logo.className = "header__logo";
    logo.setAttribute("aria-label", "Яндекс.Дом");
    header.appendChild(logo);

    const menuButton = document.createElement("button");
    menuButton.className = "header__menu";
    menuButton.setAttribute("aria-expanded", "false");
    header.appendChild(menuButton);

    const menuText = document.createElement("span");
    menuText.className = "header__menu-text a11y-hidden";
    menuText.textContent = "Открыть меню";
    menuButton.appendChild(menuText);

    const navLinks = document.createElement("ul");
    navLinks.className = "header__links";
    NAV_LINKS.forEach(linkData => {
        const li = document.createElement("li");
        li.className = "header__item";
        const link = document.createElement("a");
        link.className = "header__link";
        link.href = linkData.href;
        link.textContent = linkData.text;
        if (linkData.currentPage) {
            link.classList.add("header__link_current");
            link.setAttribute("aria-current", "page");
        }
        li.appendChild(link);
        navLinks.appendChild(li);
    });
    header.appendChild(navLinks);

    let expanded = false;
    let toggled = false;
    menuButton.addEventListener('click', () => {
        expanded = !expanded;
        if (!toggled) toggled = true;
        menuButton.setAttribute('aria-expanded', expanded);
        const text = menuButton.querySelector('.header__menu-text');
        text.textContent = expanded ? 'Закрыть меню' : 'Открыть меню';

        navLinks.classList.toggle('header__links_opened', expanded);
        navLinks.classList.toggle('header__links-toggled', toggled);
    });
}

function createEvent(props) {
    const li = document.createElement("li");
    li.className = props.slim ? "event event_slim" : "event";

    const evtBtn = document.createElement("button");
    evtBtn.className = "event__button";
    li.appendChild(evtBtn);

    const icon = document.createElement("span");
    icon.className = `event__icon event__icon_${props.icon}`;
    icon.setAttribute("role", "img");
    if (props.iconLabel) 
        icon.setAttribute("aria-label", props.iconLabel);
    evtBtn.appendChild(icon);

    const title = document.createElement("h4");
    title.className = "event__title";
    title.textContent = props.title;
    evtBtn.appendChild(title);

    if (props.subtitle) {
        const subtitle = document.createElement("span");
        subtitle.className = "event__subtitle";
        subtitle.textContent = props.subtitle;
        evtBtn.appendChild(subtitle);
    }
    if (props.onSize && props.id) {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                props.onSize(props.id, entry.contentRect);
            }
        });
        resizeObserver.observe(li);
    }
    return li;
}

function createMain() {
    const main = document.createElement("main");
    main.className = "main";
    app.appendChild(main);

    const generalSection = document.createElement("section");
    generalSection.className = "section main__general";
    main.appendChild(generalSection);

    const generalTitle = document.createElement("h2");
    generalTitle.className = "section__title section__title-header section__main-title";
    generalTitle.textContent = "Главное";
    generalSection.appendChild(generalTitle);

    const heroDashboard = document.createElement("div");
    heroDashboard.className = "hero-dashboard";
    generalSection.appendChild(heroDashboard);

    const dashboardPrimary = document.createElement("div");
    dashboardPrimary.className = "hero-dashboard__primary";
    heroDashboard.appendChild(dashboardPrimary);

    const greeting = document.createElement("h3");
    greeting.className = "hero-dashboard__title";
    greeting.textContent = "Привет, Геннадий!";
    dashboardPrimary.appendChild(greeting);

    const status = document.createElement("p");
    status.className = "hero-dashboard__subtitle";
    status.textContent = "Двери и окна закрыты, сигнализация включена.";
    dashboardPrimary.appendChild(status);

    const dashboardInfo = document.createElement("ul");
    dashboardInfo.className = "hero-dashboard__info";
    dashboardPrimary.appendChild(dashboardInfo);

    const homeEl = document.createElement("li");
    homeEl.className = "hero-dashboard__item";
    dashboardInfo.appendChild(homeEl);

    const homeTitle = document.createElement("div");
    homeTitle.className = "hero-dashboard__item-title";
    homeTitle.textContent = "Дома";
    homeEl.appendChild(homeTitle);

    const homeDetails = document.createElement("div");
    homeDetails.className = "hero-dashboard__item-details";
    homeDetails.innerHTML = "+23<span class=\"a11y-hidden\">°</span>";
    homeEl.appendChild(homeDetails);

    const outsideEl = document.createElement("li");
    outsideEl.className = "hero-dashboard__item";
    dashboardInfo.appendChild(outsideEl);

    const outsideTitle = document.createElement("div");
    outsideTitle.className = "hero-dashboard__item-title";
    outsideTitle.textContent = "За окном";
    outsideEl.appendChild(outsideTitle);

    const outsideDetails = document.createElement("div");
    outsideDetails.className = "hero-dashboard__item-details";
    outsideDetails.innerHTML = "+19<span class=\"a11y-hidden\">°</span>";
    outsideEl.appendChild(outsideDetails);

    const rainIcon = document.createElement("div");
    rainIcon.className = "hero-dashboard__icon hero-dashboard__icon_rain";
    rainIcon.setAttribute("role", "img");
    rainIcon.setAttribute("aria-label", "Дождь");
    outsideDetails.appendChild(rainIcon);

    const scheduleEl = document.createElement("ul");
    scheduleEl.className = "hero-dashboard__schedule";
    SCHEDULE_ITEMS.forEach(event => {
        scheduleEl.appendChild(createEvent(event));
    });
    heroDashboard.appendChild(scheduleEl);

    const scriptsSection = document.createElement("section");
    scriptsSection.className = "section main__scripts";
    main.appendChild(scriptsSection);

    const scriptsTitle = document.createElement("h2");
    scriptsTitle.className = "section__title section__title-header";
    scriptsTitle.textContent = "Избранные сценарии";
    scriptsSection.appendChild(scriptsTitle);

    const scripts = document.createElement("ul");
    scripts.className = "event-grid";
    FAVOURITE_SCRIPTS.forEach(event => {
        scripts.appendChild(createEvent(event));
    });
    scriptsSection.appendChild(scripts);

    const devicesSection = document.createElement("section");
    devicesSection.className = "section main__devices";
    main.appendChild(devicesSection);

    const devicesTitleSection = document.createElement("div");
    devicesTitleSection.className = "section__title";
    devicesSection.appendChild(devicesTitleSection);

    const devicesTitle = document.createElement("h2");
    devicesTitle.className = "section__title-header";
    devicesTitle.textContent = "Избранные устройства";
    devicesTitleSection.appendChild(devicesTitle);

    const selectEl = document.createElement("select");
    selectEl.className = "section__select";
    TABS_KEYS.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = TABS[key].title;
        selectEl.appendChild(option);
    });
    devicesTitleSection.appendChild(selectEl);
    
    const tabsEl = document.createElement("ul");
    tabsEl.className = "section__tabs";
    tabsEl.setAttribute("role", "tablist");
    TABS_KEYS.forEach(key => {
        const tab = document.createElement("li");
        tab.className = "section__tab";
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", "false");
        tab.id = `tab_${key}`;
        tab.setAttribute("aria-controls", `panel_${key}`);
        tab.textContent = TABS[key].title;
        tab.dataset.tabkey = key;
        tabsEl.appendChild(tab);
    });
    devicesTitleSection.appendChild(tabsEl);

    const panelWrapper = document.createElement("div");
    panelWrapper.className = "section__panel-wrapper";
    devicesSection.appendChild(panelWrapper);
    
    let allPanel = null;
    TABS_KEYS.forEach(key => {
        const panel = document.createElement("div");
        panel.className = "section__panel section__panel_hidden";
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-hidden", "true");
        panel.id = `panel_${key}`;
        panel.setAttribute("aria-labelledby", `tab_${key}`);
        const devicesList = document.createElement("ul");
        devicesList.className = "section__panel-list";
        panel.appendChild(devicesList);
        panelWrapper.appendChild(panel);
        if (key === "all")
            allPanel = panel;
    });
    
    const arrow = document.createElement("div");
    arrow.className = "section__arrow";
    arrow.style.display = "none";
    panelWrapper.appendChild(arrow);
    
    let activeTab = "all";
    const sizes = {};
    let hasRightScroll = false;
    const tabs = tabsEl.querySelectorAll(".section__tab");
    renderTab(activeTab);

    function renderTab(key) {
        const panel = document.getElementById(`panel_${key}`);
        if (!panel)
             return;
        const panelItems = panel.querySelector(".section__panel-list");
        panelItems.innerHTML = "";
        TABS[key].items.forEach((item, index) => {
            const id = `${key}-${index}`;
            panelItems.appendChild(createEvent({
                ...item,
                id,
                onSize: (id, size) => {
                    sizes[id] = size;
                    renderMoreArrow();
                }
            }));
        });
    }
    
    function updateTab(key) {
        if (!TABS_KEYS.includes(key))
             return;
        activeTab = key;
        selectEl.value = key;
        tabs.forEach(tab => {
            const isActive = tab.dataset.tabkey === key;
            tab.classList.toggle("section__tab_active", isActive);
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        const panels = panelWrapper.querySelectorAll(".section__panel");
        panels.forEach(panel => {
            const isActive = panel.id === `panel_${key}`;
            panel.classList.toggle("section__panel_hidden", !isActive);
            panel.setAttribute("aria-hidden", !isActive ? "true" : "false");
        });
        if (document.getElementById(`panel_${key}`).querySelector('.section__panel-list').innerHTML === "")
            renderTab(key);
        setTimeout(renderMoreArrow, 0);
    }
    
    function renderMoreArrow() {
        const activePanel = panelWrapper.querySelector(".section__panel:not(.section__panel_hidden)");
        if (!activePanel) 
            return;
        const panelItems = activePanel.querySelector(".section__panel-list");
        if (!panelItems)
             return;
        const totalWidth = Array.from(panelItems.children).reduce((acc, el) => {
           return acc + el.offsetWidth;
        }, 0);
        hasRightScroll = totalWidth > activePanel.offsetWidth;
        arrow.style.display = hasRightScroll ? "block" : "none";
    }
    
    selectEl.addEventListener("input", e => updateTab(e.target.value));
    tabs.forEach(tab => {
        tab.addEventListener("click", () => updateTab(tab.dataset.tabkey));
    });
    arrow.addEventListener("click", () => {
        const tabI = panelWrapper.querySelector(".section__panel:not(.section__panel_hidden)");
        if (tabI)
            tabI.scrollBy({ left: 400, behavior: 'smooth' });
    });

    window.addEventListener("resize", renderMoreArrow);

    updateTab('all');
}

createHeader();
createMain();