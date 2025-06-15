// Компоненты для отрисовки интерфейса (заменишь данные на реальные из БД, когда подключишь)

function createTab(name, active) {
  return `<div class="tab${active ? ' active' : ''}">${name}</div>`;
}

function createWeekdays(days, activeIndex) {
  return `<div class="weekdays">
    ${days.map((d, i) =>
      `<div class="weekday${i === activeIndex ? ' active' : ''}">
        ${d.short}
        <span class="day-number${i === activeIndex ? ' active' : ''}">${d.num}</span>
      </div>`
    ).join('')}
  </div>`;
}

function createEventCard(event) {
  if (event.free) {
    return `<div class="free-slot">${event.title}<div class="event-hours">${event.time}</div></div>
      <button class="schedule-btn">Schedule an event</button>`;
  }
  return `<div class="event-card">
    <div class="event-stripe" style="background:${event.color};"></div>
    <div class="event-title">${event.title}</div>
    <div class="event-hours">${event.time}</div>
  </div>`;
}

function createEventsList(events) {
  return `<div class="events-list">
    ${events.map(e => `<div class="event-time">${e.start}</div>${createEventCard(e)}`).join('')}
  </div>`;
}

function createBottomNav() {
  return `<div class="bottom-nav">
    <button class="nav-btn active">📅</button>
    <button class="nav-btn">📆</button>
    <button class="add-btn">+</button>
    <button class="nav-btn">📝</button>
    <button class="nav-btn">⚙️</button>
  </div>`;
}