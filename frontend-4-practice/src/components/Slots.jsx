export default function Slots({ slots, selectedTime, onSelect }) {
  return (
    <section className="slots">
      <h2 className="section-title">Выберите время</h2>
      <div className="slots__list">
        {slots.map(({ time, busy }) => {
          const cls =
            'slot' +
            (busy ? ' slot--busy' : '') +
            (time === selectedTime && !busy ? ' slot--active' : '');
          return (
            <button
              key={time}
              type="button"
              className={cls}
              disabled={busy}
              onClick={() => !busy && onSelect(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </section>
  );
}