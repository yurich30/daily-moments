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
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonDatetime
  } from '@ionic/react';
import {firestore} from '../firebase'
import React, { useState } from 'react';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';
  
  const AddEntryPage: React.FC = () => {

    const {userId} = useAuth()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = async () => {
      const entireRef = firestore.collection('users').doc(userId).collection('entries')
      const entryData = {title, date, description}
      const entryRef = await entireRef.add(entryData)
      setTitle('')
      setDescription('')
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
            <IonTitle>Add entry</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonList>
            <IonItem>
              <IonLabel position='stacked'>Title</IonLabel>
              <IonInput type='text' value={title} onIonChange={(e) => setTitle(e.detail.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Date</IonLabel>
              <IonDatetime value={date} onIonChange={(e) => setDate(e.detail.value)}/>
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Description</IonLabel>
              <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value)}/>
            </IonItem>
          </IonList>
          <IonButton expand='block' onClick={handleSave}>Save</IonButton>
        </IonContent>
      </IonApp>
    );
  };
  
  export default AddEntryPage;
  