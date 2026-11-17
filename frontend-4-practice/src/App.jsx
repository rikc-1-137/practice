import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Masters from './components/Masters.jsx';
import Calendar from './components/Calendar.jsx';
import Slots from './components/Slots.jsx';
import { fetchMasters, fetchSlots, bookAppointment } from './api.js';

export default function App() {
  // Данные с «сервера»
  const [masters, setMasters] = useState([]);
  const [slots, setSlots] = useState([]);

  // Состояния загрузки/ошибок
  const [mastersLoading, setMastersLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [mastersError, setMastersError] = useState(null);
  const [slotsError, setSlotsError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Выбор пользователя
  const [selectedMasterId, setSelectedMasterId] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ year: 2026, month: 10, day: 13 });
  const [selectedTime, setSelectedTime] = useState(null);

  // Загрузка мастеров
  useEffect(() => {
    let cancelled = false;
    setMastersLoading(true);
    setMastersError(null);
    fetchMasters()
      .then((data) => {
        if (cancelled) return;
        setMasters(data);
        setSelectedMasterId(data[0]?.id ?? null);
      })
      .catch((e) => !cancelled && setMastersError(e.message))
      .finally(() => !cancelled && setMastersLoading(false));
    return () => { cancelled = true; };
  }, []);

  // Загрузка слотов при смене даты
  useEffect(() => {
    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(null);
    setSelectedTime(null);
    const dateStr = `${String(selectedDate.day).padStart(2, '0')}.${String(
      selectedDate.month + 1
    ).padStart(2, '0')}.${selectedDate.year}`;
    fetchSlots(dateStr)
      .then((data) => !cancelled && setSlots(data))
      .catch((e) => !cancelled && setSlotsError(e.message))
      .finally(() => !cancelled && setSlotsLoading(false));
    return () => { cancelled = true; };
  }, [selectedDate]);

  const handleSubmit = async () => {
    if (!selectedMasterId || !selectedTime) {
      setSubmitError('Выберите мастера и время');
      return;
    }
    setSubmitError(null);
    setSubmitLoading(true);
    try {
      const dateStr = `${String(selectedDate.day).padStart(2, '0')}.${String(
        selectedDate.month + 1
      ).padStart(2, '0')}.${selectedDate.year}`;
      const res = await bookAppointment({
        masterId: selectedMasterId,
        date: dateStr,
        time: selectedTime,
      });
      alert(res.message);
    } catch (e) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="title">Запись к мастеру</h1>

        {mastersLoading && <p className="status">Загрузка мастеров…</p>}
        {mastersError && <p className="status status--error">{mastersError}</p>}
        {!mastersLoading && !mastersError && (
          <Masters
            masters={masters}
            selectedId={selectedMasterId}
            onSelect={setSelectedMasterId}
          />
        )}

        <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />

        {slotsLoading && <p className="status">Загрузка слотов…</p>}
        {slotsError && <p className="status status--error">{slotsError}</p>}
        {!slotsLoading && !slotsError && (
          <Slots slots={slots} selectedTime={selectedTime} onSelect={setSelectedTime} />
        )}

        {submitError && <p className="status status--error">{submitError}</p>}

        <button
          className="submit-btn"
          type="button"
          onClick={handleSubmit}
          disabled={submitLoading}
        >
          {submitLoading ? 'Отправка…' : 'Записаться'}
        </button>
      </main>
      <footer className="footer">
        <p className="footer__text">© 2026 Барбершоп «Бритва». Все права защищены.</p>
      </footer>
    </>
  );
}