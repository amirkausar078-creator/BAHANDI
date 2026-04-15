import { useState } from "react";
import { useAuth } from 'react-use-auth'// Контекстті импорттаймыз


function AuthForm({ mode = "login" }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login, register, loading } = useAuth();

  const isLogin = mode === "login";
  const title = isLogin ? "Авторизация" : "Регистрация";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.includes('@')) {
      setError("Дұрыс email енгізіңіз");
      return;
    }
    if (password.length < 6) {
      setError("Құпия сөз кем дегенде 6 таңбадан тұруы керек");
      return;
    }

    const action = isLogin ? login : register;
    const result = await action(email, password);

    if (result.success) {
      setSuccessMsg(isLogin ? "Сәтті кірдіңіз!" : "Тіркелу сәтті аяқталды!");
    } else {
      setError(result.message || "Қате орын алды");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="example@mail.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Құпия сөз</label>
            <input 
              type="password" 
              placeholder="******"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {successMsg && <p className="auth-success">{successMsg}</p>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Жүктелуде..." : (isLogin ? "Кіру" : "Тіркелу")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;