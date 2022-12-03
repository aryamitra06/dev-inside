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

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/hi" element={<Welcome />} />
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
