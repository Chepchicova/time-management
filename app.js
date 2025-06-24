document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app')

	const tabsHTML = `<div class="tabs">
        ${['Неделя', 'Месяц']
					.map((tab, i) => `<div class="tab">${tab}</div>`)
					.join('')}
    </div>`

	const contentHTML = `<div id="content"></div>`

	// Нижнее меню
	const bottomNavHTML = createBottomNav()
	const modalHTML = createModal()

	app.innerHTML = tabsHTML + contentHTML + bottomNavHTML + modalHTML

	// Функция для отображения недельного вида
	function showWeekView() {
		const content = document.getElementById('content')
		content.innerHTML =
			createWeekdays() + createEventsList(events, formatDate(new Date()))
	}

	// Функция для отображения месячного вида
	function showMonthView() {
		const content = document.getElementById('content')
		content.innerHTML = createMonthView(new Date(), events)

		// Автопрокрутка к сегодняшнему дню (если есть)
		setTimeout(() => {
			const todayRow = document.getElementById('today-row')
			if (todayRow) {
				todayRow.scrollIntoView({ block: 'center', behavior: 'smooth' })
			}
		}, 100)
	}

	// Обработчики для вкладок
	document.querySelectorAll('.tab').forEach((tab, index) => {
		tab.addEventListener('click', () => {
			document
				.querySelectorAll('.tab')
				.forEach(t => t.classList.remove('active'))
			tab.classList.add('active')
			if (index === 0) {
				showWeekView()
				window.history.pushState({ view: 'week' }, '', '#week')
			} else {
				showMonthView()
				window.history.pushState({ view: 'month' }, '', '#month')
			}
		})
	})

	// Инициализация при загрузке
	if (window.location.hash === '#month') {
		document.querySelectorAll('.tab')[1].classList.add('active')
		showMonthView()
	} else {
		document.querySelectorAll('.tab')[0].classList.add('active')
		showWeekView()
	}

	window.addEventListener('popstate', e => {
		if (window.location.hash === '#month') {
			document.querySelectorAll('.tab')[1].classList.add('active')
			document.querySelectorAll('.tab')[0].classList.remove('active')
			showMonthView()
		} else {
			document.querySelectorAll('.tab')[0].classList.add('active')
			document.querySelectorAll('.tab')[1].classList.remove('active')
			showWeekView()
		}
	})

	setupEventModal()
// === НИЖНЯЯ НАВИГАЦИЯ ===
function setupBottomNav() {
    const navBtns = document.querySelectorAll('.bottom-nav .nav-btn')
    const tabs = document.querySelector('.tabs')
    const content = document.getElementById('content')

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1) переключаем active-класс
            navBtns.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')

            // 2) читаем, какую ‹data-view› нажали
            const view = btn.dataset.view

            if (view === 'calendar') {
                // показываем табсы и текущий календарь
                tabs.style.display = 'flex'
                const activeTab = document.querySelector('.tab.active')
                if (activeTab && activeTab.textContent === 'Месяц') {
                    showMonthView()
                } else {
                    showWeekView()
                }
} else if (view === 'notes') {
    import('./notes.js').then(module => {
        module.renderNotesPage();
        window.history.pushState({ view: 'notes' }, '', '#notes');
        
        // Гарантированно скрываем вкладки
        document.querySelector('.tabs').style.display = 'none';
    });

} else {
                // скрываем табсы
                tabs.style.display = 'none'
                // рендерим «домашку» или «профиль»
                switch(view) {
                    case 'home':
                        content.innerHTML = `<div class="home-view"><h2>Главная</h2><p>Добро пожаловать!</p></div>`
                        break
                    case 'profile':
                        content.innerHTML = `<div class="profile-view"><h2>Профиль</h2><p>Информация о вас.</p></div>`
                        break
                }
            }
        })
    })
}

  setupBottomNav()
})





