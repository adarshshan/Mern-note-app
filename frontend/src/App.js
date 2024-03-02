import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './screens/UserSide/LandingPage/LandingPage';
import MyNotes from './screens/UserSide/MyNotes/MyNotes.jsx';
import LoginScreen from './screens/UserSide/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/UserSide/RegisterScreen/RegisterScreen.jsx';
import CreateNote from './screens/UserSide/CreateNote/CreateNote.jsx';
import SingleScreen from './screens/UserSide/SingleScreen/SingleScreen.jsx';
import { useState } from 'react';
import ErrorPage from './screens/UserSide/ErrorPage/ErrorPage.jsx';
import ProProfile from './screens/UserSide/ProfileScreen/ProProfile.jsx';
import SetPassword from './screens/UserSide/ProfileScreen/SetPassword.jsx';
import SetPic from './screens/UserSide/ProfileScreen/SetPic.jsx';
import SetDetail from './screens/UserSide/ProfileScreen/SetDetail.jsx';
import UserList from './screens/AdminSide/UserList/UserList.jsx';
import AdminLoginScreen from './screens/AdminSide/LoginScreen/AdminLoginScreen.jsx';
import EditUserDetails from './screens/AdminSide/EditUser/EditUserDetails.jsx';

function App() {
  return (
    <>
      {/* <Header setSearch={setSearch} /> */}
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/profile' element={<ProProfile />} />
          <Route path='new-password' element={<SetPassword />} />
          <Route path='update-image' element={<SetPic />} />
          <Route path='update-name-email' element={<SetDetail />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/createnote' element={<CreateNote />} />
          <Route path='/note/:id' element={<SingleScreen />} />
          <Route path='/mynotes' element={<MyNotes />} />
          {/* admin */}
          <Route path='admin-login' element={<AdminLoginScreen />} />
          <Route path='get-list' element={<UserList />} />
          <Route path='edit-user/:id' element={<EditUserDetails />} />


          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
