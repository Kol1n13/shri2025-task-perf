document.addEventListener('DOMContentLoaded', () => {
  'use strict'
  const TABS = {
          all: {
              title: 'Все',
              items: [{
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Yeelight LED Smart Bulb',
                  subtitle: 'Включено'
              }, {
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'D-Link Omna 180 Cam',
                  subtitle: 'Включится в 17:00'
              }, {
                  icon: 'temp',
                  iconLabel: 'Температура',
                  title: 'Elgato Eve Degree Connected',
                  subtitle: 'Выключено до 17:00'
              }, {
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'LIFX Mini Day & Dusk A60 E27',
                  subtitle: 'Включится в 17:00'
              }, {
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Mi Air Purifier 2S',
                  subtitle: 'Включено'
              }, {
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'Philips Zhirui',
                  subtitle: 'Включено'
              }, {
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'Philips Zhirui',
                  subtitle: 'Включено'
              }, {
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Mi Air Purifier 2S',
                  subtitle: 'Включено'
              }]
          },
          kitchen: {
              title: 'Кухня',
              items: [{
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Yeelight LED Smart Bulb',
                  subtitle: 'Включено'
              }, {
                  icon: 'temp',
                  iconLabel: 'Температура',
                  title: 'Elgato Eve Degree Connected',
                  subtitle: 'Выключено до 17:00'
              }]
          },
          hall: {
              title: 'Зал',
              items: [{
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'Philips Zhirui',
                  subtitle: 'Выключено'
              }, {
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Mi Air Purifier 2S',
                  subtitle: 'Выключено'
              }]
          },
          lights: {
              title: 'Лампочки',
              items: [{
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'D-Link Omna 180 Cam',
                  subtitle: 'Включится в 17:00'
              }, {
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'LIFX Mini Day & Dusk A60 E27',
                  subtitle: 'Включится в 17:00'
              }, {
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Mi Air Purifier 2S',
                  subtitle: 'Включено'
              }, {
                  icon: 'light',
                  iconLabel: 'Освещение',
                  title: 'Philips Zhirui',
                  subtitle: 'Включено'
              }]
          },
          cameras: {
              title: 'Камеры',
              items: [{
                  icon: 'light2',
                  iconLabel: 'Освещение',
                  title: 'Xiaomi Mi Air Purifier 2S',
                  subtitle: 'Включено'
              }]
          }
      };
      for (let i = 0; i < 6; ++i) {
          TABS.all.items = [...TABS.all.items, ...TABS.all.items];
      }
  const TABS_KEYS = Object.keys(TABS);

  const FAVOURITE_SCRIPTS = [
      { icon: 'light2', iconLabel: 'Освещение', title: 'Выключить весь свет в доме и во дворе', slim: true },
      { icon: 'schedule', iconLabel: 'Расписание', title: 'Я ухожу', slim: true },
      { icon: 'light2', iconLabel: 'Освещение', title: 'Включить свет в коридоре', slim: true },
      { icon: 'temp2', iconLabel: 'Температура', title: 'Набрать горячую ванну', subtitle: 'Начнётся в 18:00', slim: true },
      { icon: 'temp2', iconLabel: 'Температура', title: 'Сделать пол тёплым во всей квартире', slim: true },
    ];

  const SCHEDULE_ITEMS = [
      { icon: 'temp', iconLabel: 'Температура', title: 'Philips Cooler', subtitle: 'Начнет охлаждать в 16:30' },
      { icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' },
      { icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' },
    ];

  const menuButton = document.querySelector('.header__menu');
  const navLinks = document.querySelector('.header__links');

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

  const schedule = document.querySelector('.hero-dashboard__schedule');
  SCHEDULE_ITEMS.forEach(e => schedule.appendChild(createEvent(e)));

  const scriptList = document.querySelector('.event-grid')
  FAVOURITE_SCRIPTS.forEach(e => scriptList.appendChild(createEvent(e)));

  const tabsEl = document.querySelector('.section__tabs')
  const selectEl = document.querySelector('.section__select')
  const panelWrapper = document.querySelector('.section__panel-wrapper')

  let activeTab = 'all';

  function renderTabs() {
    tabsEl.innerHTML = '';
    selectEl.innerHTML = '';
    TABS_KEYS.forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.selected = key === activeTab;
      opt.textContent = TABS[key].title;
      selectEl.appendChild(opt);

      const li = document.createElement('li');
      li.className = 'section__tab' + (key === activeTab ? ' section__tab_active' : '');
      li.setAttribute('role', 'tab');
      li.setAttribute('tabindex', key === activeTab ? '0' : '');
      li.ariaSelected = key === activeTab ? 'true' : 'false';
      li.id = `tab_${key}`
      li.setAttribute('aria-controls', `panel_${key}`)
      li.textContent = TABS[key].title;
      li.addEventListener('click', () => {
        updateTab(key);
        updatePanel(key);
        activeTab = key;
        renderMoreArrow();
        selectEl.value = key;
      });

      tabsEl.appendChild(li);
    });
    selectEl.value = activeTab;
  }

  function renderPanel(key){
    const tabI = document.createElement('div');
    tabI.role = 'tabpanel';
    tabI.className = 'section__panel' + (key !== activeTab ? ' section__panel_hidden' : '');
    tabI.ariaHidden = !(key === activeTab);
    tabI.id = `panel_${key}`;
    tabI.setAttribute('aria-labelledby', `tab_${key}`);
    const ul = document.createElement('ul');
    ul.className = 'section__panel-list';
    TABS[key].items.forEach(item => ul.appendChild(createEvent(item)));
    tabI.appendChild(ul);
    panelWrapper.appendChild(tabI);

  }

  function renderMoreArrow(){
    const arrow = panelWrapper.querySelector('.section__arrow')
    if (arrow){
      panelWrapper.removeChild(arrow);
    }
    const tabI = panelWrapper.querySelector(`#panel_${activeTab}`);
    const allEvents = tabI.querySelectorAll('.event');
    const widthSum = Array.from(allEvents).reduce((acc, event) => acc + event.offsetWidth, 0);
    if (widthSum > tabI.offsetWidth) {
      const arrow = document.createElement('div');
      arrow.className = 'section__arrow';
      arrow.addEventListener('click', () => {
        tabI.scrollTo({
          left: tabI.scrollLeft + 400,
          behavior: 'smooth'
        });
      });
      panelWrapper.appendChild(arrow);
    }
  }

  function renderPanels() {
    panelWrapper.innerHTML = '';
    TABS_KEYS.forEach(key => {
      renderPanel(key);
    })
  }


  function updateTab(key){
      const newTab = document.querySelector(`#tab_${key}`)
      const oldTab = document.querySelector(`#tab_${activeTab}`);
      oldTab.classList.remove('section__tab_active');
      oldTab.ariaSelected = false;
      newTab.classList.add('section__tab_active');
      newTab.ariaSelected = true;
  }

  function updatePanel(newTab){
      const oldPanel = panelWrapper.querySelector(`#panel_${activeTab}`)
      const newPanel = panelWrapper.querySelector(`#panel_${newTab}`);
      oldPanel.classList.add('section__panel_hidden');
      oldPanel.ariaHidden = true;
      newPanel.classList.remove('section__panel_hidden');
      newPanel.ariaHidden = false;
  }

  selectEl.addEventListener('input', e => {
    updateTab(e.target.value);
    updatePanel(e.target.value);
    activeTab = e.target.value;
    renderMoreArrow();
  });

  renderTabs();
  renderPanels();
  renderMoreArrow();
});