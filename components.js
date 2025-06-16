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

			if (timeDiff >= 30) {
				resultHtml += `<div class="event-time">${currentEvent.timeEnd}</div>
				<div class="free-slot">Свободное время: 
				${currentEvent.timeEnd} - ${nextEvent.timeStart}</div>`
			}
		}
	}

	resultHtml += '</div>'
	return resultHtml
}

function createModal() {
	return `
	 <div class="modal" id="eventModal" style="display: none;">
	  <div class="modal-content">
		 <span class="close-btn">&times;</span>
		 <h2>Добавить событие</h2>
		 <form id="eventForm">
			<div class="form-group">
			  <label for="eventTitle">Название:</label>
			  <input type="text" id="eventTitle" required>
			</div>
			
			<div class="form-group">
			  <label for="eventDate">Дата:</label>
			  <input type="date" id="eventDate" required>
			</div>
			
			<div class="time-group">
			  <div class="form-group">
				 <label for="startTime">Начало:</label>
				 <input type="time" id="startTime" required>
			  </div>
			  
			  <div class="form-group">
				 <label for="endTime">Конец:</label>
				 <input type="time" id="endTime" required>
			  </div>
			</div>
			
			<div class="form-group">
			  <label for="eventPerson">Человек:</label>
			  <input type="text" id="eventPerson">
			</div>
			
			<div class="form-group checkbox-group">
			  <input type="checkbox" id="eventNotification">
			  <label for="eventNotification">Оповещение</label>
			</div>
			
			<div class="form-group">
			  <label for="eventTheme">Тема:</label>
			  <select id="eventTheme" required>
				 ${Object.entries(EventThemes)
						.map(
							([key, value]) =>
								`<option value="${key}" style="color: ${value.color}">${key}</option>`
						)
						.join('')}
			  </select>
			</div>
			
			<div class="form-group">
			  <label for="eventDescription">Описание:</label>
			  <textarea id="eventDescription" rows="3"></textarea>
			</div>
			
			<button type="submit" class="submit-btn">Создать</button>
		 </form>
	  </div>
	</div>
	`
}

function getTimeDifferenceInMinutes(endTime, startTime) {
	const [endHours, endMins] = endTime.split(':').map(Number)
	const [startHours, startMins] = startTime.split(':').map(Number)

	const endTotal = endHours * 60 + endMins
	const startTotal = startHours * 60 + startMins

	return startTotal - endTotal // Разница в минутах
}

function createBottomNav() {
	return `<div class="bottom-nav">
	  <button class="nav-btn active"><img src="/assets/profile2.svg" /></button>
	  <button class="nav-btn"><img src="/assets/calendar1.svg" /></button>
	  <button class="add-btn" id="openModalBtn">+</button>
	  <button class="nav-btn"><img src="/assets/notes1.svg" /></button>
	  <button class="nav-btn"><img src="/assets/profile1.svg" /></button>
	</div>
	`
}

// После добавления HTML в DOM нужно добавить обработчики:
function setupEventModal() {
	const modal = document.getElementById('eventModal')
	const openBtn = document.getElementById('openModalBtn')
	const closeBtn = document.querySelector('.close-btn')
	const form = document.getElementById('eventForm')

	openBtn.addEventListener('click', () => {
		modal.style.display = 'block'
	})

	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none'
	})

	window.addEventListener('click', e => {
		if (e.target === modal) {
			modal.style.display = 'none'
		}
	})

	form.addEventListener('submit', e => {
		e.preventDefault()

		const newEvent = {
			title: document.getElementById('eventTitle').value,
			date: document.getElementById('eventDate').value,
			timeStart: document.getElementById('startTime').value,
			timeEnd: document.getElementById('endTime').value,
			person: document.getElementById('eventPerson').value,
			notification: document.getElementById('eventNotification').checked,
			theme: document.getElementById('eventTheme').value,
			description: document.getElementById('eventDescription').value,
		}

		console.log('Новое событие:', newEvent)
		modal.style.display = 'none'
		form.reset()
	})
}

document.addEventListener('DOMContentLoaded', setupEventModal)
