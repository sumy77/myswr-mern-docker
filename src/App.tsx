import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import PokemonDetail from './components/Pokemons/PokemonDetail';
import PokemonList from './components/Pokemons/PokemonList';
import { Container } from 'react-bootstrap';
import TodosList from './components/Todos/TodosList';
import NoteList from './components/Notes/NoteList';
import { useContext, useState } from 'react';
import { ThemeContext } from './components/context/theme/theme';
import Switch from "react-switch";
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [theme, setTheme] = useState(useContext(ThemeContext));
  const [checked, setChecked] = useState(false);
  function handleChange(check: boolean) {
    setChecked(!checked);
    if(check) {
      setTheme('dark');
    }else{
      setTheme('light');
    }
  }
  return (
    <ThemeContext.Provider value={theme}>
    <div className={`App ${theme}`}>
      <Switch onChange={handleChange} checked={checked} uncheckedIcon={<FaMoon/>} checkedIcon={<FaSun />} />
      <Container>
        <Routes>
          <Route index element={<PokemonList />} />
          <Route path="/todos" element={<TodosList />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/:name" element={<PokemonDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </Container>
    </div>
    </ThemeContext.Provider>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App
