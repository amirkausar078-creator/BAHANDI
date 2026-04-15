import { createContext, useContext, useState } from "react";

// 1. Контекстті құру
const AuthContext = createContext(null);

// 2. Арнайы хук (компоненттерде қолдану үшін)
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Тіркелу функциясы
  const register = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://mokky.dev/projects/52e21e395a0ff3eb/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Тіркелу кезінде қате кетті");

      setUser(data.data); // Пайдаланушы деректерін сақтау
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Логин функциясы
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://mokky.dev/projects/52e21e395a0ff3eb/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Логин немесе құпия сөз қате");

      setUser(data.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};