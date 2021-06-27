import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
		IonButton,
    IonButtons,
    IonBackButton
  } from '@ionic/react';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';


interface Props { 
  setLoggedIn: () => void
}
  
  const LoginPage: React.FC<Props> = ({ setLoggedIn }) => {

    const {loggedIn} = useAuth()

    if(loggedIn){
      return <Redirect to='/my/entries'/>
    }
    return (
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
					<IonButton onClick={setLoggedIn} expand='block'>Login</IonButton>
        </IonContent>
      </IonApp>
    );
  };
  
  export default LoginPage;
  