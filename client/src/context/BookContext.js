import { createContext, useReducer } from 'react'

export const BooksContext = createContext()

export const BooksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOK':
      return {
        books: action.payload,
      }
    case 'CREATE_BOOK':
      return {
        books: [...state.books, action.payload],
      }
    default:
      return state
  }
}

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BooksReducer, {
    books: null,
  })

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  )
}
