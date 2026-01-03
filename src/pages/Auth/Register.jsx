import React from 'react';
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
  return (
    <AuthPageWrapper>
      <AuthLogoImage src={lumenLogo} alt="LUMEN Logo" />
      <AuthFormContainer>
        <AuthTitle>Зареєструватись</AuthTitle>
        <AuthForm>
          <AuthFieldGroup>
            <AuthLabel>Пошта</AuthLabel>
            <AuthInput type="email" placeholder="Enter your email" required />
          </AuthFieldGroup>
          <AuthFieldGroup>
            <AuthLabel>Пароль</AuthLabel>
            <AuthInput type="password" placeholder="Enter your password" required />
          </AuthFieldGroup>
          <AuthFieldGroup>
            <AuthLabel>Підтвердити пароль</AuthLabel>
            <AuthInput type="password" placeholder="Confirm password" required />
          </AuthFieldGroup>
          <AuthSubmitButton type="submit">Зареєструватись</AuthSubmitButton>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Register;