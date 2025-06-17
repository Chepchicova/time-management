// Компоненты для отрисовки интерфейса

function createTab(name, active) {
	return `<div class="tab${active ? ' active' : ''}">${name}</div>`
}

function createWeekdays() {
	const days = getCurrentWeekDays()
	const todayIndex = days.findIndex(day => day.isCurrentDay)

	return `
	  <div class="weekdays">
		 ${days
				.map(
					(day, index) => `
			<div class="weekday ${index === todayIndex ? 'active' : ''}" 
				  data-date="${day.fullDate}"
				  onclick="handleDayClick('${day.fullDate}')">
			  ${day.short}
			  <span class="day-number">
				 ${day.num}
			  </span>
			</div>
		 `
				)
				.join('')}
	  </div>
	`
}

function getCurrentWeekDays() {
	const daysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const today = new Date()
	const currentDateString = formatDate(today)

	// Находим понедельник текущей недели
	const monday = new Date(today)
	monday.setDate(
		today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
	)

	// Генерируем 7 дней начиная с понедельника
	const weekDays = []

	for (let i = 0; i < 7; i++) {
		const date = new Date(monday)
		date.setDate(monday.getDate() + i)
		const dateString = formatDate(date)

		weekDays.push({
			short: daysShort[i],
			num: date.getDate(),
			fullDate: dateString,
			isCurrentDay: dateString === currentDateString,
		})
	}

	return weekDays
}

function formatDate(date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

function handleDayClick(selectedDate) {
	// 1. Обновляем активный день в UI
	updateActiveDay(selectedDate)

	// 2. Получаем все события (предполагаем, что они доступны в глобальной области)
	// const allEvents = window.calendarEvents || []

	// 3. Рендерим события для выбранной даты
	const eventsContainer = document.getElementById('eventsContainer')
	eventsContainer.innerHTML = createEventsList(events, selectedDate)
}

// Функция обновления активного дня
function updateActiveDay(selectedDate) {
	document.querySelectorAll('.weekday').forEach(day => {
		const isActive = day.dataset.date === selectedDate
		day.classList.toggle('active', isActive)
	})
}

//////////////события

function createEventCard(event) {
	return `<div class="event-card" data-event-id="${event.id}">
	  <div class="event-stripe" style="background:${event.theme.color};"></div>
	  <div class="event-title">${event.title}</div>
	  <div class="event-hours">${event.timeStart}-${event.timeEnd}</div>
	</div>`
}

function createEventsList(events, filterDate = null) {
	// Фильтрация событий по дате, если указана
	const filteredEvents = filterDate
		? events.filter(event => event.date === filterDate)
		: events

	if (filteredEvents.length === 0) {
		return `<div class="no-events">На этот день событий нет</div>`
	}

	// Сортировка по времени начала
	const sortedEvents = [...filteredEvents].sort((a, b) => {
		// Защитные проверки
		if (!a.timeStart || !b.timeStart) return 0
		return a.timeStart.localeCompare(b.timeStart)
	})

	let html = '<div class="events-list" id="eventsContainer">'

	sortedEvents.forEach((event, index) => {
		html += `
		 <div class="event-time">${event.timeStart}</div>
		 ${createEventCard(event)}`

		// Добавляем свободные промежутки между событиями
		if (index < sortedEvents.length - 1) {
			const nextEvent = sortedEvents[index + 1]
			const timeDiff = getTimeDifferenceInMinutes(
				event.timeEnd,
				nextEvent.timeStart
			)

			if (timeDiff >= 30) {
				html += `
			  <div class="event-time">${event.timeEnd}</div>
			  <div class="free-slot">
				 Свободное время: ${event.timeEnd} - ${nextEvent.timeStart}
			  </div>`
			}
		}
	})

	html += '</div>'
	return html
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
