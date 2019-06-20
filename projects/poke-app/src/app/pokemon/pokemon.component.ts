import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'


import { PokemonService } from '../pokemon.service';
import { PokemonTag } from '../reponse-of-baseURL.model';
import { TypeDetails } from '../response-type.model';
// import { timingSafeEqual } from 'crypto';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonTags : PokemonTag[] = new Array();
  isPokemonsAvailable : boolean;
  // pokemonTag : PokemonTag;
  // page: number;


  constructor( 
    private pokemonservice: PokemonService,
    private route: ActivatedRoute,
    private location: Location

    ) { }

  // getPokemons() : void {   
  //   this.route.params.subscribe(parameter => {
  //     // console.log(parameter.pageNum)
      
  //     this.pokemonservice.getPokemons(parameter.pageNum).subscribe(pokemons => {
  //       // console.log(pokemons.results);
  //       this.pokemonTags = pokemons.results;
  //     });
  //   });
  // }

  getPokemons(num: number) : void {   
    this.pokemonTags = [];      
      this.pokemonservice.getPokemons(num).subscribe(pokemons => {
        // console.log(pokemons.results);
        this.pokemonTags = pokemons.results;
      }, err => {
        console.log("pokemon component error");
        this.isPokemonsAvailable = false;
    });

  }

  // getPokemonsBytype() : void {
    
  //   this.route.params.subscribe(parameter => {
  //     console.log();
  //     this.pokemonservice.getPokemonByType(parameter.pageNum).subscribe((typeDetails: TypeDetails) => {
  //       typeDetails.pokemon.forEach(item => {
  //         this.pokemonTags.push(item.pokemon);
  //       })
  //       console.log(this.pokemonTags);
  //       // this.pokemonTag = typeDetails.pokemon[0].pokemon
  //     });
  //   });
  // }

  getPokemonsBytype(pageNum: string) : void {
    this.pokemonTags = [];      
    

      this.pokemonservice.getPokemonByType(pageNum).subscribe((typeDetails: TypeDetails) => {
        typeDetails.pokemon.forEach(item => {
          this.pokemonTags.push(item.pokemon);
        })
        console.log(this.pokemonTags);
        if(!this.pokemonTags.length){
          this.isPokemonsAvailable = false;
        }
        
        // this.pokemonTag = typeDetails.pokemon[0].pokemon
      },  err => {
          console.log(err);
          this.isPokemonsAvailable = false;
      });

  }

  buildDisplay() : void {
    this.isPokemonsAvailable = true;
    this.route.params.subscribe(parameter => {
      if(parameter.display === "page"){
        // console.log("display by page");
        this.getPokemons(parameter.pageNum);
      }else if(parameter.display === "byType") {
        // console.log("display by type");
        this.getPokemonsBytype(parameter.pageNum);
        
      } else{
        console.log(parameter.display);
      }
    });
  }


  // ngOnDestroy() {
  //   console.log("destroyed");
  // }

  ngOnInit() {
    // this.getPokemons();
    this.buildDisplay();
    // this.getPokemonsBytype();
  }

}
