// Массивы-заглушки для дней недели и событий (заменишь их данными из БД позже)

const weekDays = [
	{ short: 'Mon', num: 23 },
	{ short: 'Tue', num: 24 },
	{ short: 'Wed', num: 25 },
	{ short: 'Thu', num: 26 },
	{ short: 'Fri', num: 27 },
	{ short: 'Sat', num: 28 },
	{ short: 'Sun', num: 29 },
]

const EventThemes = {
	WORK: { color: '#4E93FF' },
	PERSONAL: { color: '#E91E63' },
	MEETING: { color: '#A47AFF' },
	HEALTH: { color: '#4CAF50' },
	EDUCATION: { color: '#9C27B0' },
	OTHER: { color: '#CCCCC' },
}

const events = [
	{
		id: 1,
		title: 'Совещание с разработчиками',
		date: '2023-06-23', // Формат YYYY-MM-DD
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
		date: '2023-06-24',
		timeStart: '09:00',
		timeEnd: '10:00',
		person: {
			id: 102,
			name: 'Доктор Смирнова',
		},
		notification: true,
		theme: EventThemes.HEALTH,
	},
]
