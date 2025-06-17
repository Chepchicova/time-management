// Основная логика приложения (позже можно заменить данные на реальные из БД)

document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app')

	// Верхние вкладки
	const tabsHTML = `<div class="tabs">
    ${['Day', 'Week', 'Month'].map((t, i) => createTab(t, i === 1)).join('')}
  </div>`

	// Неделя
	const weekdaysHTML = createWeekdays()

	const eventsHTML = createEventsList(events)

	// Нижнее меню
	const bottomNavHTML = createBottomNav()

	const modalHTML = createModal()

	app.innerHTML =
		tabsHTML + weekdaysHTML + eventsHTML + bottomNavHTML + modalHTML
})
