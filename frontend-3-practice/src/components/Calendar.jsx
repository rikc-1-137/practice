import { MONTHS } from '../data.js';

export default function Calendar({ selectedDate, onChange }) {
  const { year, month, day } = selectedDate;

  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const changeMonth = (delta) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 0) { newMonth = 11; newYear -= 1; }
    if (newMonth > 11) { newMonth = 0; newYear += 1; }
    onChange({ year: newYear, month: newMonth, day: 1 });
  };

  return (
    <section className="calendar">
      <h2 className="section-title">Выберите дату</h2>
      <div className="calendar__header">
        <button className="calendar__arrow" type="button" onClick={() => changeMonth(-1)}>‹</button>
        <span className="calendar__month">{MONTHS[month]} {year}</span>
        <button className="calendar__arrow" type="button" onClick={() => changeMonth(1)}>›</button>
      </div>
      <div className="calendar__weekdays">
        {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((w) => (
          <span key={w} className="calendar__weekday">{w}</span>
        ))}
      </div>
      <div className="calendar__grid">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`empty-${i}`} className="calendar__day calendar__day--empty" />
          ) : (
            <span
              key={d}
              className={
                'calendar__day' + (d === day ? ' calendar__day--active' : '')
              }
              onClick={() => onChange({ year, month, day: d })}
            >
              {d}
            </span>
          )
        )}
      </div>
    </section>
  );
}