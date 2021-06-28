import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
		IonList,
		IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel
  } from '@ionic/react';
import {add as addIcon} from 'ionicons/icons'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { formatDate } from '../utils';
  
  const HomePage: React.FC = () => {

    const [entries, setEntries] = useState([])
    const {userId} = useAuth()

    useEffect(() => {
      const entriesRef = firestore.collection('users').doc(userId).collection('entries')
      entriesRef.orderBy('date', 'desc')
        .onSnapshot(
        (response) => {
          const entries = response.docs.map((response) => ({
            id: response.id,
            ...response.data()  
          }))
          setEntries(entries)
        }
      )
    }, [userId])

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
							routerLink={`/my/entries/view/${entry.id}`}
						>
							<IonLabel>
                <h2>{entry.title}</h2>
							  <h3>{formatDate(entry.date)}</h3>
              </IonLabel>
						</IonItem>)}
					</IonList>
          <IonFab horizontal='end' vertical='bottom'>
            <IonFabButton routerLink='/my/entries/add'>
              <IonIcon icon={addIcon} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonApp>
    );
  };
  
  export default HomePage;
  