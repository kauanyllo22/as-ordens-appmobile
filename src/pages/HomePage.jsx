
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText
} from '@ionic/react';

import {
  addCircleOutline,
  clipboardOutline,
  logOutOutline,
  checkmarkCircleOutline,
  timeOutline
} from 'ionicons/icons';

import './HomePage.css';

const HomePage = () => {
  const nomeUsuario = 'Usuário';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="topo-home">
          <IonTitle>ÀS ORDENS</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-content">
        <div className="home-container">

          <div className="saudacao">
            <IonText>
              <h2>Olá, {nomeUsuario}!</h2>
              <p>Bem-vindo ao sistema de chamados.</p>
            </IonText>
          </div>

          <div className="resumo-chamados">

            <IonCard className="card-resumo">
              <IonCardContent>
                <IonIcon icon={timeOutline} />
                <h3>0</h3>
                <p>Chamados abertos</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="card-resumo">
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} />
                <h3>0</h3>
                <p>Concluídos</p>
              </IonCardContent>
            </IonCard>

          </div>

          <div className="acoes-home">

            <IonButton
              expand="block"
              className="botao-abrir"
              routerLink="/abrir-chamado"
            >
              <IonIcon icon={addCircleOutline} slot="start" />
              Abrir chamados
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              className="botao-ver"
              routerLink="/meus-chamados"
            >
              <IonIcon icon={clipboardOutline} slot="start" />
              Ver chamados
            </IonButton>

          </div>

          <div className="aviso-home">
            <p>
              Acompanhe seus chamados e fique por dentro
              das atualizações do sistema.
            </p>
          </div>

          <IonButton
            fill="clear"
            className="botao-sair"
            routerLink="/login"
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Sair da conta
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
