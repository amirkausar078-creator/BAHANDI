import { useNavigate } from 'react-router-dom';

function Categories() {
    const navigate = useNavigate();

    const allCategories = [
        { 
            id: 1, 
            name: 'Футбол', 
            desc: 'Лига чемпионов, трансферы и результаты матчей', 
            icon: '⚽',
            img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500'
        },
        { 
            id: 2, 
            name: 'ММА', 
            desc: 'UFC, Bellator и громкие поединки в октагоне', 
            icon: '🥊',
            img: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=500'
        },
        { 
            id: 3, 
            name: 'Теннис', 
            desc: 'Турниры Большого шлема и мировые рейтинги', 
            icon: '🎾',
            img: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/primary/l7ctrvoesny1zi4jfpow'
        },
        { 
            id: 4, 
            name: 'Баскетбол', 
            desc: 'Новости NBA и еврокубков', 
            icon: '🏀',
            img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500'
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            <h1 style={{ marginBottom: '10px' }}>Категории спорта</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>Выберите интересующий вас раздел, чтобы увидеть актуальные новости.</p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
                gap: '20px' 
            }}>
                {allCategories.map(cat => (
                    <div 
                        key={cat.id} 
                        onClick={() => navigate(`/?category=${cat.name}`)}
                        className="post-card" // Используем уже готовый класс из style.css
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                        <img src={cat.img} alt={cat.name} style={{ height: '150px' }} />
                        <div style={{ padding: '20px' }}>
                            <div style={{ fontSize: '30px', marginBottom: '10px' }}>{cat.icon}</div>
                            <h3 style={{ margin: '0 0 10px 0' }}>{cat.name}</h3>
                            <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>{cat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;