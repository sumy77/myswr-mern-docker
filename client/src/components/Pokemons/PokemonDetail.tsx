import React from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePokemon } from '../../hooks/usePokemon';
import { Button, Spinner } from 'react-bootstrap';


function PokemonDetail() {
  const params= useParams();
  let navigate = useNavigate();
  const name = params.name?.toString() || "";
  const {pokemon, pokemonLoading} = usePokemon(name);

  if(pokemonLoading) {
    return <Spinner animation="grow" />
  }
  if(!pokemon) {
    return <p>Pokemon not found.</p>
  }
  return (<>
    {pokemon && (
      <>
      <Button onClick={() => navigate(-1)}>← Back</Button>
      <div className="pokemon-detail d-flex flex-column align-items-center">
        <h1 className="text-center text-capitalize">{pokemon.name}</h1>
        <img src={pokemon.sprites.other['official-artwork'].front_default} width={400} height={400} />
        <div className="d-inline-block mt-2">
            <div><strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(", ")}</div>
            <div><strong>Height:</strong> {pokemon.height * 10} cm</div>
            <div><strong>Weight:</strong> {pokemon.weight / 10} kg</div>
        </div>
      </div>
      </>
    )}
  </>)
}

export default PokemonDetail