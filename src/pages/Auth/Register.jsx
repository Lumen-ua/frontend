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

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) return setError("Введіть ім’я");
    if (!trimmedEmail) return setError("Введіть пошту");
    if (!isValidEmail(trimmedEmail)) return setError("Невірний формат пошти");
    if (password.length < 8) return setError("Пароль має бути мінімум 8 символів");
    if (password !== confirm) return setError("Паролі не співпадають");

    try {
      setLoading(true);
      await register({ name: trimmedName, email: trimmedEmail, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Помилка реєстрації");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageWrapper>
      <AuthLogoImage src={lumenLogo} alt="LUMEN Logo" />

      <AuthFormContainer>
        <AuthTitle>Зареєструватись</AuthTitle>

        <AuthForm onSubmit={handleSubmit}>
          <AuthFieldGroup>
            <AuthLabel>Ім’я</AuthLabel>
            <AuthInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </AuthFieldGroup>

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

          <AuthFieldGroup>
            <AuthLabel>Підтвердити пароль</AuthLabel>
            <AuthInput
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </AuthFieldGroup>

          {error && (
            <div style={{ marginTop: 10, color: "crimson", fontSize: 14, whiteSpace: "pre-wrap" }}>
              {error}
            </div>
          )}

          <AuthSubmitButton type="submit" disabled={loading}>
            {loading ? "Зачекайте..." : "Зареєструватись"}
          </AuthSubmitButton>

          {/* ✅ НОВЕ: назад на логін */}
          <button
            type="button"
            onClick={() => navigate("/login")}
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
            Вже є акаунт? Увійти
          </button>
        </AuthForm>
      </AuthFormContainer>
    </AuthPageWrapper>
  );
};

export default Register;