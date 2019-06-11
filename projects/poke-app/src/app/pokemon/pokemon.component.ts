import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

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
  page: number;
  
  constructor( 
    private pokemonservice: PokemonService,
    private route: ActivatedRoute,
    private location: Location

    ) { }

  getPokemons() : void {   
    this.route.params.subscribe(parameter => {
      // console.log(parameter.pageNum)
      
      this.pokemonservice.getPokemons(parameter.pageNum).subscribe(pokemons => {
        // console.log(pokemons.results);
        this.pokemonTags = pokemons.results;
      });
    });
    
    
    
    // console.log("pageNum " + page);
    // this.pokemonservice.getPokemons(page).subscribe(pokemons => {
    //   // console.log(pokemons.results);
    //   this.pokemonTags = pokemons.results;
    // });
  }


  // ngOnDestroy() {
  //   console.log("destroyed");
  // }

  ngOnInit() {
    this.getPokemons();

  }

}
