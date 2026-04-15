import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import PostDetailPage from "./components/PostDetailPage";
import Categories from "./components/Categories";
import AuthForm from './components/AuthFrom';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    /* 1. Бүкіл қосымшаны AuthProvider-мен ораймыз */
    <AuthProvider>
      <div className="app-wrapper">
        <Header />
        
        <main className="main-content">
          <Routes>
            {/* Басты бет */}
            <Route path="/" element={<PostList />} />
            
            {/* Тіркелу және Кіру беттері */}
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/register" element={<AuthForm mode="register" />} />
            
            {/* Категориялар */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<Categories />} />
            
            {/* Тауардың жеке беті */}
            <Route path="/post/:id" element={<PostDetailPage />} />

            {/* Қате сілтеме болса, басты бетке бағыттау */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;