import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  listresponse : any;
  
  constructor( private pokemonservice: PokemonService) { }

  getPokemons() : void {    
    this.pokemonservice.getPokemons().subscribe(pokemons => {
      // console.log(pokemons.results);
      this.listresponse = pokemons.results;
    });
  }


  ngOnInit() {
    this.getPokemons();
  }

}
