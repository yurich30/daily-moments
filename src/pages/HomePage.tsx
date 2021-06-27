import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
		IonList,
		IonItem
  } from '@ionic/react';
import React from 'react';
import { entries } from '../data';
  
  const HomePage: React.FC = () => {
    return (
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
					<IonList>
						{entries.map((entry) => <IonItem 
							button 
							key={entry.id}
							routerLink={`/my/entries/${entry.id}`}
						>
							{entry.title}
						</IonItem>)}
					</IonList>
        </IonContent>
      </IonApp>
    );
  };
  
  export default HomePage;
  