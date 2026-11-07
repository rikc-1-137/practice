import { useState } from 'react';
import Header from './components/Header.jsx';
import Masters from './components/Masters.jsx';
import Calendar from './components/Calendar.jsx';
import Slots from './components/Slots.jsx';
import { masters } from './data.js';

export default function App() {
  const [selectedMasterId, setSelectedMasterId] = useState(1);
  const [selectedDate, setSelectedDate] = useState({ year: 2026, month: 10, day: 13 });
  const [selectedTime, setSelectedTime] = useState('19:00');

  const handleSubmit = () => {
    const master = masters.find((m) => m.id === selectedMasterId);
    if (!master || !selectedTime) {
      alert('Выберите мастера и время');
      return;
    }
    const date = `${String(selectedDate.day).padStart(2, '0')}.${String(
      selectedDate.month + 1
    ).padStart(2, '0')}.${selectedDate.year}`;
    alert(`Вы записаны!\n\nМастер: ${master.name}\nДата: ${date}\nВремя: ${selectedTime}`);
  };

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="title">Запись к мастеру</h1>

        <Masters
          masters={masters}
          selectedId={selectedMasterId}
          onSelect={setSelectedMasterId}
        />

        <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />

        <Slots selectedTime={selectedTime} onSelect={setSelectedTime} />

        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Записаться
        </button>
      </main>
      <footer className="footer">
        <p className="footer__text">© 2026 Барбершоп «Бритва». Все права защищены.</p>
      </footer>
    </>
  );
}