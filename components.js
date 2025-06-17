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
	const sortedEvents = [...events].sort((a, b) => {
		return a.timeStart.localeCompare(b.timeStart)
	})

	let resultHtml = '<div class="events-list">'

	for (let i = 0; i < sortedEvents.length; i++) {
		const currentEvent = sortedEvents[i]

		resultHtml += `<div class="event-time">${
			currentEvent.timeStart
		}</div>${createEventCard(currentEvent)}`

		if (i < sortedEvents.length - 1) {
			const nextEvent = sortedEvents[i + 1]
			const timeDiff = getTimeDifferenceInMinutes(
				currentEvent.timeEnd,
				nextEvent.timeStart
			)

			if (timeDiff >= 0) {
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
    <button class="nav-btn active"><img src="/assets/profile2.svg" /></button>
    <button class="nav-btn"><img src="/assets/calendar1.svg"  /></button>
    <button class="add-btn">+</button>
    <button class="nav-btn"><img src="/assets/notes1.svg"  /></button>
    <button class="nav-btn"><img src="/assets/profile1.svg"  /></button>
  </div>`
}

function getTimeDifferenceInMinutes(endTime, startTime) {
	const [endHours, endMins] = endTime.split(':').map(Number)
	const [startHours, startMins] = startTime.split(':').map(Number)

	const endTotal = endHours * 60 + endMins
	const startTotal = startHours * 60 + startMins

	return startTotal - endTotal // Разница в минутах
}

// месяц

function createMonthView(date = new Date(), eventsByDay = {}) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  // Определяем сегодняшний день
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDay = isCurrentMonth ? today.getDate() : null;

  let html = `<div class="month-list">`;
  for(let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const weekDayStr = weekDays[dayDate.getDay()];
    const dayEvents = eventsByDay[day] || [];
    const isToday = day === todayDay;

    html += `<div class="month-row${isToday ? ' today' : ''}"${isToday ? ' id="today-row"' : ''}>
      <div class="month-day">
        <span class="month-day-week">${weekDayStr}</span>
        <span class="month-day-num">${day}</span>
      </div>
      <div class="month-events">
        ${dayEvents.length === 0 ? `` : dayEvents.map(ev => `
          <div class="month-event" style="background:${ev.theme.color}">
            <div class="month-event-title">${ev.title}</div>
            <div class="month-event-time">${ev.timeStart}${ev.timeEnd ? '–'+ev.timeEnd : ''}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }
  html += `</div>`;
  return html;
}