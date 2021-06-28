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
    IonLabel,
    IonText,
    IonLoading
  } from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase'

  const LoginPage: React.FC = () => {

    const {loggedIn} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status ,setStatus] = useState({loading: false, error: false})

    const handleLogin = async () => {
      try {
        setStatus({loading: true, error: false})
        const credential = await auth.signInWithEmailAndPassword(email, password)
        setStatus({loading: false, error: false})
        console.log(credential);
      } catch (error) {
        console.log(error.message);
        setStatus({loading: false, error: true})
      }
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
          <IonLoading isOpen={status.loading}/>
          {status.error && <IonText color='danger'>Invalid credentials</IonText>}
					<IonButton onClick={handleLogin} expand='block'>Login</IonButton>
        </IonContent>
      </IonApp>
    );
  };
  
  export default LoginPage;
  