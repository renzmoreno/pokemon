import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemons: Pokemon[];

  constructor( private pokemonservice: PokemonService) { }

  getPokemons() : void {
    this.pokemonservice.getpokemons().subscribe(pokemons => this.pokemons = pokemons);
  }

  ngOnInit() {
    this.getPokemons();
  }

}
