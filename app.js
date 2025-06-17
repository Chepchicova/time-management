document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const tabsHTML = `<div class="tabs">
        ${['Week', 'Month'].map((tab, i) => `<div class="tab">${tab}</div>`).join('')}
    </div>`;

    const contentHTML = `<div id="content"></div>`;

    // Нижнее меню
    const bottomNavHTML = createBottomNav();

    app.innerHTML = tabsHTML + contentHTML + bottomNavHTML;

    // Функция для отображения недельного вида
    function showWeekView() {
        const content = document.getElementById('content');
        content.innerHTML = createWeekdays(weekDays, 3) + createEventsList(events);
    }

    // Функция для отображения месячного вида
    function showMonthView() {
        const content = document.getElementById('content');
        content.innerHTML = createMonthView(new Date(), monthEvents);

        // Автопрокрутка к сегодняшнему дню (если есть)
        setTimeout(() => {
          const todayRow = document.getElementById('today-row');
          if (todayRow) {
            todayRow.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }, 100);
    }

    // Обработчики для вкладок
    document.querySelectorAll('.tab').forEach((tab, index) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            if (index === 0) {
                showWeekView();
                window.history.pushState({view: 'week'}, '', '#week');
            } else {
                showMonthView();
                window.history.pushState({view: 'month'}, '', '#month');
            }
        });
    });

    // Инициализация при загрузке
    if (window.location.hash === '#month') {
        document.querySelectorAll('.tab')[1].classList.add('active');
        showMonthView();
    } else {
        document.querySelectorAll('.tab')[0].classList.add('active');
        showWeekView();
    }

    window.addEventListener('popstate', (e) => {
        if (window.location.hash === '#month') {
            document.querySelectorAll('.tab')[1].classList.add('active');
            document.querySelectorAll('.tab')[0].classList.remove('active');
            showMonthView();
        } else {
            document.querySelectorAll('.tab')[0].classList.add('active');
            document.querySelectorAll('.tab')[1].classList.remove('active');
            showWeekView();
        }
    });
});