import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

function PostList() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');

    useEffect(() => {
        async function fetchPosts() {
            setIsLoading(true);
            try {
                // Если категория есть, добавляем фильтр в запрос к Mokky
                const url = currentCategory 
                    ? `https://dea920a762b902b2.mokky.dev/posts?category=${currentCategory}`
                    : 'https://dea920a762b902b2.mokky.dev/posts';

                const response = await axios.get(url);
                setNews(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, [currentCategory]);

    return (
        <div className="container">
            <div className="filters">
                <button className={`filter-btn ${!currentCategory ? 'active' : ''}`} onClick={() => navigate('/')}>Все</button>
                <button className={`filter-btn ${currentCategory === 'Футбол' ? 'active' : ''}`} onClick={() => navigate('?category=Футбол')}>Футбол</button>
                <button className={`filter-btn ${currentCategory === 'ММА' ? 'active' : ''}`} onClick={() => navigate('?category=ММА')}>ММА</button>
            </div>

            <h2 style={{ marginBottom: '30px' }}>
                {currentCategory ? `Новости спорта: ${currentCategory}` : 'Последние новости'}
            </h2>

            {isLoading ? (
                <div className="loader">Загрузка свежих новостей...</div>
            ) : (
                <div className="posts-grid">
                    {news.length > 0 ? (
                        news.map((post) => <PostCard key={post.id} post={post} />)
                    ) : (
                        <p>В категории "{currentCategory}" пока нет новостей.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostList;