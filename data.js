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
		color: '#4CAF50',
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
		color: '#9C27B0',
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
		timeStart: '11:00', // Формат HH:MM (24h)
		timeEnd: '12:30', // Формат HH:MM (24h)
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
		timeStart: '11:00', // Формат HH:MM (24h)
		timeEnd: '12:30', // Формат HH:MM (24h)
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.OTHER,
		description: 'Обсуждение этапов проекта',
	},
]
