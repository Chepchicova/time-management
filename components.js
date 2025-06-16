// Компоненты для отрисовки интерфейса (заменишь данные на реальные из БД, когда подключишь)

function createTab(name, active) {
	return `<div class="tab${active ? ' active' : ''}">${name}</div>`
}

function createWeekdays(days, activeIndex) {
	return `<div class="weekdays">
    ${days
			.map(
				(d, i) =>
					`<div class="weekday${i === activeIndex ? ' active' : ''}">
        ${d.short}
        <span class="day-number${i === activeIndex ? ' active' : ''}">${
						d.num
					}</span>
      </div>`
			)
			.join('')}
  </div>`
}

function createEventCard(event) {
	if (event.free) {
		return `<div class="free-slot">${event.title}</div>`
	}
	return `<div class="event-card">
    <div class="event-stripe" style="background:${event.theme.color};"></div>
    <div class="event-title">${event.title}</div>
    <div class="event-hours">${event.timeStart}-${event.timeEnd}</div>
  </div>`
}

function createEventsList(events) {
	return `<div class="events-list">
    ${events
			.map(
				e => `<div class="event-time">${e.timeStart}</div>${createEventCard(e)}`
			)
			.join('')}
  </div>`
}

function createBottomNav() {
	return `<div class="bottom-nav">
    <button class="nav-btn active"><img src="/assets/profile2.svg" /></button>
    <button class="nav-btn"><img src="/assets/calendar1.svg"  /></button>
    <button class="add-btn">+</button>
    <button class="nav-btn"><img src="/assets/notes1.svg"  /></button>
    <button class="nav-btn"><img src="/assets/profile1.svg"  /></button>
  </div>`
}
