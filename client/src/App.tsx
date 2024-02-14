import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import PokemonDetail from './components/Pokemons/PokemonDetail';
import PokemonList from './components/Pokemons/PokemonList';
import { Container } from 'react-bootstrap';
import TodosList from './components/Todos/TodosList';
import NoteList from './components/Notes/NoteList';
import { useState } from 'react';
import { useTheme } from './components/context/theme/theme';
import Switch from "react-switch";
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const ctx = useTheme();
  const [checked, setChecked] = useState(false);
  function handleChange(check: boolean) {
    setChecked(!checked);
    if(check) {
      ctx?.setTheme('dark');
    }else{
      ctx?.setTheme('light');
    }
  }
  return (
    <div className={`App ${ctx?.theme}`}>
      <Switch onChange={handleChange} checked={checked} className='themeSwitch' height={35} width={70} uncheckedIcon={<FaMoon/>} checkedIcon={<FaSun />} />
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
