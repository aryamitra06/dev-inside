import React from 'react';
import './App.css';
import Nav from './components/Navbar/Nav';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';

import { Provider } from "react-redux";
import store from './store';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateProfile from './pages/Profile/CreateProfile';
import EditProfile from './pages/Profile/EditProfile';
import AddExp from './pages/Profile/AddExp';
import AddEdu from './pages/Profile/AddEdu';
import ViewPublicProfile from './pages/Profile/ViewPublicProfile';
import HomePage from './pages/HomePage/HomePage';
import PostById from './pages/Post/PostById';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/post/:userid/:postid" element={<PostById />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard/create-profile" element={<CreateProfile />} />
          <Route exact path="/dashboard/edit-profile" element={<EditProfile />} />
          <Route exact path="/dashboard/add-experience" element={<AddExp />} />
          <Route exact path="/dashboard/add-education" element={<AddEdu />} />
          <Route exact path="/profile/:id" element={<ViewPublicProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
