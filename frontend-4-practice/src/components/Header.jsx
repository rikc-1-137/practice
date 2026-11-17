export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="logo">
          <span className="logo__icon">💈</span>
          <span className="logo__text">Бритва</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav__link">Услуги</a>
          <a href="#" className="nav__link">Мастера</a>
          <a href="#" className="nav__link nav__link--active">Запись</a>
        </nav>
      </div>
    </header>
  );
}