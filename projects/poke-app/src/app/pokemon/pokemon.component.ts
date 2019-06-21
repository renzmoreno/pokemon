import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router'


import { PokemonService } from '../pokemon.service';
import { PokemonTag } from '../reponse-of-baseURL.model';
import { TypeDetails } from '../response-type.model';




@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonTags : PokemonTag[] = new Array();
  isPokemonsAvailable : boolean;


  constructor( 
    private pokemonservice: PokemonService,
    private route: ActivatedRoute,

    ) { }

  getPokemons(num: number) : void {   
    this.pokemonTags = [];      
      this.pokemonservice.getPokemons(num).subscribe(pokemons => {
        // console.log(pokemons.results);
        this.pokemonTags = pokemons.results;
      }, err => {
        // console.log("pokemon component error");
        this.isPokemonsAvailable = false;
    });

  }

  getPokemonsBytype(pageNum: string) : void {
    this.pokemonTags = [];      
      this.pokemonservice.getPokemonByType(pageNum).subscribe((typeDetails: TypeDetails) => {
        typeDetails.pokemon.forEach(item => {
          this.pokemonTags.push(item.pokemon);
        })
        // console.log(this.pokemonTags);
        if(!this.pokemonTags.length){
          this.isPokemonsAvailable = false;
        }
      },  err => {
          // console.log(err);
          this.isPokemonsAvailable = false;
      });

  }

  buildDisplay() : void {

    this.route.params.subscribe(parameter => {
      this.isPokemonsAvailable = true;
      
      if(parameter.display === "page"){
        // console.log("display by page");
        this.getPokemons(parameter.pageNum);
      }else if(parameter.display === "byType") {
        // console.log("display by type");
        this.getPokemonsBytype(parameter.pageNum);
        
      } else{
        // console.log(parameter.display);
      }
    });
  }



  ngOnInit() {
    this.buildDisplay();
  }

}
