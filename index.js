document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button');
  const navLinks = document.getElementById('nav-links');

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

  function createEvent({ icon, iconLabel, title, subtitle, slim }) {
    const li = document.createElement('li');
    li.className = 'event' + (slim ? ' event_slim' : '');

    const btn = document.createElement('button');
    btn.className = 'event__button';

    const iconEl = document.createElement('span');
    iconEl.className = `event__icon event__icon_${icon}`;
    iconEl.setAttribute('role', 'img');
    iconEl.setAttribute('aria-label', iconLabel);

    const h4 = document.createElement('h4');
    h4.className = 'event__title';
    h4.textContent = title;

    btn.append(iconEl, h4);

    if (subtitle) {
      const sub = document.createElement('span');
      sub.className = 'event__subtitle';
      sub.textContent = subtitle;
      btn.appendChild(sub);
    }

    li.appendChild(btn);
    return li;
  }

  const schedule = document.getElementById('event-schedule');
  const scheduleItems = [
    { icon: 'temp', iconLabel: 'Температура', title: 'Philips Cooler', subtitle: 'Начнет охлаждать в 16:30' },
    { icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' },
    { icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' },
  ];
  scheduleItems.forEach(e => schedule.appendChild(createEvent(e)));

  const scriptList = document.getElementById('script-list');
  const scripts = [
    { icon: 'light2', iconLabel: 'Освещение', title: 'Выключить весь свет в доме и во дворе', slim: true },
    { icon: 'schedule', iconLabel: 'Расписание', title: 'Я ухожу', slim: true },
    { icon: 'light2', iconLabel: 'Освещение', title: 'Включить свет в коридоре', slim: true },
    { icon: 'temp2', iconLabel: 'Температура', title: 'Набрать горячую ванну', subtitle: 'Начнётся в 18:00', slim: true },
    { icon: 'temp2', iconLabel: 'Температура', title: 'Сделать пол тёплым во всей квартире', slim: true },
  ];
  scripts.forEach(e => scriptList.appendChild(createEvent(e)));

  const tabsEl = document.getElementById('tabs');
  const selectEl = document.getElementById('device-select');
  const panelWrapper = document.getElementById('panel-wrapper');

  let activeTab = 'all';

  function renderTabs() {
    tabsEl.innerHTML = '';
    selectEl.innerHTML = '';
    TABS_KEYS.forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = TABS[key].title;
      selectEl.appendChild(opt);

      const li = document.createElement('li');
      li.className = 'section__tab' + (key === activeTab ? ' section__tab_active' : '');
      li.setAttribute('role', 'tab');
      li.setAttribute('tabindex', key === activeTab ? '0' : '-1');
      li.dataset.key = key;
      li.textContent = TABS[key].title;
      li.addEventListener('click', () => {
        activeTab = key;
        renderPanels();
        renderTabs();
      });
      tabsEl.appendChild(li);
    });
    selectEl.value = activeTab;
  }

  function renderPanels() {
    panelWrapper.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'section__panel';
    const ul = document.createElement('ul');
    ul.className = 'section__panel-list';
    TABS[activeTab].items.forEach(item => ul.appendChild(createEvent(item)));
    div.appendChild(ul);
    panelWrapper.appendChild(div);
  }

  selectEl.addEventListener('input', e => {
    activeTab = e.target.value;
    renderPanels();
    renderTabs();
  });

  renderTabs();
  renderPanels();
});
