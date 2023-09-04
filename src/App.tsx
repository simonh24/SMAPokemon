import './App.css'
import { PokemonCard } from './pages/Pokemon'
import { Pokedex } from './pages/Pokedex'
import { PokemonSearch } from './pages/PokemonSearch'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ResponsiveAppBar />
        <Switch>
          <Route path="/pokedex">
            <Pokedex />
          </Route>
          <Route exact path="/search">
            <PokemonSearch />
          </Route>
          <Route exact path="/pokemon/:id">
            <PokemonCard />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
