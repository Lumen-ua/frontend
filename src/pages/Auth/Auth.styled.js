import styled from 'styled-components';

export const AuthPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--container-padding);
  background-color: var(--app-bg); /* [cite: 394, 405] */
`;

export const AuthLogoImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 32px; /* [cite: 191] */
`;

export const AuthFormContainer = styled.section`
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  text-align: center; /* [cite: 307, 312] */
`;

export const AuthTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--color-text); /* [cite: 395, 412] */
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`;

export const AuthFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AuthLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
`;

export const AuthInput = styled.input`
  width: 100%;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-1);
  padding: 12px;
  font-size: 14px;
  transition: var(--transition-fast);

  &:focus {
    border-color: var(--color-accent); /* [cite: 19] */
  }
`;

export const AuthSubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: var(--color-accent);
  color: var(--color-text);
  font-size: 16px;
  font-weight: 700;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-1);
  box-shadow: var(--shadow-1);
  cursor: pointer; /* [cite: 509] */

  &:hover {
    background-color: var(--color-accent-strong);
    transform: translateY(-2px); /* [cite: 19] */
  }

  &:active {
    box-shadow: var(--shadow-press);
    transform: translateY(2px);
  }
`;