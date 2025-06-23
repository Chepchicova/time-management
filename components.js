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
	console.log(filterDate)

	if (filteredEvents.length === 0) {
		return `<div class="events-list" id="eventsContainer">На этот день событий нет</div>`
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

function getTimeDifferenceInMinutes(endTime, startTime) {
	const [endHours, endMins] = endTime.split(':').map(Number)
	const [startHours, startMins] = startTime.split(':').map(Number)

	const endTotal = endHours * 60 + endMins
	const startTotal = startHours * 60 + startMins

	return startTotal - endTotal // Разница в минутах
}

// месяц

function createMonthView(date = new Date(), events = []) {
	const year = date.getFullYear()
	const month = date.getMonth()
	const daysInMonth = new Date(year, month + 1, 0).getDate()
	const weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

	// Определяем сегодняшний день
	const today = new Date()
	const isCurrentMonth =
		today.getFullYear() === year && today.getMonth() === month
	const todayDay = isCurrentMonth ? today.getDate() : null

	// Группируем события по дням месяца
	const eventsByDay = {}
	events.forEach(event => {
		const eventDate = new Date(event.date)
		if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
			const day = eventDate.getDate()
			if (!eventsByDay[day]) {
				eventsByDay[day] = []
			}
			eventsByDay[day].push(event)
		}
	})

	let html = `<div class="month-list">`

	for (let day = 1; day <= daysInMonth; day++) {
		const dayDate = new Date(year, month, day)
		const weekDayStr = weekDays[dayDate.getDay()]
		const dayEvents = eventsByDay[day] || []
		const isToday = day === todayDay

		html += `<div class="month-row${isToday ? ' today' : ''}"${
			isToday ? ' id="today-row"' : ''
		}>
		 <div class="month-day">
			<span class="month-day-week">${weekDayStr}</span>
			<span class="month-day-num">${day}</span>
		 </div>
		 <div class="month-events">
			${
				dayEvents.length === 0
					? ``
					: dayEvents
							.map(
								event => `
					  <div class="month-event" style="background:${event.theme.color}">
						 <div class="month-event-title">${event.title}</div>
						 <div class="month-event-time">${event.timeStart}${
									event.timeEnd ? '–' + event.timeEnd : ''
								}</div>
					  </div>
					`
							)
							.join('')
			}
		 </div>
	  </div>`
	}

	html += `</div>`
	return html
}

function createBottomNav() {
	return `<div class="bottom-nav">
	  <button class="nav-btn active"><img src="/assets/contacts.svg" /></button>
	  <button class="nav-btn"><img src="/assets/calendar.svg" /></button>
	  <button class="add-btn" id="openModalBtn">+</button>
	  <button class="nav-btn"><img src="/assets/notes.svg" /></button>
	  <button class="nav-btn"><img src="/assets/profile.svg" /></button>
	</div>
	`
}
function createModal() {
	// Получаем текущую дату в формате YYYY-MM-DD
	const today = new Date()
	const todayStr = today.toISOString().split('T')[0]

	return `
	 <div class="modal" id="eventModal" style="display: none;">
	  <div class="modal-content">
		<span class="close-btn">&times;</span>
		<h2>Добавить событие</h2>
		<form id="eventForm">
		 <div class="form-group">
			<label for="eventTitle">Название:</label>
			<input type="text" id="eventTitle" required maxlength="50">
			<small class="error-message" id="titleError" style="color: red; display: none;">Максимум 50 символов</small>
		 </div>
		 
		 <div class="form-group">
			<label for="eventDate">Дата:</label>
			<input type="date" id="eventDate" required min="${todayStr}" value="${todayStr}">
			<small class="error-message" id="dateError" style="color: red; display: none;">Дата не может быть раньше сегодняшней</small>
		 </div>
		 
		 <div class="time-group">
			<div class="form-group">
			 <label for="startTime">Начало:</label>
			 <input type="time" id="startTime" required>
			</div>
			
			<div class="form-group">
			 <label for="endTime">Конец:</label>
			 <input type="time" id="endTime" required>
			 <small class="error-message" id="timeError" style="color: red; display: none;">Время окончания должно быть позже начала</small>
			</div>
		 </div>
		 
		 <div class="form-group">
			<label for="eventPerson">Человек:</label>
			<input type="text" id="eventPerson">
		 </div>
		 
		 <div class="form-group">
			<label class="checkbox-wrapper">
			  <input type="checkbox" id="eventNotification">
			  <span>Оповещение</span>
			</label>
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

function getThemeByName(theme) {
	for (const key in EventThemes) {
		if (key === theme) {
			return EventThemes[key]
		}
	}
	return EventThemes.OTHER
}

// После добавления HTML в DOM нужно добавить обработчики:
function setupEventModal() {
	const modal = document.getElementById('eventModal')
	const openBtn = document.getElementById('openModalBtn')
	const closeBtn = document.querySelector('.close-btn')
	const form = document.getElementById('eventForm')

	openBtn.addEventListener('click', () => {
		// При открытии модального окна устанавливаем текущую дату
		const today = new Date()
		const todayStr = today.toISOString().split('T')[0]
		document.getElementById('eventDate').value = todayStr
		modal.style.display = 'block'
	})

	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none'
		// Сбрасываем ошибки при закрытии
		resetErrors()
	})

	window.addEventListener('click', e => {
		if (e.target === modal) {
			modal.style.display = 'none'
			resetErrors()
		}
	})

	// Валидация формы
	form.addEventListener('submit', e => {
		e.preventDefault()

		// Сбрасываем предыдущие ошибки
		resetErrors()

		const title = document.getElementById('eventTitle')
		const date = document.getElementById('eventDate')
		const startTime = document.getElementById('startTime')
		const endTime = document.getElementById('endTime')

		let isValid = true

		// Проверка заголовка (максимум 50 символов)
		if (title.value.length > 50) {
			document.getElementById('titleError').style.display = 'block'
			isValid = false
		}

		// Проверка даты (не раньше сегодня)
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		const selectedDate = new Date(date.value)
		if (selectedDate < today) {
			document.getElementById('dateError').style.display = 'block'
			isValid = false
		}

		// Проверка времени (конец не раньше начала)
		if (startTime.value && endTime.value && startTime.value >= endTime.value) {
			document.getElementById('timeError').style.display = 'block'
			isValid = false
		}

		// Если валидация не прошла, не отправляем форму
		if (!isValid) return

		// Если все в порядке, создаем событие
		const newEvent = {
			title: title.value,
			date: date.value,
			timeStart: startTime.value,
			timeEnd: endTime.value,
			person: document.getElementById('eventPerson').value,
			notification: document.getElementById('eventNotification').checked,
			theme: getThemeByName(document.getElementById('eventTheme').value),
			description: document.getElementById('eventDescription').value,
		}

		events.push(newEvent)

		console.log('Новое событие:', newEvent)
		modal.style.display = 'none'
		form.reset()
	})

	// Функция для сброса сообщений об ошибках
	function resetErrors() {
		const errorMessages = document.querySelectorAll('.error-message')
		errorMessages.forEach(msg => {
			msg.style.display = 'none'
		})
	}
}
