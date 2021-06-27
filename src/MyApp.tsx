import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon
} from '@ionic/react';
import {
  IonReactRouter,
} from '@ionic/react-router'
import {home, settings} from 'ionicons/icons'
import React from 'react';
import { Route, Redirect } from 'react-router';
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import EntryPage from './pages/EntryPage'
import { useAuth } from './auth';

const MyApp: React.FC = () => {
  const {loggedIn} = useAuth()
  if(loggedIn){
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/my/entries'>
              <HomePage />
            </Route>
            <Route exact path='/my/settings'>
              <SettingPage />
            </Route>
            <Route exact path='/my/entries/:id'>
              <EntryPage />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='home' href='/my/entries'>
              <IonIcon icon={home}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab='setting' href='/my/setting'>
              <IonIcon icon={settings}/>
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  } else return <Redirect to='/login'/>
};

export default MyApp;
