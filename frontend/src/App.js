import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Sample from './screens/AdminSide/Sample.jsx';

const LandingPage = lazy(() => import('./screens/UserSide/LandingPage/LandingPage'))
const MyNotes = lazy(() => import('./screens/UserSide/MyNotes/MyNotes.jsx'))
const LoginScreen = lazy(() => import('./screens/UserSide/LoginScreen/LoginScreen.jsx'))
const RegisterScreen = lazy(() => import('./screens/UserSide/RegisterScreen/RegisterScreen.jsx'))
const CreateNote = lazy(() => import('./screens/UserSide/CreateNote/CreateNote.jsx'))
const SingleScreen = lazy(() => import('./screens/UserSide/SingleScreen/SingleScreen.jsx'))
const ErrorPage = lazy(() => import('./screens/UserSide/ErrorPage/ErrorPage.jsx'));
const ProProfile = lazy(() => import('./screens/UserSide/ProfileScreen/ProProfile.jsx'));
const SetPassword = lazy(() => import('./screens/UserSide/ProfileScreen/SetPassword.jsx'));
const SetPic = lazy(() => import('./screens/UserSide/ProfileScreen/SetPic.jsx'));
const SetDetail = lazy(() => import('./screens/UserSide/ProfileScreen/SetDetail.jsx'));
const UserList = lazy(() => import('./screens/AdminSide/UserList/UserList.jsx'));
const AdminLoginScreen = lazy(() => import('./screens/AdminSide/LoginScreen/AdminLoginScreen.jsx'));
const EditUserDetails = lazy(() => import('./screens/AdminSide/EditUser/EditUserDetails.jsx'));
const AddUser = lazy(() => import('./screens/AdminSide/AddUser/AddUser.jsx'));

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Suspense fallback={<span class="loader"></span>}><LandingPage /></Suspense>} exact />
          <Route path='/login' element={<Suspense fallback={<span class="loader"></span>}><LoginScreen /></Suspense>} />
          <Route path='/profile' element={<Suspense fallback={<span class="loader"></span>}><ProProfile /></Suspense>} />
          <Route path='new-password' element={<Suspense fallback={<span class="loader"></span>}><SetPassword /></Suspense>} />
          <Route path='update-image' element={<Suspense fallback={<span class="loader"></span>}><SetPic /></Suspense>} />
          <Route path='update-name-email' element={<Suspense fallback={<span class="loader"></span>}><SetDetail /></Suspense>} />
          <Route path='/register' element={<Suspense fallback={<span class="loader"></span>}><RegisterScreen /></Suspense>} />
          <Route path='/createnote' element={<Suspense fallback={<span class="loader"></span>}><CreateNote /></Suspense>} />
          <Route path='/note/:id' element={<Suspense fallback={<span class="loader"></span>}><SingleScreen /></Suspense>} />
          <Route path='/mynotes' element={<Suspense fallback={<span class="loader"></span>}><MyNotes /></Suspense>} />
          {/* admin */}
          <Route path='admin-login' element={<Suspense fallback={<span class="loader"></span>}><AdminLoginScreen /></Suspense>} />
          <Route path='get-list' element={<Suspense fallback={<span class="loader"></span>}><UserList /></Suspense>} />
          <Route path='edit-user/:id' element={<Suspense fallback={<span class="loader"></span>}><EditUserDetails /></Suspense>} />
          <Route path='add-user' element={<Suspense fallback={<span class="loader"></span>}><AddUser /></Suspense>} />
          <Route path='sample' element={<Suspense fallback={<span class="loader"></span>}><Sample /></Suspense>} />


          <Route path='/*' element={<Suspense fallback={<span class="loader"></span>}><ErrorPage /></Suspense>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
