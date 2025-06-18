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
		theme: EventThemes.HEALTH,
	},
	{
		id: 3,
		title: 'Совещание с разработчиками',
		date: '2023-06-23', // Формат YYYY-MM-DD
		timeStart: '15:00', // Формат HH:MM (24h)
		timeEnd: '16:30', // Формат HH:MM (24h)
		person: {
			id: 101,
			name: 'Иван Петров',
			role: 'Тимлид',
		},
		notification: true,
		theme: EventThemes.WORK,
		description: 'Обсуждение этапов проекта',
	},
]
