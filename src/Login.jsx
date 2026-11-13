
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner
} from '@ionic/react';

import {
  arrowForward,
  compassOutline
} from 'ionicons/icons';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      alert('Preencha o email e a senha!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <IonPage>
      <IonContent className="login-content">
        <div className="login-container">

          {/* Logo do aplicativo */}
          <div className="login-brand">

            <div className="compass-container">
              <IonIcon
                icon={compassOutline}
                className="brand-compass"
              />
            </div>

            <h1 className="brand-title">
              ÀS ORDENS
            </h1>

            <div className="brand-subtitle">
              <span className="brand-line"></span>
              <span>SISTEMA DE CHAMADOS</span>
              <span className="brand-line"></span>
            </div>

          </div>

          {/* Caixa de Login */}
          <div className="login-card">

            <span className="welcome-tag">
              BEM-VINDO DE VOLTA
            </span>

            <h2 className="card-title">
              Acesse sua conta
            </h2>

            <p className="card-description">
              Entre para acompanhar e gerenciar seus chamados.
            </p>

            <form
              onSubmit={handleLogin}
              className="login-form"
            >

              {/* Email */}
              <div className="input-group">
                <IonInput
                  type="email"
                  placeholder="Digite seu e-mail"
                  autocomplete="email"
                  value={email}
                  onIonInput={(e) =>
                    setEmail(e.detail.value ?? '')
                  }
                  required
                  className="custom-input"
                />
              </div>

              {/* Senha */}
              <div className="input-group">
                <IonInput
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onIonInput={(e) =>
                    setSenha(e.detail.value ?? '')
                  }
                  required
                  className="custom-input"
                />
              </div>

              {/* Entrar */}
              <IonButton
                type="submit"
                expand="block"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    ENTRAR
                    <IonIcon
                      slot="end"
                      icon={arrowForward}
                    />
                  </>
                )}
              </IonButton>

            </form>

            <div className="card-footer">
              <IonText>
                <small>
                  ÀS ORDENS • SISTEMA DE CHAMADOS
                </small>
              </IonText>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
