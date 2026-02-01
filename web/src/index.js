import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))

/**
  O Strict Mode é uma ferramenta para destacar problemas na aplicação durante
  o modo de desenvolvimento a partir da ativação de checagens e avisos em seus
  descendentes. Além disso, ele age na DOM como um fragmento, ou seja, não
  renderiza nada na tela.
 
  O React 18 introduziu uma checagem apenas em modo de desenvolvimento no
  Strict Mode que automaticamente simula a desmontagem e remontagem dos
  componentes uma vez quando eles são renderizados pela primeira vez,
  restaurando o estado anterior na segunda montagem. Isso garante que o
  componente seja resiliente ao desmontar e remontar, enquanto mantém as
  informações.
 
  O Strict Mode é incompatível com o React Router <= 5.3.1, por isso deve-se
  utilizar o React Router >= 5.3.2. Isso acontece pois:
 
  "Router in v5 was not compatible with this primarily because the main history subscription was created in the component constructor"
 */

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
