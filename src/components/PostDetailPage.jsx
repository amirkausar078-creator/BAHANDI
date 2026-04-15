import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resPost = await axios.get(`https://8aefe87c60033c7c.mokky.dev/BAHANDI/${id}`);
        setPost(resPost.data);

        try {
          // ИСПРАВЛЕНО: Загрузка из таблицы 'coments' (одна 'm')
          const resComments = await axios.get(`https://8aefe87c60033c7c.mokky.dev/coments?parentId=${id}`);
          setComments(resComments.data);
        } catch (commentErr) {
          console.warn("Пікірлер кестесі табылмады.");
        }

      } catch (error) {
        console.error("Тауарды жүктеу мүмкін болмады:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Пікір жіберу функциясы
  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // ИСПРАВЛЕНО: Отправка в таблицу 'coments' (одна 'm')
      const response = await axios.post('https://8aefe87c60033c7c.mokky.dev/coments', {
        parentId: id, 
        text: newComment,
        date: new Date().toLocaleString()
      });

      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Пікір жіберу кезінде қате шықты. Ссылканы немесе Mokky-дегі таблица атын тексеріңіз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <h2 style={{textAlign: 'center', marginTop: '100px'}}>ЖҮКТЕЛУДЕ...</h2>;
  
  if (!post) return (
    <div style={{textAlign: 'center', padding: '100px'}}>
      <h1>Тауар табылмады</h1>
      <button onClick={() => navigate('/')}>Артқа қайту</button>
    </div>
  );

  return (
    <div className="detail-page-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button className="back-btn" onClick={() => navigate(-1)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
            ← Артқа қайту
        </button>
        
        <div className="detail-content" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div className="detail-img" style={{ flex: '1', minWidth: '300px' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '20px' }} />
          </div>

          <div className="detail-info" style={{ flex: '1', minWidth: '300px' }}>
            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{post.title}</h1>
              <p className="modal-price-display" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff5e00' }}>
                {post.price.toLocaleString()} ₸ • {post.weight} г
              </p>
              <p className="modal-desc" style={{ marginTop: '20px', lineHeight: '1.6', color: '#555' }}>
                {post.description}
              </p>
            </div>

            <div className="detail-footer" style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="counter-block">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button 
                className="final-add-btn"
                onClick={() => {
                  if(addToCart) addToCart({ ...post, quantity });
                  alert("Тауар себетке қосылды!");
                }}
              >
                В корзину | {(post.price * quantity).toLocaleString()} ₸
              </button>
            </div>
          </div>
        </div>
        
        <hr className="divider" style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />

        <div className="comments-section">
             <h3>Пікірлер ({comments.length})</h3>
             
             <div className="comments-list" style={{ marginTop: '20px', marginBottom: '20px' }}>
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <div key={item.id} className="comment-item" style={{background: '#f9f9f9', padding: '15px', marginBottom: '15px', borderRadius: '12px', border: '1px solid #f0f0f0'}}>
                      <p style={{margin: '0 0 5px 0', fontSize: '16px'}}>{item.text}</p>
                      <small style={{color: '#888'}}>{item.date}</small>
                    </div>
                  ))
                ) : (
                  <p style={{color: '#999'}}>Әзірге пікір жоқ...</p>
                )}
             </div>

             <form onSubmit={handleSendComment} style={{display: 'flex', gap: '10px', maxWidth: '600px'}}>
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Пікіріңізді қалдырыңыз..."
                  style={{flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd'}}
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{padding: '10px 25px', background: '#ff5e00', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
                >
                  {isSubmitting ? "..." : "Жіберу"}
                </button>
             </form>
        </div>
    </div>
  );
};

export default PostDetailPage;