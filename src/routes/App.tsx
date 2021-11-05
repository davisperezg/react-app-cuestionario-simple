import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import NotFound from '../containers/NotFound'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default App
