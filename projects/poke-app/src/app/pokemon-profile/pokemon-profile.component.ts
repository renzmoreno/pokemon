import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonDetails,Types } from '../response-details.model'
import { PokemonSpecies, FlavorTextEntry } from '../response-species.model'
import { Evolution, EvolvesTo } from '../response-evolution.model'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit {

  details : PokemonDetails;
  name: string;
  imgSrc: string;
  types: Types[];
  description: String;
  pokemonEvolvesFrom : string;
  pokemonsEvolvesTo: String[] = new Array();


  constructor(
    private pokemonService : PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
 
  getPokemonDetails(): void {
    const name  = this.route.snapshot.paramMap.get('name');
      this.pokemonService.getPokemonDetails(name).subscribe((details: PokemonDetails) => {
        this.details = details;
        this.name = details.name;
        this.types =  details.types;
        // console.log(this.types);
        this.imgSrc = details.sprites.front_default;
    })
  }

  getPokemonSpeciesDetais(): void {
    const name  = this.route.snapshot.paramMap.get('name');
    this.pokemonService.getPokemonSpecies(name).subscribe((species: PokemonSpecies) => {
      let isEn: string = 'false'
      let i: number = 0;
        while ( isEn === 'false'){
          if(species.flavor_text_entries[i].language.name === "en"){
            this.description = species.flavor_text_entries[i].flavor_text;
            isEn = 'true'
          }
          i++
        }

        this.pokemonService.getPokemonEvolution(species.evolution_chain.url)
            .subscribe((evolution: Evolution) => {
              this.pokemonEvolvesFrom =  evolution.chain.species.name;
              let evolves = evolution.chain.evolves_to 
              // this.pokemonsEvolvesTo.push(evolves[0].species.name);
              do {
                this.pokemonsEvolvesTo.push(evolves[0].species.name);
                // console.log(evolves);
                evolves = evolves[0].evolves_to;
                
              } while (!evolves) 
              // console.log(this.pokemonEvolvesFrom);
              // console.log(evolution.chain.evolves_to[0].species.name);
              // console.log(evolution.chain.evolves_to[0].evolves_to[0].species.name);
              
              this.pokemonsEvolvesTo.push(evolution.chain.evolves_to[0].evolves_to[0].species.name);
        }); 
        
    });
  }

  ngOnInit() {
    this.getPokemonDetails();
    this.getPokemonSpeciesDetais()
  }

}
