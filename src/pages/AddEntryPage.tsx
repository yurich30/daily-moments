import {firestore, storage} from '../firebase'
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';
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
    IonDatetime,
    IonGrid,
    IonRow,
    isPlatform,
  } from '@ionic/react';
import {CameraResultType, Plugins} from '@capacitor/core'
const {Camera} = Plugins 
  
  const AddEntryPage: React.FC = () => {

    const {userId} = useAuth()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [photoURL, setPhotoURL] = useState('/assets/placeholder.png')
    const imageInputRef = useRef()

    useEffect(() => () => {
      if(photoURL.startsWith('blob:')){
        URL.revokeObjectURL(photoURL)
      }
    }, [photoURL])

    const savePicture = async (blobURL, userId) => {
      const pictureRef = storage.ref(`users/${userId}/pictures/${Date.now()}`) 
      const response = await fetch(blobURL)
      const blob= await response.blob()
      const snapshot = await pictureRef.put(blob)
      const url = await snapshot.ref.getDownloadURL()
      return url
    }

    const handleSave = async () => {
      const entireRef = firestore.collection('users').doc(userId).collection('entries')
      const entryData = {title, photoURL, date, description}
      if(!photoURL.startsWith('/assets')){
        entryData.photoURL = await savePicture(photoURL, userId)
      }
      const entryRef = await entireRef.add(entryData) 
      history.goBack()
    }

    const handleFileChange = (event) => {
      if(event.target.files.length > 0){
        const file = event.target.files.item(0)
        const pictureURL = URL.createObjectURL(file)
        setPhotoURL(pictureURL)
      }
    }

    const handlePictureClick = async () => {
      // if(isPlatform('capacitor')){
      //   const photo = await  Camera.getPhoto({
      //     resultType: CameraResultType.Uri,
      //   })
      //   setPhotoURL(photo.webPath)
      // } else {
      //   //@ts-ignore
      //   imageInputRef.current.click()
      // }
      const photo = await  Camera.getPhoto({
        resultType: CameraResultType.Uri,
      })
      setPhotoURL(photo.webPath)
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
            <IonItem>
              <IonGrid>
                <IonRow>
                  <input type='file' accept='' hidden onChange={handleFileChange} ref={imageInputRef}/>
                </IonRow>
                <IonRow>
                  <img 
                    src={photoURL} 
                    //@ts-ignore
                    onClick={() => handlePictureClick()}
                  />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonList>
          <IonButton expand='block' onClick={handleSave}>Save</IonButton>
        </IonContent>
      </IonApp>
    );
  };
  
  export default AddEntryPage;
  