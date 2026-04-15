import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    let result;
    if (isRegister) {
      result = await register(credentials);
    } else {
      result = await login(credentials);
    }

    if (result.success) {
      alert(isRegister ? "Сәтті тіркелдіңіз!" : "Қош келдіңіз!");
      navigate('/'); 
    } else {
      alert("Қате: " + result.message);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto' }}>
      <h2>{isRegister ? "Тіркелу" : "Кіру"}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {isRegister ? "Жіберу" : "Кіру"}
        </button>
      </form>
      
      <button 
        onClick={() => setIsRegister(!isRegister)} 
        style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        {isRegister ? "Аккаунтыңыз бар ма? Кіру" : "Аккаунт жоқ па? Тіркелу"}
      </button>
    </div>
  );
};

export default AuthForm;