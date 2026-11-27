import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bootstrap.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Logout from './pages/logout.jsx';
import Register from './pages/register.jsx';
import Homepage from './pages/homepage.jsx';
import CreateNewPost from './pages/create-new-post.jsx';
import UserProfile from './pages/user-profile.jsx';
import NoAuth from './components/NoAuth.jsx';
import Auth from './components/Auth.jsx';
import Navbar from './components/navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* <Route element={<NoAuth />}> */}
          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        {/* </Route> */}

        {/* <Route element={<Auth />}> */}
          <Route element={<Navbar />} >
            <Route path={'/homepage'} element={<Homepage />} />
            <Route path={'/profile/:username'} element={<UserProfile />} />
            <Route path={'/create-post'} element={<CreateNewPost />} />
          </Route>

          <Route path={'/logout'} element={<Logout/>}/>
        {/* </Route> */}

        <Route path={'/notFound'} />
        <Route path={'/forbidden'} />
      </Routes>
    </Router>
  </StrictMode>,
)