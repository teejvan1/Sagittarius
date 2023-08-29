import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContentsContextProvider } from './context/ContentContext'
import { BooksContextProvider } from './context/BookContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BooksContextProvider>
    <ContentsContextProvider>
      <App />
    </ContentsContextProvider>
  </BooksContextProvider>
)
