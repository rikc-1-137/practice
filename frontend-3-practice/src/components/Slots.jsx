import { allSlots, busySlots } from '../data.js';

export default function Slots({ selectedTime, onSelect }) {
  return (
    <section className="slots">
      <h2 className="section-title">Выберите время</h2>
      <div className="slots__list">
        {allSlots.map((time) => {
          const isBusy = busySlots.includes(time);
          const cls =
            'slot' +
            (isBusy ? ' slot--busy' : '') +
            (time === selectedTime && !isBusy ? ' slot--active' : '');
          return (
            <button
              key={time}
              type="button"
              className={cls}
              disabled={isBusy}
              onClick={() => !isBusy && onSelect(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </section>
  );
}