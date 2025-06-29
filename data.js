const EventThemes = {
	WORK: {
		name: 'Работа',
		color: 'rgba(255, 164, 164, 0.72)',
		icon: '/assets/theme_icons/work.svg',
	},
	PERSONAL: {
		name: 'Личное',
		color: 'rgba(255, 211, 180, 0.72)',
		icon: '/assets/theme_icons/personal.svg',
	},
	MEETING: {
		name: 'Встречи',
		color: 'rgba(255, 251, 180, 0.72)',
		icon: '/assets/theme_icons/meeting.svg',
	},
	SPORT: {
		name: 'Спорт',
		color: 'rgba(181, 94, 238, 0.72)',
		icon: '/assets/theme_icons/sport.svg',
	},
	HEALTH: {
		name: 'Здоровье',
		color: 'rgba(255, 180, 249, 0.72)',
		icon: '/assets/theme_icons/health.svg',
	},
	EDUCATION: {
		name: 'Учеба',
		color: 'rgba(180, 255, 186, 0.72)',
		icon: '/assets/theme_icons/education.svg',
	},
	HOLYDAYS: {
		name: 'Праздники',
		color: 'rgba(225, 88, 161, 0.72)',
		icon: '/assets/theme_icons/holydays.svg',
	},
	OTHER: {
		name: 'Другое',
		color: 'rgba(155, 155, 155, 0.72)',
		icon: '/assets/theme_icons/other.svg',
	},
}

let events = [
	{
		id: 1,
		title: 'Совещание с разработчиками',
		date: '2025-06-17', // Формат YYYY-MM-DD
		timeStart: '11:00', // Формат HH:MM (24h)
		timeEnd: '12:30', // Формат HH:MM (24h)
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.WORK,
		description: 'Обсуждение этапов проекта',
	},
	{
		id: 2,
		title: 'Посещение врача',
		date: '2025-06-16',
		timeStart: '09:00',
		timeEnd: '10:00',
		person: {
			id: 102,
			name: 'Доктор Смирнова',
		},
		notification: true,
		theme: EventThemes.PERSONAL,
	},
	{
		id: 3,
		title: 'Совещание с разработчиками',
		date: '2025-06-23',
		timeStart: '15:00',
		timeEnd: '16:30',
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.MEETING,
		description: 'Обсуждение этапов проекта',
	},
	{
		id: 4,
		title: 'Совещание с разработчиками',
		date: '2025-06-17', // Формат YYYY-MM-DD
		timeStart: '11:00', // Формат HH:MM (24h)
		timeEnd: '12:30', // Формат HH:MM (24h)
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.EDUCATION,
		description: 'Обсуждение этапов проекта',
	},
	{
		id: 5,
		title: 'Совещание с разработчиками',
		date: '2025-06-17', // Формат YYYY-MM-DD
		timeStart: '13:00', // Формат HH:MM (24h)
		timeEnd: '14:30', // Формат HH:MM (24h)
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.HEALTH,
		description: 'Обсуждение этапов проекта',
	},
	{
		id: 6,
		title: 'Совещание с разработчиками',
		date: '2025-06-17', // Формат YYYY-MM-DD
		timeStart: '15:00', // Формат HH:MM (24h)
		timeEnd: '16:30', // Формат HH:MM (24h)
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.OTHER,
		description: 'Обсуждение этапов проекта',
	},
	{
		id: 7,
		title: 'Утренняя пробежка',
		date: '2025-06-29',
		timeStart: '08:00',
		timeEnd: '09:00',
		person: {
			id: 103,
			name: 'Тренер Сидоров',
		},
		notification: true,
		theme: EventThemes.SPORT,
		description: 'Парк Горького',
	},
	{
		id: 8,
		title: 'Семейный обед',
		date: '2025-06-29',
		timeStart: '13:00',
		timeEnd: '15:00',
		notification: false,
		theme: EventThemes.PERSONAL,
		description: 'Ресторан "У бабушки"',
	},
	{
		id: 9,
		title: 'Подготовка к конференции',
		date: '2025-06-29',
		timeStart: '16:00',
		timeEnd: '18:00',
		notification: true,
		theme: EventThemes.WORK,
		description: 'Домашний офис',
	},

	// 30 июня (понедельник)
	{
		id: 10,
		title: 'Плановое совещание',
		date: '2025-06-30',
		timeStart: '10:00',
		timeEnd: '11:30',
		person: {
			id: 104,
			name: 'Маргарита Валерьевна',
			role: 'Руководитель проекта',
		},
		notification: true,
		theme: EventThemes.MEETING,
		description: 'Конференц-зал №3',
	},
	{
		id: 11,
		title: 'Английский язык',
		date: '2025-06-30',
		timeStart: '18:00',
		timeEnd: '19:30',
		person: {
			id: 105,
			name: 'James Wilson',
		},
		notification: true,
		theme: EventThemes.EDUCATION,
		description: 'Zoom-конференция',
	},
	{
		id: 12,
		title: 'Прием у стоматолога',
		date: '2025-06-30',
		timeStart: '15:00',
		timeEnd: '16:00',
		notification: true,
		theme: EventThemes.HEALTH,
		description: 'Клиника "Белая улыбка"',
	},

	// 1 июля (вторник)
	{
		id: 13,
		title: 'Спринт по проекту X',
		date: '2025-07-01',
		timeStart: '09:00',
		timeEnd: '12:00',
		person: {
			id: 106,
			name: 'Команда разработки',
		},
		notification: true,
		theme: EventThemes.WORK,
		description: 'Офис, 5 этаж',
	},
	{
		id: 14,
		title: 'Йога',
		date: '2025-07-01',
		timeStart: '19:00',
		timeEnd: '20:00',
		notification: false,
		theme: EventThemes.SPORT,
		description: 'Студия "Гармония"',
	},
	{
		id: 15,
		title: 'День рождения мамы',
		date: '2025-07-01',
		timeStart: '20:00',
		timeEnd: '22:00',
		notification: true,
		theme: EventThemes.HOLYDAYS,
		description: 'Позвонить в 20:00',
	},

	// 2 июля (среда)
	{
		id: 16,
		title: 'Встреча с клиентом',
		date: '2025-07-02',
		timeStart: '11:00',
		timeEnd: '12:30',
		person: {
			id: 107,
			name: 'ООО "Технологии будущего"',
			role: 'Клиент',
		},
		notification: true,
		theme: EventThemes.WORK,
		description: 'Кофейня "Кофеин"',
	},
	{
		id: 17,
		title: 'Мастер-класс по фотографии',
		date: '2025-07-02',
		timeStart: '14:00',
		timeEnd: '17:00',
		notification: true,
		theme: EventThemes.EDUCATION,
		description: 'Фотостудия "Ракурс"',
	},
	{
		id: 18,
		title: 'Встреча с друзьями',
		date: '2025-07-02',
		timeStart: '19:00',
		timeEnd: '21:00',
		notification: false,
		theme: EventThemes.PERSONAL,
		description: 'Бар "Старая гавань"',
	},
	{
		id: 19,
		title: 'Другое мероприятие',
		date: '2025-07-02',
		timeStart: '21:00',
		timeEnd: '22:00',
		notification: false,
		theme: EventThemes.OTHER,
		description: 'Уточнить детали',
	},
]
