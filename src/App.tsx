import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import {
  IonReactRouter,
} from '@ionic/react-router'
import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { AuthContext  } from './auth'
import MyApp from './MyApp'
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

firebase.initializeApp({
  apiKey: "AIzaSyAMLKbxVYpE0h6Xz8z49beAZhiyjv8FdUE",
  authDomain: "daily-moments-d4917.firebaseapp.com",
  projectId: "daily-moments-d4917",
  storageBucket: "daily-moments-d4917.appspot.com",
  messagingSenderId: "319408579531",
  appId: "1:319408579531:web:efff6210e42b5407488c4e",
  measurementId: "G-BMEFKL985H"
});
firebase.analytics();

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage  
                setLoggedIn={() => setLoggedIn(true)}
              />
            </Route>
            <Route  path='/my'>
              <MyApp />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
