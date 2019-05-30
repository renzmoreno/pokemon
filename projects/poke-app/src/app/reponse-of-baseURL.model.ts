export interface PokemonTag {
    name: string;
    url: string;
}

export interface Menu {
    count: number;
    next: string;
    previous?: any;
    results: PokemonTag[];
}