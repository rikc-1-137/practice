export default function Masters({ masters, selectedId, onSelect }) {
  return (
    <section className="masters">
      <h2 className="section-title">Выберите мастера</h2>
      <div className="masters__list">
        {masters.map((m) => (
          <article
            key={m.id}
            className={
              'master-card' + (m.id === selectedId ? ' master-card--active' : '')
            }
            onClick={() => onSelect(m.id)}
          >
            <div className="master-card__avatar">{m.avatar}</div>
            <div className="master-card__info">
              <h3 className="master-card__name">{m.name}</h3>
              <p className="master-card__spec">{m.spec}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}