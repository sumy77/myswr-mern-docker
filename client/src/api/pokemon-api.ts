import { Pokemon, Pokemons } from "../models/Pokemon";
import api from "./axiosInstance";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export async function getPokemons(page: string) {
    const pageSize = 12;
    const pokemons = await api.get<Pokemons>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    return pokemons.data;
}

export async function getPokemon(name: string) {
    await delay(1000);
    const pokemon = await api.get<Pokemon>('/pokemon/'+name);
    return pokemon.data;
}