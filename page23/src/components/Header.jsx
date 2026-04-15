import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Контекстті импорттаймыз

function Header() {
  const { user, logout } = useAuth(); // Пайдаланушы мәртебесін аламыз

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          SPORT.NEWS
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Все новости</Link>
          <Link to="/categories" className="nav-link">Категории</Link>
        </nav>
      </div>

      <div className="header-right">
        {user ? (
          /* Пайдаланушы жүйеге кірген болса */
          <div className="user-profile">
            <span className="user-email">{user.email}</span>
            <button onClick={logout} className="logout-btn">Выйти</button>
          </div>
        ) : (
          /* Пайдаланушы кірмеген болса */
          <div className="auth-links">
            <Link to="/login" className="nav-link">Вход</Link>
            <Link to="/register" className="auth-btn-accent">Регистрация</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;