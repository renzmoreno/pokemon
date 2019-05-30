import { Injectable } from '@angular/core';

import { PokemonService } from './pokemon.service'

import { Pokemon } from './pokemon'
import { PokemonTag } from './reponse-of-baseURL.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonBuidlerService {
  pokemons : Pokemon[];
  pokemonTag: PokemonTag[];

  // buildPokemonList() : Pokemon[] {
    
  //    this.pokemonService.getPokemons().subscribe(pokemons => {
  //     // console.log(pokemons.results);
  //     this.pokemonlist = pokemons.results;
  //     return
  //   }); 
  
  // }

  constructor( private pokemonService: PokemonService) { }
}
