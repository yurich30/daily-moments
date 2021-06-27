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
