import { Link } from "react-router-dom";

function PostCard({ post }) {
    // Массив качественных фонов, если в базе фигня
    const categoryImages = {
        'Футбол': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
        'ММА': 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=800&q=80',
        'default': 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80'
    };

    // Проверка: если картинка в базе содержит "ball" или слишком маленькая/отсутствует — меняем
    const getValidImage = () => {
        if (!post.image || post.image.includes('ball') || post.image.length < 10) {
            return categoryImages[post.category] || categoryImages['default'];
        }
        return post.image;
    };

    return (
        <Link to={`/post/${post.id}`} className="post-card">
            <img src={getValidImage()} alt={post.title} />
            <div className="post-card-body">
                <span className="category-label">{post.category}</span>
                <h3>{post.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{post.date || 'Сегодня'}</p>
                <span style={{ color: '#0056b3', fontWeight: 'bold', fontSize: '14px' }}>Читать далее →</span>
            </div>
        </Link>
    );
}

export default PostCard;