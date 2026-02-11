import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lumenLogo from "../../assets/images/lumen-logo.webp";
import { useAuth } from "../../context/AuthContext.jsx";

import {
  AuthPageWrapper,
  AuthLogoImage,
  AuthFormContainer,
  AuthTitle,
  AuthForm,
  AuthFieldGroup,
  AuthLabel,
  AuthInput,
  AuthSubmitButton,
} from "./Auth.styled";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Введіть пошту");
    if (!password) return setError("Введіть пароль");

    try {
      setLoading(true);
      await login({ email, password });
      navigate("/", { replace: true });
    } catch (e) {
      setError(e.message || "Невірна пошта або пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageWrapper>
      <AuthLogoImage src={lumenLogo} alt="LUMEN Logo" />
      <AuthFormContainer>
        <AuthTitle>Увійти в обліковий запис</AuthTitle>

        <AuthForm onSubmit={onSubmit}>
          <AuthFieldGroup>
            <AuthLabel>Пошта</AuthLabel>
            <AuthInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </AuthFieldGroup>

          <AuthFieldGroup>
            <AuthLabel>Пароль</AuthLabel>
            <AuthInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </AuthFieldGroup>

          {error && (
            <div style={{ marginTop: 10, color: "crimson", fontSize: 14 }}>
              {error}
            </div>
          )}

          <AuthSubmitButton type="submit" disabled={loading}>
            {loading ? "Зачекайте..." : "Увійти"}
          </AuthSubmitButton>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Login;