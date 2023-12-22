import { useEffect, createContext, useReducer, useContext } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import Home from '../src/pages/Home.js'
import Books from '../src/pages/Books.js'
import Compability from '../src/pages/Compability.js'
import LogIn from '../src/pages/LogIn.js'
import SignUp from '../src/pages/SignUp.js'
import Profile from '../src/pages/Profile.js'
import UserProfile from '../src/pages/UserProfile.js'
import MakeFriends from '../src/pages/MakeFriends.js'
import Mbti from '../src/pages/Mbti.js'
import Messenger from '../src/pages/Messenger.js'

import { reducer, initialState } from './reducers/userReducer'
export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'USER', payload: user })
    }
  }, [])
  return (
    <Routes>
      <Route path='/' exact Component={Home}></Route>
      <Route path='/books' exact Component={Books}></Route>
      <Route path='/compatibility' exact Component={Compability}></Route>
      <Route path='/login' exact element={<LogIn />}></Route>
      <Route path='/signup' exact element={<SignUp />}></Route>
      <Route path='/profile' exact element={<Profile />}></Route>
      <Route path='/profile/:userid' exact element={<UserProfile />}></Route>
      <Route path='/makefriends' exact element={<MakeFriends />}></Route>
      <Route path='/mbti' exact element={<Mbti />}></Route>
      <Route path='/chats' exact element={<Messenger />}></Route>
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className='App'>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
