import { Route, Routes } from 'react-router-dom'
import { EditContact } from './pages/EditContact'
import { Home } from './pages/Home'
import { NewContact } from './pages/NewContact'

/**
  A prop 'component' foi substituída pela prop 'element' e o 'exact' foi removido.
  Além disso, caso o componente seja uma função, ele deve ser chamado como
  uma tag JSX <Component /> e não como uma função Component.

  Com a prop 'component', a função era executada como um componente:
  <props.component />

  Com a prop 'element', ele é renderizado:
  {props.element}

  Por isso que: "Functions are not valid as a React child".

  A prop 'element' foi introduzida para padronizar a forma como os componentes
  são renderizados, que era feita com a prop 'component' ou 'render', que
  injetavam algumas props para o componente, como params, history, etc.,
  mas se tornou desnecessário, pois tudo pode ser obtido a partir de hooks.
 */

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  )
}
