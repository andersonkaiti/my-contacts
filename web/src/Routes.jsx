import { Route, Switch } from 'react-router-dom'
import { Container as EditContact } from './pages/EditContact'
import { Home } from './pages/Home'
import { NewContact } from './pages/NewContact'

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  )
}
