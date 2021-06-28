import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
} from '@ionic/react';
import {
  IonReactRouter,
} from '@ionic/react-router'
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { AuthContext  } from './auth'
import { auth } from './firebase'
import MyApp from './MyApp'
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';



const App: React.FC = () => {

  useEffect(() => {
    auth.onAuthStateChanged((user) => setAuthState({loading: false,loggedIn: Boolean(user)}))
  }, [])

  const [authSate, setAuthState] = useState({loading: true, loggedIn: false})

  if(authSate.loading){
    return <IonLoading isOpen/>
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authSate.loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route  path='/my'>
              <MyApp />
            </Route>
            <Redirect from='' to='/login'/>
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
