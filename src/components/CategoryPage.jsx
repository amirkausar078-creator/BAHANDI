import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = ({ addToCart }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        
        // 1. Дұрыс API сілтемесін қолдану (BAHANDI кестесі)
        fetch('https://8aefe87c60033c7c.mokky.dev/BAHANDI')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    let filtered = data;

                    // 2. Логикалық фильтрация
                    if (categoryName === 'new') {
                        filtered = data.filter(item => item.isNew === true || item.isNew === "true");
                    } else if (categoryName === 'sale') {
                        filtered = data.filter(item => item.isSale === true || item.isSale === "true");
                    } else if (categoryName) {
                        filtered = data.filter(item => item.category === categoryName);
                    }
                    
                    setGames(filtered);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Деректерді алу қатесі:", err);
                setLoading(false);
            });
    }, [categoryName]);

    if (loading) return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка...</h1>;

    return (
        <div className="category-page" style={{ padding: '20px' }}>
            {/* "Назад" батырмасы алынып тасталды */}
            
            <div className="grid-list">
                {games.length > 0 ? (
                    games.map(game => (
                        <div 
                            key={game.id} 
                            className="card" 
                            onClick={() => navigate(`/detail/${game.id}`)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-img-box">
                                <img src={game.image || game.img} alt={game.title} />
                            </div>
                            
                            <div className="card-content">
                                <p className="card-title">{game.title}</p>
                                <h3 className="card-price">{game.price} ₸</h3>
                                
                                <button 
                                    className="add-to-cart-btn" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(game);
                                    }}
                                >
                                    В корзину
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1/-1', marginTop: '50px' }}>
                        <p>Товары не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;