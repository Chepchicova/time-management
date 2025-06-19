const EventThemes = {
	WORK: { color: 'rgba(255, 164, 164, 0.72)' },
	PERSONAL: { color: 'rgba(255, 211, 180, 0.72)' },
	MEETING: { color: 'rgba(255, 251, 180, 0.72)' },
	HEALTH: { color: 'rgba(255, 180, 249, 0.72)' },
	EDUCATION: { color: 'rgba(180, 255, 186, 0.72)' },
	OTHER: { color: 'rgba(155, 155, 155, 0.72) ' },
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
		id: 1,
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
		id: 1,
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
		theme: EventThemes.MEETING,
		description: 'Обсуждение этапов проекта',
	},
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
		theme: EventThemes.EDUCATION,
		description: 'Обсуждение этапов проекта',
	},
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
		theme: EventThemes.HEALTH,
		description: 'Обсуждение этапов проекта',
	},
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
		theme: EventThemes.OTHER,
		description: 'Обсуждение этапов проекта',
	},
]
