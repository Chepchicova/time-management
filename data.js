// Массивы-заглушки для дней недели и событий (заменишь их данными из БД позже)

const weekDays = [
  { short: "Mon", num: 23 },
  { short: "Tue", num: 24 },
  { short: "Wed", num: 25 },
  { short: "Thu", num: 26 },
  { short: "Fri", num: 27 },
  { short: "Sat", num: 28 },
  { short: "Sun", num: 29 }
];

const events = [
  {
    id: 1,
    title: "Meeting with DEV team",
    time: "11:00 AM – 11:30 AM",
    start: "11:00",
    color: "#A47AFF"
  },
  {
    id: 2,
    title: "Calling with clients",
    time: "11:45 AM – 12:30 AM",
    start: "11:45",
    color: "#D36AC2"
  }, 

  {
    id: 3,
    title: "Large free slot",
    time: "12:40 AM – 13:45 AM",
    start: "13:00",
    color: "#4E93FF",
    free: true
  },
  
  {
    id: 4,
    title: "Meeting with investors",
    time: "14:00 AM – 15:10 AM",
    start: "14:00",
    color: "#FF5F5F"
  }
];