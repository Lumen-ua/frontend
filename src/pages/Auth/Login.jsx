import React, { useState } from 'react';
import lumenLogo from '../../assets/images/lumen-logo.webp';
import { 
  AuthPageWrapper, 
  AuthLogoImage, 
  AuthFormContainer, 
  AuthTitle, 
  AuthForm, 
  AuthFieldGroup,
  AuthLabel, 
  AuthInput, 
  AuthSubmitButton 
} from './Auth.styled';

const Login = () => {
  // 1. Додаємо стани для пошти та пароля
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 2. Робимо запит на логін
      const response = await fetch('http://localhost:5000/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });

      if (response.ok) {
        // 3. Якщо успішно — отримуємо дані (включно з токеном)
        const data = await response.json();
        
        // 4. НАЙГОЛОВНІШЕ: зберігаємо токен у локальне сховище браузера!
        localStorage.setItem('token', data.token); 
        
        alert("Вхід успішний!");
        
        // Пізніше ми тут додамо код, який перекине користувача на сторінку профілю
        // window.location.href = '/profile';
      } else {
        const errorData = await response.json();
        alert(`Помилка входу: ${errorData.message || "Невірний логін або пароль"}`);
      }
    } catch (error) {
      console.error("Помилка з'єднання:", error);
      alert("Немає зв'язку з сервером. Перевірте, чи запущений бекенд.");
    }
  };

  return (
    <AuthPageWrapper>
      <AuthLogoImage src={lumenLogo} alt="LUMEN Logo" />
      <AuthFormContainer>
        <AuthTitle>Увійти в обліковий запис</AuthTitle>
        {/* Вішаємо обробник на форму */}
        <AuthForm onSubmit={handleSubmit}>
          <AuthFieldGroup>
            <AuthLabel>Пошта</AuthLabel>
            <AuthInput 
              type="email" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </AuthFieldGroup>
          <AuthFieldGroup>
            <AuthLabel>Пароль</AuthLabel>
            <AuthInput 
              type="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthFieldGroup>
          <AuthSubmitButton type="submit">Увійти</AuthSubmitButton>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Login;