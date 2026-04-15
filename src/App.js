import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Компоненттерді импорттау
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import PostDetailPage from './components/PostDetailPage'; 
import CategoryPage from './components/CategoryPage'; 
import Footer from './components/Footer';
import AuthForm from './components/AuthFrom'; 

// Стильдер мен Контекст
import './assets/style/style.css';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [cart, setCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Мәліметтерді базадан алу
  useEffect(() => {
    fetch('https://8aefe87c60033c7c.mokky.dev/BAHANDI')
      .then(res => res.json())
      .then(data => {
        setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("Деректерді жүктеу қатесі:", err));
  }, []);

  // Себетке қосу функциясы
  const addToCart = (product) => {
    setCart((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* Хедерді шет-шетке жаю үшін стиль қосылды */}
          <header className="header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 50px',
            backgroundColor: '#5cb885',
            color: 'white'
          }}>
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
              <h1 style={{ margin: 0 }}>BAHANDI</h1>
            </Link>

            <nav className="nav-menu" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
              <Link to="/categories/burgers" className="nav-item" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>БУРГЕРЫ</Link>
              <Link to="/categories/new" className="nav-item" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>НОВИНКИ</Link>
              <Link to="/categories/sale" className="nav-item" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>СКИДКИ</Link>

              <Link to="/cart" className="nav-cart-btn" style={{ 
                backgroundColor: '#e67e22', 
                padding: '8px 15px', 
                borderRadius: '8px', 
                color: 'white', 
                textDecoration: 'none' 
              }}>
                КОРЗИНА ({cart.reduce((a, b) => a + b.quantity, 0)})
              </Link>
              
              <Link to="/auth" className="nav-item" style={{ 
                border: '1px solid white', 
                padding: '8px 20px', 
                borderRadius: '8px', 
                color: 'white', 
                textDecoration: 'none' 
              }}>
                ВОЙТИ
              </Link>
            </nav>
          </header>

          <main className="main-content" style={{ minHeight: '80vh', padding: '20px' }}>
            <Routes>
              {/* Басты бет */}
              <Route path="/" element={<HomePage addToCart={addToCart} products={allProducts} />} />
              
              {/* Категориялар беті (Динамикалық) */}
              <Route path="/categories/:categoryName" element={<CategoryPage addToCart={addToCart} />} />
              
              {/* Толық мәлімет беті */}
              <Route path="/detail/:id" element={<PostDetailPage addToCart={addToCart} />} />
              
              {/* Себет беті */}
              <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />

              {/* Кіру/Тіркелу беті */}
              <Route path="/auth" element={<AuthForm />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;