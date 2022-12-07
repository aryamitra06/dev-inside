import React from 'react';
import './App.css';
import Nav from './components/Nav';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';

import { Provider } from "react-redux";
import store from './store';
import Dashboard from './pages/Dashboard';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard/create-profile" element={<CreateProfile />} />
          <Route exact path="/dashboard/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
