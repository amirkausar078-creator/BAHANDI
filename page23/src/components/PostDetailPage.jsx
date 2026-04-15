import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Жаңа негізгі URL (сенің жаңа ID-іңмен)
    const BASE_URL = "https://c2c2b82ee72f2264.mokky.dev";

    useEffect(() => {
        async function fetchData() {
            try {
                // posts${id} емес, posts/${id} болуы керек (арасында қиғаш сызық "/")
                const [postRes, commRes] = await Promise.all([
                    axios.get(`${BASE_URL}/posts/${id}`), 
                    axios.get(`${BASE_URL}/comments?postId=${id}`)
                ]);
                setNews(postRes.data);
                setComments(commRes.data);
            } catch (e) { 
                console.error("Мәліметтерді жүктеу мүмкін болмады", e); 
            }
        }
        fetchData();
    }, [id]);

    async function submitComment(e) {
        e.preventDefault();
        if (!commentText.trim()) return;
        setIsSubmitting(true);

        try {
            const commentObj = {
                postId: id,
                text: commentText,
                createdAt: new Date().toLocaleString('ru-RU')
            };
            const response = await axios.post(`${BASE_URL}/comments`, commentObj);
            setComments([response.data, ...comments]);
            setCommentText('');
        } catch (e) { 
            alert("Пікір жіберу сәтсіз аяқталды"); 
        } finally { 
            setIsSubmitting(false); 
        }
    }

    return (
        <div className="container" style={{ maxWidth: '800px', padding: '40px 20px', background: '#fff', marginTop: '20px', borderRadius: '15px' }}>
            <img 
                src={news.image || "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200"} 
                alt={news.title} 
                style={{ width: '100%', borderRadius: '15px', marginBottom: '20px', height: '400px', objectFit: 'cover' }} 
            />
            
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a1a' }}>{news.title}</h1>
            <p style={{ color: '#666', marginBottom: '30px', fontWeight: '500' }}>
                {news.category} • {news.date}
            </p>
            
            <div style={{ lineHeight: '1.8', fontSize: '1.15rem', marginBottom: '50px', color: '#333' }}>
                {/* Егер базаңда мәтін болса, осы жерге news.description немесе news.text қой */}
                {news.description || "Бұл жаңалықтың толық мәтіні әлі жүктелмеген..."}
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '40px 0' }} />

            <section className="comments">
                <h3 style={{ marginBottom: '25px' }}>Талқылау ({comments.length})</h3>
                
                <form onSubmit={submitComment} style={{ marginBottom: '40px', background: '#f9f9f9', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                    <textarea 
                        placeholder="Өз пікіріңізді қалдырыңыз..."
                        style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', resize: 'none', minHeight: '80px', fontSize: '1rem' }}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{ 
                                padding: '10px 25px', 
                                background: '#111', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '8px', 
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            {isSubmitting ? 'Жіберілуде...' : 'Жариялау'}
                        </button>
                    </div>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {comments.length > 0 ? comments.map(c => (
                        <div key={c.id} style={{ background: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #f0f0f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#222' }}>{c.text}</p>
                            <small style={{ color: '#999', fontWeight: '500' }}>{c.createdAt}</small>
                        </div>
                    )) : <p style={{ color: '#999', textAlign: 'center' }}>Әзірге пікір жоқ. Бірінші болып қалдырыңыз!</p>}
                </div>
            </section>
        </div>
    );
}

export default PostDetailPage;