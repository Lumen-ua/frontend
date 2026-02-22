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

const Register = () => {
  // ДОДАНО: стан для імені
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password !== confirmPassword) {
      alert("Паролі не співпадають!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ДОДАНО: тепер ми відправляємо ще й name
        body: JSON.stringify({ name: name, email: email, password: password }) 
      });

      if (response.ok) {
        alert("Реєстрація успішна! Тепер ви можете увійти.");
      } else {
        const errorData = await response.json();
        alert(`Помилка: ${errorData.message || "Не вдалося зареєструватися"}`);
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
        <AuthTitle>Зареєструватись</AuthTitle>
        <AuthForm onSubmit={handleSubmit}>
          
          {/* ДОДАНО: Поле для введення імені */}
          <AuthFieldGroup>
            <AuthLabel>Ім'я</AuthLabel>
            <AuthInput 
              type="text" 
              placeholder="Enter your name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </AuthFieldGroup>

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
          <AuthFieldGroup>
            <AuthLabel>Підтвердити пароль</AuthLabel>
            <AuthInput 
              type="password" 
              placeholder="Confirm password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </AuthFieldGroup>
          <AuthSubmitButton type="submit">Зареєструватись</AuthSubmitButton>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Register;