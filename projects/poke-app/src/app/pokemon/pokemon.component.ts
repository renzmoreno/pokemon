import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonTag } from '../reponse-of-baseURL.model';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonTags : PokemonTag[];

  
  constructor( private pokemonservice: PokemonService) { }

  getPokemons() : void {    
    this.pokemonservice.getPokemons().subscribe(pokemons => {
      // console.log(pokemons.results);
      this.pokemonTags = pokemons.results;
    });
  }

  // onSelect(pokemonTag: PokemonTag) : void {
  //     console.log(pokemonTag);
  // }



  ngOnInit() {
    this.getPokemons();

  }

}
