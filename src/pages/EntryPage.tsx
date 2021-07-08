import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
		IonList,
		IonItem,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonButton
  } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, Params } from '../types';
import {trash as trashIcon} from 'ionicons/icons'
import { formatDate } from '../utils';
  
  const EntryPage: React.FC = () => {

    const { id } = useParams<Params>()
    const { userId } = useAuth()
    const [entry, setEntry] = useState<Entry>()
    const history = useHistory()

    useEffect(() => {
      const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id)
      entryRef.get().then((doc) => {
        const entry = {id: doc.id, ...doc.data()} as Entry
        setEntry(entry)
      })
    }, [id])

    const handleDelete = () => {
      const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id)
      entryRef.delete()
      history.goBack()
    }

    return (
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton /> 
              {/* doesn`t work */}
            </IonButtons>
            <IonTitle>{formatDate(entry?.date)}</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={handleDelete}>
                <IonIcon slot='icon-only' icon={trashIcon}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
					<IonList>
						<IonItem>{entry?.title}</IonItem>
            <img src={entry?.photoURL} />
						<IonItem>{entry?.description}</IonItem>
					</IonList>
        </IonContent>
      </IonApp>
    );
  };
  
  export default EntryPage;
  