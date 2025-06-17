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

// для месяца 
const monthEvents = {
  25: [
    {
      title: "2705 Инвестиро",
      timeStart: "08:00",
      timeEnd: "09:45",
      theme: { color: "#B2E0FF" }
    },
    {
      title: "2705 Биржи",
      timeStart: "09:45",
      timeEnd: "10:30",
      theme: { color: "#B2E0FF" }
    },
    {
      title: "Купить",
      timeStart: "12:00",
      timeEnd: "13:00",
      theme: { color: "#E8FFB2" }
    },
    {
      title: "Дайджест приложений ловфлоафпдовпад лофвполаофыпваорпфова рпдорвыа",
      timeStart: "18:00",
      timeEnd: "19:00",
      theme: { color: "#D6E5FF" }
    }
  ],
  26: [
    {
      title: "Кураторский час",
      timeStart: "15:00",
      timeEnd: "16:00",
      theme: { color: "#B2C9FF" }
    },
    {
      title: "Временно бесплатно",
      timeStart: "18:00",
      timeEnd: "19:00",
      theme: { color: "#A0E9FF" }
    }
  ],
  // и так далее...
};
