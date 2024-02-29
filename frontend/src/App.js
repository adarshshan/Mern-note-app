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

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/createnote' element={<CreateNote />} />
          <Route path='/note/:id' element={<SingleScreen />} />
          <Route path='/mynotes' element={<MyNotes search={search} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
