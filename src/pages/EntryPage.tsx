import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
		IonList,
		IonItem,
    IonButtons,
    IonBackButton
  } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { entries } from '../data';
  
  const EntryPage: React.FC = () => {

    type Params = {
      id:string
    }

    const { id } = useParams<Params>()

    const entry = entries.find((entry) => entry.id === id) 

    return (
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton /> 
              {/* doesn`t work */}
            </IonButtons>
            <IonTitle>{entry.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
					<IonList>
						<IonItem>{entry.description}</IonItem>
					</IonList>
        </IonContent>
      </IonApp>
    );
  };
  
  export default EntryPage;
  