import React, { useEffect } from 'react';
import './App.scss';
import {BrowserRouter, Route , Switch} from "react-router-dom"
import LandingPage from './pages/LandingPage/LandingPage';
import LogInPage from "./pages/LogInPage/LogInPage"
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import Test from "./components/Dashboard/Dashboard"
import {Provider, connect} from "react-redux"
import store from "./redux/store"
import setAuthToken from "./redux/utils/setAuthToken";
import { loadUser } from './redux/actions/auth';
import PrivateRoute from "./components/Routing/PrivateRoute/PrivateRoute"


if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

   useEffect(() => {
     store.dispatch(loadUser())
   }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" exact strict component={LogInPage} />
            <Route path="/signup" exact strict component={SignUpPage}/>
            <PrivateRoute path="/dashboard" exact strict component={Test} />
            <Route path="/" strict exact component={LandingPage}/>
            
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
