import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Join from './pages/Join';
import Login from './pages/Login';
import Main from './pages/Main';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/userReducer';

function App() {
  const dispatch = useDispatch()
  const {isLoading, currentUser} = useSelector((state) => state.user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if(!!user) {
        dispatch(setUser(user))
      }else {
        dispatch(clearUser())
      }
    })
    return () =>unsubscribe()
  }, [dispatch])
  return (
    <Routes>
      <Route path="/" element={currentUser ?<Main/> : <Navigate to="/login" /> } />
      <Route path="/join" element={currentUser ?<Navigate to="/" /> : <Join/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}

export default App;
