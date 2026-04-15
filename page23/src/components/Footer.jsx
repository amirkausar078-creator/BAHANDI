import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer style={{ background: '#002d5a', color: '#fff', padding: '60px 0', marginTop: '60px' }}>
            <div className="footer-container">
                <div className="footer-section">
                    <h2 style={{ color: '#fff', margin: '0 0 15px 0' }}>SPORT.NEWS</h2>
                    <p style={{ opacity: 0.7, lineHeight: '1.6' }}>
                        Ваш главный источник спортивных новостей. <br/>
                        Аналитика, результаты и эксклюзивные интервью.
                    </p>
                </div>
                
                <div className="footer-section">
                    <h4 style={{ marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Навигация</h4>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Главная лента</Link>
                    <Link to="/categories" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Категории</Link>
                </div>

                <div className="footer-section">
                    <h4 style={{ marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Контакты</h4>
                    <p style={{ opacity: 0.7, margin: '0 0 10px 0' }}>✉️ support@sportnews.com</p>
                    <p style={{ opacity: 0.7, margin: 0 }}>📍 Алматы, Казахстан</p>
                </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.4, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                ©️ 2026 Все права защищены. Разработано для фанатов спорта.
            </div>
        </footer>
    );
}

export default Footer;