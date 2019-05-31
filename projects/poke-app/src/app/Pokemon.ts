import { PokemonTag } from './reponse-of-baseURL.model';
import { PokemonDetails } from './response-details.model'

export class Pokemon implements PokemonTag, PokemonDetails {
    abilities: import("./response-details.model").Ability[];
    base_experience: number;
    forms: import("./response-details.model").Form[];
    game_indices: import("./response-details.model").GameIndice[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: import("./response-details.model").Move[];
    order: number;
    species: import("./response-details.model").Species;
    sprites: import("./response-details.model").Sprites;
    stats: import("./response-details.model").Stat[];
    types: import("./response-details.model").Types[];
    weight: number;
    name: string;    
    url: string;

  
    
    
   
}