import React from 'react';
// Використовуємо відносний шлях, щоб уникнути помилок Vite
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
  return (
    <AuthPageWrapper>
      <AuthLogoImage src={lumenLogo} alt="LUMEN Logo" /> {/* [cite: 429, 460] */}
      <AuthFormContainer>
        <AuthTitle>Увійти в обліковий запис</AuthTitle>
        <AuthForm>
          <AuthFieldGroup>
            <AuthLabel>Пошта</AuthLabel>
            <AuthInput type="email" placeholder="Enter your email" required />
          </AuthFieldGroup>
          <AuthFieldGroup>
            <AuthLabel>Пароль</AuthLabel>
            <AuthInput type="password" placeholder="Enter your password" required />
          </AuthFieldGroup>
          <AuthSubmitButton type="submit">Увійти</AuthSubmitButton>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Login;