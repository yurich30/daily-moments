import {
    IonPage,
    IonContent,
  } from '@ionic/react';
  import React from 'react';
  
  const NotFoundPage: React.FC = () => {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          Page didn`t found
        </IonContent>
      </IonPage>
    );
  };
  
  export default NotFoundPage;
  