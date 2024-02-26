import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes.jsx';
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/mynotes' element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
