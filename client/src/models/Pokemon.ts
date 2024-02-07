export interface Pokemons {
    results: {
        name: string
    }[],
    previous: string | null,
    next: string | null,
    count: number
}

export interface Pokemon {
    name: string,
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    },
    types: {
        type: {
            name: string
        }
    }[],
    weight: number,
    height: number
}