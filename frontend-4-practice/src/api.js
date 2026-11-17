// Имитация сервера: возвращает данные с задержкой.
// В реальном приложении здесь был бы fetch('/api/...').

import { masters, allSlots, busySlots } from './data.js';

const DELAY = 800;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMasters() {
  await delay(DELAY);
  return masters;
}

export async function fetchSlots(dateStr) {
  await delay(DELAY);
  // Для демонстрации: по чётным дням «13:00» свободен, по нечётным — занят.
  const day = Number(dateStr.split('.')[0]);
  const busy = day % 2 === 0 ? busySlots.filter((t) => t !== '13:00') : busySlots;
  return allSlots.map((time) => ({ time, busy: busy.includes(time) }));
}

export async function bookAppointment(payload) {
  await delay(DELAY);
  // Имитация ошибки сервера для наглядности: если мастер = 2 — сервер «падает».
  if (payload.masterId === 2) {
    throw new Error('Сервер временно недоступен. Попробуйте другого мастера.');
  }
  return { ok: true, message: 'Вы успешно записаны!' };
}