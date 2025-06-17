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
  // Определить месяц и год
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11

  // Получить количество дней в месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Названия дней недели (по-русски)
  const weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  
  let html = `<div class="month-list">`;
  for(let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const weekDayStr = weekDays[dayDate.getDay()];
    const dayEvents = eventsByDay[day] || [];
    
    html += `<div class="month-row">
      <div class="month-day">
        <span class="month-day-week">${weekDayStr}</span>
        <span class="month-day-num">${day}</span>
      </div>
      <div class="month-events">
        ${dayEvents.length === 0 ? `<span class="empty-day">—</span>` : dayEvents.map(ev => `
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



/*
// Функция для отображения недельного вида с текущей неделей
function showWeekView() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 (воскресенье) до 6 (суббота)
    const currentDate = now.getDate();
    
    // Находим понедельник текущей недели
    const monday = new Date(now);
    monday.setDate(currentDate - (currentDay === 0 ? 6 : currentDay - 1));
    
    // Создаем массив дней недели
    const weekDaysData = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        
        const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()];
        const dayNum = day.getDate();
        
        // Форматируем дату для поиска событий
        const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        
        // Находим события для этого дня
        const dayEvents = events.filter(event => event.date === dateStr);
        
        weekDaysData.push({
            short: dayShort,
            num: dayNum,
            date: dateStr,
            events: dayEvents
        });
    }
    
    // Находим индекс текущего дня
    const activeIndex = weekDaysData.findIndex(day => day.num === currentDate);
    
    const content = document.getElementById('content');
    content.innerHTML = createWeekdays(weekDaysData, activeIndex) + createEventsList(weekDaysData[activeIndex].events);
}

// Функция для отображения месячного вида
function showMonthView() {
    const content = document.getElementById('content');
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDate = now.getDate();
    
    // Получаем первый и последний день месяца
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Форматируем название месяца
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                       "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const monthName = monthNames[currentMonth];
    
    // Создаем массив дней месяца
    const daysInMonth = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayDate = new Date(currentYear, currentMonth, i);
        const dayOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][dayDate.getDay()];
        
        // Форматируем дату для поиска событий
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        
        // Находим события для этого дня
        const dayEvents = events.filter(event => event.date === dateStr).map(event => ({
            title: event.title,
            time: event.timeStart,
            duration: getDuration(event.timeStart, event.timeEnd),
            theme: event.theme
        }));
        
        daysInMonth.push({
            day: i,
            dayOfWeek,
            events: dayEvents,
            isToday: i === currentDate
        });
    }
    
    // Создаем HTML для месячного вида
    let monthHTML = `
        <div class="month-header">
            <h2>${monthName} ${currentYear}</h2>
        </div>
        <div class="month-table">
            <div class="month-row header">

            </div>
    `;

  // Добавляем строки с днями и событиями
daysInMonth.forEach(dayData => {
    monthHTML += `
        <div class="month-row ${dayData.isToday ? 'today' : ''}">
            <div class="month-cell day-info">
                <span class="day-of-week">${dayData.dayOfWeek}</span>
                <span class="day-number">${dayData.day}</span>
            </div>
    `;

    // Добавляем все события дня (без ограничений)
    dayData.events.forEach(event => {
        monthHTML += `
            <div class="month-cell event-cell">
                <div class="event-time" style="color: ${event.theme.color}">${event.time}</div>
                ${event.duration ? `<div class="event-duration">${event.duration}</div>` : ''}
            </div>
        `;
    });

    monthHTML += `</div>`;
});

    monthHTML += `</div>`;
    
    content.innerHTML = monthHTML;
}

// Функция для вычисления продолжительности события
function getDuration(start, end) {
    if (!start || !end || start === 'весь день' || end === 'весь день') return null;
    
    const [startHours, startMins] = start.split(':').map(Number);
    const [endHours, endMins] = end.split(':').map(Number);
    
    const totalStart = startHours * 60 + startMins;
    const totalEnd = endHours * 60 + endMins;
    const duration = totalEnd - totalStart;
    
    if (duration <= 0) return null;
    
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    
    return `${hours}ч ${mins}м`;
}
    */