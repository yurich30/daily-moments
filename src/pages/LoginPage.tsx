import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
		IonButton,
    IonList,
    IonItem,
    IonInput,
    IonLabel
  } from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { PassThrough } from 'stream';
import { useAuth } from '../auth';
import { auth } from '../firebase'


interface Props { 
  setLoggedIn: () => void
}
  
  
  const LoginPage: React.FC<Props> = ({ setLoggedIn }) => {

    const {loggedIn} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
      const credential = await auth.signInWithEmailAndPassword(email, password)
      console.log(credential);
      setLoggedIn()
    }

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
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>Email</IonLabel>
              <IonInput type='email' value={email} onIonChange={(e) => setEmail(e.detail.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Email</IonLabel>
              <IonInput type='password' value={password} onIonChange={(e) => setPassword(e.detail.value)}/>
            </IonItem>
          </IonList>
					<IonButton onClick={handleLogin} expand='block'>Login</IonButton>
        </IonContent>
      </IonApp>
    );
  };
  
  export default LoginPage;
  