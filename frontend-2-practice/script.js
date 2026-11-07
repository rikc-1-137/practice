/* ===== Данные ===== */
const masters = [
  { id: 1, name: 'Артём', spec: 'Классические стрижки', avatar: '👨‍🦱' },
  { id: 2, name: 'Игорь', spec: 'Борода и бритьё', avatar: '🧔' },
  { id: 3, name: 'Мария', spec: 'Стрижки и укладка', avatar: '👩' },
];

// Занятые слоты: для простоты — одинаковые для всех дней.
const busySlots = ['13:00', '16:00'];
const allSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'];

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

/* ===== Состояние ===== */
const state = {
  selectedMasterId: 1,
  currentYear: 2026,
  currentMonth: 10, // 0 = январь, 10 = ноябрь
  selectedDay: 13,
  selectedTime: '19:00',
};

/* ===== DOM ===== */
const mastersListEl = document.getElementById('masters-list');
const calendarGridEl = document.getElementById('calendar-grid');
const currentMonthEl = document.getElementById('current-month');
const slotsListEl = document.getElementById('slots-list');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const submitBtn = document.getElementById('submit-btn');

/* ===== Мастера ===== */
function renderMasters() {
  mastersListEl.innerHTML = '';
  masters.forEach((m) => {
    const card = document.createElement('article');
    card.className =
      'master-card' + (m.id === state.selectedMasterId ? ' master-card--active' : '');
    card.innerHTML = `
      <div class="master-card__avatar">${m.avatar}</div>
      <div class="master-card__info">
        <h3 class="master-card__name">${m.name}</h3>
        <p class="master-card__spec">${m.spec}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      state.selectedMasterId = m.id;
      renderMasters();
    });
    mastersListEl.appendChild(card);
  });
}

/* ===== Календарь ===== */
function renderCalendar() {
  currentMonthEl.textContent = `${MONTHS[state.currentMonth]} ${state.currentYear}`;
  calendarGridEl.innerHTML = '';

  // Первый день месяца (0 = вс). Приводим к понедельнику.
  const firstDay = new Date(state.currentYear, state.currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;

  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();

  // Пустые ячейки
  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('span');
    empty.className = 'calendar__day calendar__day--empty';
    calendarGridEl.appendChild(empty);
  }

  // Дни
  for (let day = 1; day <= daysInMonth; day++) {
    const el = document.createElement('span');
    el.className = 'calendar__day';
    el.textContent = day;

    const isPast = day < 1; // упрощение: все дни доступны
    if (isPast) el.classList.add('calendar__day--disabled');

    if (day === state.selectedDay) el.classList.add('calendar__day--active');

    el.addEventListener('click', () => {
      if (el.classList.contains('calendar__day--disabled')) return;
      state.selectedDay = day;
      renderCalendar();
    });

    calendarGridEl.appendChild(el);
  }
}

/* ===== Слоты ===== */
function renderSlots() {
  slotsListEl.innerHTML = '';
  allSlots.forEach((time) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'slot';
    btn.textContent = time;

    const isBusy = busySlots.includes(time);
    if (isBusy) {
      btn.classList.add('slot--busy');
      btn.disabled = true;
    }
    if (time === state.selectedTime && !isBusy) {
      btn.classList.add('slot--active');
    }

    btn.addEventListener('click', () => {
      if (isBusy) return;
      state.selectedTime = time;
      renderSlots();
    });

    slotsListEl.appendChild(btn);
  });
}

/* ===== Переключение месяцев ===== */
prevBtn.addEventListener('click', () => {
  state.currentMonth -= 1;
  if (state.currentMonth < 0) {
    state.currentMonth = 11;
    state.currentYear -= 1;
  }
  state.selectedDay = 1;
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  state.currentMonth += 1;
  if (state.currentMonth > 11) {
    state.currentMonth = 0;
    state.currentYear += 1;
  }
  state.selectedDay = 1;
  renderCalendar();
});

/* ===== Кнопка «Записаться» ===== */
submitBtn.addEventListener('click', () => {
  const master = masters.find((m) => m.id === state.selectedMasterId);
  const date = `${String(state.selectedDay).padStart(2, '0')}.${String(
    state.currentMonth + 1
  ).padStart(2, '0')}.${state.currentYear}`;
  alert(
    `Вы записаны!\n\nМастер: ${master.name}\nДата: ${date}\nВремя: ${state.selectedTime}`
  );
});

/* ===== Инициализация ===== */
renderMasters();
renderCalendar();
renderSlots();