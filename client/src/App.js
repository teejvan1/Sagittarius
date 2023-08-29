import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../src/pages/Home.js'
import Books from '../src/pages/Books.js'
import Compability from '../src/pages/Compability.js'
import ChatRoom from '../src/pages/ChatRoom.js'
import Chat from '../src/components/Chat.js'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}></Route>
          <Route path='/books' exact Component={Books}></Route>
          <Route path='/compatibility' exact Component={Compability}></Route>
          <Route path='/chatroom' exact element={<ChatRoom />}></Route>
          <Route path='/chat' exact element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
