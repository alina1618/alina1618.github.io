import React, { useState } from 'react';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAction = async (type) => {
    if (!email || !password) {
      alert("Будь ласка, заповніть пошту та пароль!");
      return;
    }

    try {
      if (type === 'reg') {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Вітаємо! Ваш акаунт створено.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found') alert("Користувача не знайдено. Спочатку зареєструйтесь!");
      else if (err.code === 'auth/wrong-password') alert("Невірний пароль!");
      else if (err.code === 'auth/email-already-in-use') alert("Ця пошта вже зайнята!");
      else if (err.code === 'auth/weak-password') alert("Пароль має бути мін. 6 символів!");
      else alert("Помилка: " + err.message);
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div className="card" style={{ maxWidth: '420px', width: '100%', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', fontFamily: 'inherit' }}>
          Вхід у менеджер стартапів
        </h2>
        <p className="desc" style={{ fontSize: '14px', marginBottom: '24px' }}>
          Авторизуйтесь, щоб отримати доступ до керування ринком та інвесторами.
        </p>

        <div className="form-grid" style={{ display: 'block' }}>
          <div className="field" style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Електронна пошта</label>
            <input 
              type="email" 
              placeholder="alina.slota@lpnu.ua"
              style={{ fontFamily: 'inherit', fontSize: '15px' }}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="field" style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Пароль</label>
            <input 
              type="password" 
              placeholder="••••••••"
              style={{ fontFamily: 'inherit', fontSize: '15px' }}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>

        <button className="btn-green" onClick={() => handleAction('login')} style={{ width: '100%', padding: '12px', fontSize: '16px', fontWeight: '600', fontFamily: 'inherit' }}>
          Увійти в систему
        </button>

        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #dce3eb', paddingTop: '20px' }}>
          <p className="sub" style={{ marginBottom: '12px', fontSize: '14px' }}>Ще не маєте акаунту?</p>
          <button className="tag" onClick={() => handleAction('reg')} style={{ width: '100%', padding: '10px', fontSize: '14px', fontFamily: 'inherit' }}>
            Зареєструватися
          </button>
        </div>
      </div>
    </main>
  );
}

export default AuthPage;