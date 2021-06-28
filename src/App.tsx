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
import { AuthContext, useAuthInit  } from './auth'
import { auth } from './firebase'
import MyApp from './MyApp'
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';



const App: React.FC = () => {

  const {loading, auth} = useAuthInit()

  if(loading){
    return <IonLoading isOpen/>
  }
  return (
    <IonApp>
      <AuthContext.Provider value={ auth }>
        <IonReactRouter>
          <Switch>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route exact path='/register'>
              <RegisterPage />
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
