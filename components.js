function createTab(name, active) {
	return `<div class="tab${active ? ' active' : ''}">${name}</div>`
}

function createWeekdays(selectedDate = null) {
	const days = getCurrentWeekDays(selectedDate)
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

function getCurrentWeekDays(selectedDate = null) {
	const daysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const currentDate = new Date(selectedDate || Date.now())
	const currentDateString = formatDate(currentDate)
	// Находим понедельник текущей недели
	const monday = new Date(currentDate)
	monday.setDate(
		currentDate.getDate() -
			(currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1)
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
	updateActiveDay(selectedDate)
	const eventsContainer = document.getElementById('eventsContainer')
	eventsContainer.outerHTML = createEventsList(events, selectedDate)
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
	const notificationIcon = event.notification
		? 'assets/notification-on.svg'
		: 'assets/notification-off.svg'

	const now = new Date()
	const currentDateStr = now.toISOString().split('T')[0]
	const currentTimeStr = now.toTimeString().substring(0, 5) // "HH:MM"

	// Формируем классы карточки
	const cardClasses = ['event-card']
	if (
		event.date < currentDateStr ||
		(event.date === currentDateStr && event.timeEnd < currentTimeStr)
	)
		cardClasses.push('inactive')

	return `<div class="${cardClasses.join(' ')}" data-event-id="${event.id}">
	  <div class="event-stripe" style="background:${event.theme.color};"></div>
	  <div class="event-content">
		 <div class="event-info">
			<div class="event-title">${event.title}</div>
			<div class="event-hours">${event.timeStart}-${event.timeEnd}</div>
		 </div>
		 <div class="event-actions">
			<button class="event-action-btn event-notification-btn" title="Уведомление" data-event-id="${
				event.id
			}">
			  <img src="${notificationIcon}" alt="Уведомление" class="notification-icon">
			</button>
			<div class="event-theme-icon" style="background:${event.theme.color};">
			  <img src=${event.theme.icon} alt="Тема">
			</div>
		 </div>
	  </div>
	</div>`
}
/*			<button class="event-action-btn event-note-btn"  title="Добавить заметку">
			  <img src="assets/notes.svg" alt="Заметка">
			</button>*/

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

	return startTotal - endTotal
}

// Вспомогательная функция для преобразования времени в минуты
function timeToMinutes(timeStr) {
	if (!timeStr) return 0
	const [hours, minutes] = timeStr.split(':').map(Number)
	return hours * 60 + minutes
}

// месяц
function createMonthView(date = new Date(), events = []) {
	const year = date.getFullYear()
	const month = date.getMonth()
	const monthNames = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]
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

	// Создаем HTML для навигации
	let html = `
	<div class="month-navigation">
		 <button class="month-nav-btn prev-month" data-action="prev">←</button>
		 <div class="month-title">
			  <span class="month-name">${monthNames[month]}</span>
			  <span class="month-year">${year}</span>
		 </div>
		 <button class="month-nav-btn next-month" data-action="next">→</button>
	</div>
	<div class="month-list">`

	// Добавляем дни месяца
	for (let day = 1; day <= daysInMonth; day++) {
		const dayDate = new Date(year, month, day)
		const weekDayStr = weekDays[dayDate.getDay()]
		const dayEvents = eventsByDay[day] || []
		const isToday = day === todayDay

		// Рассчитываем заполненность дня (в минутах)
		let busyMinutes = 0
		const totalMinutesInDay = 24 * 60 // 1440 минут в сутках

		dayEvents.forEach(event => {
			const start = timeToMinutes(event.timeStart)
			const end = timeToMinutes(event.timeEnd) // Если нет end, считаем как 1 час
			busyMinutes += end - start
		})

		// Ограничиваем максимальную заполненность 100%
		const busyPercentage = Math.min(
			Math.round((busyMinutes / totalMinutesInDay) * 100),
			100
		)

		html += `<div class="month-row${isToday ? ' today' : ''}"${
			isToday ? ' id="today-row"' : ''
		} data-date="${formatDate(dayDate)}">
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
			 <div class="day-utilization">
				  <div class="utilization-bar" style="width: ${busyPercentage}%"></div>
			 </div>
		</div>`
	}

	html += `</div>`
	return html
}

function setupMonthNavigation(currentDate, events) {
	document.addEventListener('click', function (e) {
		if (e.target.closest('.month-nav-btn')) {
			const btn = e.target.closest('.month-nav-btn')
			const action = btn.dataset.action
			const newDate = new Date(currentDate)

			if (action === 'prev') {
				newDate.setMonth(newDate.getMonth() - 1)
			} else if (action === 'next') {
				newDate.setMonth(newDate.getMonth() + 1)
			}

			// Обновляем отображение календаря
			const content = document.getElementById('content')
			content.innerHTML = createMonthView(newDate, events)
			currentDate = newDate
		}
	})
}

