import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes.jsx';
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx';
import CreateNote from './screens/CreateNote/CreateNote.jsx';
import SingleScreen from './screens/SingleScreen/SingleScreen.jsx';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.jsx';
import ErrorPage from './screens/ErrorPage/ErrorPage.jsx';
import ProProfile from './screens/ProfileScreen/ProProfile.jsx';
import SetPassword from './screens/ProfileScreen/SetPassword.jsx';
import SetPic from './screens/ProfileScreen/SetPic.jsx';
import SetDetail from './screens/ProfileScreen/SetDetail.jsx';

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/login' element={<LoginScreen />} />
          {/* <Route path='/profile' element={<ProfileScreen />} /> */}
          <Route path='/profile' element={<ProProfile />} />
          <Route path='new-password' element={<SetPassword />} />
          <Route path='update-image' element={<SetPic />} />
          <Route path='update-name-email' element={<SetDetail />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/createnote' element={<CreateNote />} />
          <Route path='/note/:id' element={<SingleScreen />} />
          <Route path='/mynotes' element={<MyNotes search={search} />} />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
