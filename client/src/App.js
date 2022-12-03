import React from 'react';
import './App.css';
import Nav from './components/Nav';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Welcome from "./pages/Welcome"
import Signup from './pages/Signup';
import Login from './pages/Login';

import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/hi" element={<Welcome />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
