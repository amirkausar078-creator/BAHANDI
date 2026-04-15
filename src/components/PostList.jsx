import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/style/style.css';
import PostCard from './PostCard';

function PostList({ addToCart }) { // addToCart функциясын props ретінде аламыз
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    // URL-ден категорияны алу (мысалы: ?category=Бургеры)
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');

    useEffect(() => {
        async function fetchPost() {
            setIsLoading(true);
            try {
                // Mokky API-іне сұраныс
                let url = 'https://e7e5954563b5bfc5.mokky.dev/posts';
                
                // Егер категория таңдалса, URL-ге фильтр қосамыз
                if (currentCategory) {
                    url += `?category=${currentCategory}`;
                }

                const response = await axios.get(url);
                setNews(response.data);
            } catch (error) {
                console.error("Деректерді алу қатесі:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [currentCategory]); // Категория өзгерген сайын useEffect қайта орындалады

    const setFilter = (category) => {
        if (category) {
            navigate(`?category=${category}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="container">
            {/* Категориялар мәзірі (Батырмалар) */}
            <div className="category-filter" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <button 
                    className={!currentCategory ? "active-btn" : "filter-btn"} 
                    onClick={() => setFilter(null)}
                >
                    Все
                </button>
                <button 
                    className={currentCategory === 'Бургеры' ? "active-btn" : "filter-btn"} 
                    onClick={() => setFilter('Бургеры')}
                >
                    Бургеры
                </button>
                <button 
                    className={currentCategory === 'Новинки' ? "active-btn" : "filter-btn"} 
                    onClick={() => setFilter('Новинки')}
                >
                    Новинки
                </button>
            </div>

            <h2 className="section-title">
                {currentCategory ? `Категория: ${currentCategory}` : "Все товары"}
            </h2>

            {/* Жүктелу күйін тексеру */}
            {isLoading ? (
                <div className="loader">Загрузка...</div>
            ) : (
                <div className="post-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '20px' 
                }}>
                    {news.length > 0 ? (
                        news.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                addToCart={addToCart} // Егер бұл дүкен болса, себетке қосуды береміз
                            />
                        ))
                    ) : (
                        <p>По вашему запросу ничего не найдено.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostList;