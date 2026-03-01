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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Введіть пошту");
    if (!password) return setError("Введіть пароль");

    try {
      setLoading(true);
      await login({ email: email.trim(), password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Невірна пошта або пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageWrapper>
      <AuthLogoImage src={lumenLogo} alt="LUMEN Logo" />

      <AuthFormContainer>
        <AuthTitle>Увійти в обліковий запис</AuthTitle>

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

          {error && (
            <div style={{ marginTop: 10, color: "crimson", fontSize: 14 }}>
              {error}
            </div>
          )}

          <AuthSubmitButton type="submit" disabled={loading}>
            {loading ? "Зачекайте..." : "Увійти"}
          </AuthSubmitButton>

          {/* ✅ НОВЕ: кнопка/лінк на реєстрацію */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Зареєструватись
          </button>

          <div style={{ marginTop: 12, fontSize: 13, opacity: 0.75, textAlign: "center" }}>
            Немає акаунта? Натисни “Зареєструватись”
          </div>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Login;