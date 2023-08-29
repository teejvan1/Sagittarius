import { createContext, useReducer } from 'react'

export const ContentsContext = createContext()

export const ContentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        contents: action.payload,
      }
    case 'CREATE_CONTENT':
      return {
        contents: [...state.contents, action.payload],
      }
    default:
      return state
  }
}

export const ContentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContentsReducer, {
    contents: null,
  })

  return (
    <ContentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContentsContext.Provider>
  )
}
