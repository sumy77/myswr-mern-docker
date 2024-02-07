import React from 'react'
import useSWR from "swr";
import {Row, Col, Button} from 'react-bootstrap';
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import PokemonCard from './PokemonCard';
import * as PokemonApi from '../../api/pokemon-api';

function PokemonList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")?.toString() || "1";
    const navigate = useNavigate();

    const {data, isLoading} = useSWR(["getPokemonPage", page], () => PokemonApi.getPokemons(page));

    if(isLoading) {
        return <p>Loading...</p>
    }

  return (
    <div className="pokemon-wrapper">
        <Link to="/todos">To Dos</Link>
        <h1 className='text-center mb-4'>Gotta cache &apos;em all - Hurray</h1>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
            {data?.results.map(pokemon => (
            <Col key={pokemon.name}>
                    <PokemonCard name={pokemon.name} />
                </Col>
            ))}
        </Row>
        <div className="d-flex justify-content-center gap-2 mt-4">
            {data?.previous && <Button onClick={() => navigate("?page="+ (parseInt(page) - 1))}>Previous</Button>}
            {data?.next && <Button onClick={() => navigate("?page="+ (parseInt(page) + 1))}>Next</Button>}
        </div>
    </div>
  )
}

export default PokemonList