function createBottomNav() {
	return `
    <div class="bottom-nav">
      <button class="nav-btn active" data-view="home">
        <img src="/assets/contacts.svg" />
      </button>
      <button class="nav-btn" data-view="calendar">
        <img src="/assets/calendar.svg" />
      </button>


      <button class="nav-btn" data-view="profile">
        <img src="/assets/profile.svg" />
		      <button class="add-btn" id="openModalBtn">+</button>
      </button>
    </div>
  `
	/*      <button class="nav-btn" data-view="notes">
        <img src="/assets/notes.svg" />
      </button>*/
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
						([key, value]) => `<option value="${key}">${value.name}</option>`
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

function getThemeKey(themeObject) {
	return Object.keys(EventThemes).find(key => EventThemes[key] === themeObject)
}

function fillEventForm(event) {
	document.getElementById('eventTitle').value = event.title
	document.getElementById('eventDate').value = event.date
	document.getElementById('startTime').value = event.timeStart
	document.getElementById('endTime').value = event.timeEnd
	document.getElementById('eventPerson').value = event.person || ''
	document.getElementById('eventNotification').checked = event.notification
	document.getElementById('eventTheme').value = getThemeKey(event.theme)
	document.getElementById('eventDescription').value = event.description || ''
}

// Функция перевода в режим редактирования
function setEditMode() {
	const modal = document.getElementById('eventModal')
	if (!modal) return

	// Меняем заголовок
	const title = modal.querySelector('h2')
	if (title) title.textContent = 'Редактировать событие'

	// Меняем текст кнопки
	const submitBtn = modal.querySelector('.submit-btn')
	if (submitBtn) submitBtn.textContent = 'Сохранить'
}

// Функция перевода в режим создания
function setCreateMode() {
	const modal = document.getElementById('eventModal')
	if (!modal) return

	// Меняем заголовок
	const title = modal.querySelector('h2')
	if (title) title.textContent = 'Добавить событие'

	// Меняем текст кнопки
	const submitBtn = modal.querySelector('.submit-btn')
	if (submitBtn) submitBtn.textContent = 'Создать'
}

// После добавления HTML в DOM нужно добавить обработчики:
function setupEventModal() {
	let modal = document.getElementById('eventModal')
	const openBtn = document.getElementById('openModalBtn')
	const closeBtn = document.querySelector('.close-btn')
	const form = document.getElementById('eventForm')
	let currentEventId = null

	openBtn.addEventListener('click', () => {
		setCreateMode()
		const selectedDate = document.querySelector('.weekday.active')
		if (selectedDate) {
			document.getElementById('eventDate').value = selectedDate.dataset.date
		}
		modal.style.display = 'block'
	})

	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none'
		resetErrors()
		form.reset()
	})

	window.addEventListener('click', e => {
		if (e.target === modal) {
			modal.style.display = 'none'
			resetErrors()
			form.reset()
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

		// Проверка пересечения с другими событиями
		if (startTime.value && endTime.value) {
			const timeErrorElement = document.getElementById('timeError')
			const hasOverlap = checkTimeOverlap(
				date.value,
				startTime.value,
				endTime.value,
				currentEventId
			)

			if (hasOverlap) {
				timeErrorElement.textContent = 'Время пересекается с другим событием'
				timeErrorElement.style.display = 'block'
				isValid = false
			}
		}

		// Если валидация не прошла, не отправляем форму
		if (!isValid) return
		// Если все в порядке, создаем событие
		const formData = {
			title: document.getElementById('eventTitle').value,
			date: document.getElementById('eventDate').value,
			timeStart: document.getElementById('startTime').value,
			timeEnd: document.getElementById('endTime').value,
			person: document.getElementById('eventPerson').value,
			notification: document.getElementById('eventNotification').checked,
			theme: getThemeByName(document.getElementById('eventTheme').value),
			description: document.getElementById('eventDescription').value,
		}

		if (currentEventId) {
			// Редактирование существующего события
			const eventIndex = events.findIndex(ev => ev.id === currentEventId)
			if (eventIndex !== -1) {
				events[eventIndex] = { ...events[eventIndex], ...formData }
			}
		} else {
			// Создание нового события
			const newEvent = {
				id: events.length + 1,
				...formData,
			}
			events.push(newEvent)
		}

		const eventContainer = document.getElementById('eventsContainer')
		eventContainer.outerHTML = createEventsList(
			events,
			document.querySelector('.weekday.active').dataset.date
		)

		modal.style.display = 'none'
		form.reset()
		currentEventId = null
	})

	function checkTimeOverlap(date, newStartTime, newEndTime, currentEventId) {
		// Получаем все события на выбранную дату (let вместо const)
		let eventsOnDate = events.filter(event => event.date === date)

		// Игнорируем текущее событие при редактировании
		if (currentEventId) {
			eventsOnDate = eventsOnDate.filter(event => event.id !== currentEventId)
		}

		// Преобразуем время в минуты для удобства сравнения
		const newStart = timeToMinutes(newStartTime)
		const newEnd = timeToMinutes(newEndTime)

		return eventsOnDate.some(event => {
			const existingStart = timeToMinutes(event.timeStart)
			const existingEnd = timeToMinutes(event.timeEnd)

			// Проверяем пересечение интервалов
			return newStart < existingEnd && newEnd > existingStart
		})
	}

	// Функция для сброса сообщений об ошибках
	function resetErrors() {
		const errorMessages = document.querySelectorAll('.error-message')
		errorMessages.forEach(msg => {
			msg.style.display = 'none'
		})
	}

	document.addEventListener('click', e => {
		if (e.target.closest('.event-actions')) {
			return // Игнорируем клики в этой зоне полностью
		}

		const eventElement = e.target.closest('.event-card')
		if (eventElement) {
			const eventId = parseInt(eventElement.dataset.eventId)
			const event = events.find(ev => ev.id === eventId)
			if (event) {
				setEditMode()
				currentEventId = eventId
				fillEventForm(event)
				modal.style.display = 'block'
			}
		}
	})
}
