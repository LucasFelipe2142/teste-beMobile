import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import TabelaFuncionarios from './components/table.tsx'
import GlobalStyle from './components/globalStyles.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <TabelaFuncionarios />
  </React.StrictMode>,
)
