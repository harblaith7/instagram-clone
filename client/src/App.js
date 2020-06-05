import React from 'react';
import './App.scss';
import {Provider} from "react-redux"
import store from "./redux/store"
import SignUpForm from "./components/SignUpForm/SignUpForm"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SignUpForm/>
      </div>
    </Provider>

  );
}

export default App;
