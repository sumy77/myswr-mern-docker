import useSWR from "swr";
import { AxiosError } from "axios";
import * as PokemonApi from "../api/pokemon-api";
export function usePokemon(name: string) {
    const {data, isLoading} = useSWR(name, async () => {
        try {
            return await PokemonApi.getPokemon(name);
        }catch(error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                return null;
            } else {
                throw error;
            }
        }
    });
    return {
        pokemon: data,
        pokemonLoading: isLoading
    }
}