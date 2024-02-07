import React from 'react'
import { usePokemon } from '../../hooks/usePokemon';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap';

function PokemonCard({name}: {name: string}) {
    const { pokemon, pokemonLoading } = usePokemon(name);
  return (
        <Link to={"/" + name}>
            <Card className="pokemon-card">
                {pokemonLoading && <Spinner animation="grow" />}
                {pokemon && <>
                    <Card.Img variant="top" width={200} src={pokemon.sprites.other["official-artwork"].front_default} />
                    <Card.Body>
                        <Card.Title className="text-center text-capitalize">{pokemon.name}</Card.Title>
                    </Card.Body>
                    </>
                }
            </Card>
        </Link>
  )
}

export default PokemonCard