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
	// Сначала сортируем события по времени начала
	const sortedEvents = [...events].sort((a, b) => {
		return a.timeStart.localeCompare(b.timeStart)
	})

	let resultHtml = '<div class="events-list">'

	for (let i = 0; i < sortedEvents.length; i++) {
		const currentEvent = sortedEvents[i]

		// Добавляем текущее событие
		resultHtml += `<div class="event-time">${
			currentEvent.timeStart
		}</div>${createEventCard(currentEvent)}`

		// Проверяем разрыв с следующим событием (если оно есть)
		if (i < sortedEvents.length - 1) {
			const nextEvent = sortedEvents[i + 1]
			const timeDiff = getTimeDifferenceInMinutes(
				currentEvent.timeEnd,
				nextEvent.timeStart
			)

			if (timeDiff >= 60) {
				resultHtml += `<div class="event-time">${currentEvent.timeEnd}</div>
				<div class="free-slot">Свободное время: 
				${currentEvent.timeEnd} - ${nextEvent.timeStart}</div>`
			}
		}
	}

	resultHtml += '</div>'
	return resultHtml
}

function createBottomNav() {
	return `<div class="bottom-nav">
    <button class="nav-btn active"><img src="/assets/people2.png" /></button>
    <button class="nav-btn"><img src="/assets/calendar.png"  /></button>
    <button class="add-btn">+</button>
    <button class="nav-btn"><img src="/assets/notes.png"  /></button>
    <button class="nav-btn"><img src="/assets/profile.png"  /></button>
  </div>`
}

function getTimeDifferenceInMinutes(endTime, startTime) {
	const [endHours, endMins] = endTime.split(':').map(Number)
	const [startHours, startMins] = startTime.split(':').map(Number)

	const endTotal = endHours * 60 + endMins
	const startTotal = startHours * 60 + startMins

	return startTotal - endTotal // Разница в минутах
}
