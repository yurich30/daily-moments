import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton
  } from '@ionic/react';
  import React from 'react';
  import { auth } from '../firebase'
  
  const SettingPage: React.FC = () => {
    return (
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton 
            expand='block'
            color='medium'
            onClick={() => auth.signOut()}
          >
            Logout
          </IonButton>
        </IonContent>
      </IonApp>
    );
  };
  
  export default SettingPage;
  