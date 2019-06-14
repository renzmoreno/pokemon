import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonDetails,Types } from '../response-details.model'
import { PokemonSpecies, FlavorTextEntry } from '../response-species.model'
import { Evolution, EvolvesTo } from '../response-evolution.model'
// import { PokemonEvolutionDetail } from '../pokemon'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConstantPool } from '@angular/compiler';
import { PokemonEvolutionDetail } from '../pokemon';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// import { Rx } from 'rxjs'

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
  // pokemonsEvolvesTo: String[] = new Array();
  pokemonEvolutionDetailList: PokemonEvolutionDetail[] = new Array();
  lvl: number; 


  constructor(
    private pokemonService : PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
 
  getPokemonDetails(): void {
    // const name  = this.route.snapshot.paramMap.get('name');
    const name = this.route.params.subscribe(parameter => {
      this.pokemonService.getPokemonDetails(parameter.name).subscribe((details: PokemonDetails) => {
        this.details = details;
        this.name = details.name;
        this.types =  details.types;
        // console.log(this.types);
        this.imgSrc = details.sprites.front_default;
    })
    });
    //   this.pokemonService.getPokemonDetails(name).subscribe((details: PokemonDetails) => {
    //     this.details = details;
    //     this.name = details.name;
    //     this.types =  details.types;
    //     // console.log(this.types);
    //     this.imgSrc = details.sprites.front_default;
    // })
  }

  getPokemonSpeciesDetails(): void {
    // const name  = this.route.snapshot.paramMap.get('name');
    const name = this.route.params.subscribe(parameter =>{
      this.pokemonService.getPokemonSpecies(parameter.name).subscribe((species: PokemonSpecies) => {
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
                this.lvl = 0;
                var evoPokemonbase = new PokemonEvolutionDetail();
                evoPokemonbase.level = this.lvl;
                evoPokemonbase.name = evolution.chain.species.name;
                this.pokemonEvolutionDetailList.push(evoPokemonbase);
  
                evolution.chain.evolves_to.forEach(evolvesTo => {
                  let evolves = evolvesTo; 
                  
                  do {
                    // console.log(evolves);
                    var evoPokemon = new PokemonEvolutionDetail();
                    evoPokemon.level = this.lvl + 1;
                    evoPokemon.name = evolves.species.name;
                    if (evolves.evolution_details[0].min_level){
                      evoPokemon.minLevel = evolves.evolution_details[0].min_level;
                    }
                    if(evolves.evolution_details[0].item){
                      // console.log(evolves.evolution_details[0].item);
                      evoPokemon.item = evolves.evolution_details[0].item.name;
                    }
                    if(evolves.evolution_details[0].trigger){
                      evoPokemon.trigger = evolves.evolution_details[0].trigger.name;
                    }
                    
                    this.pokemonEvolutionDetailList.push(evoPokemon);
  
                  } while (!evolves) 
  
                  if (evolvesTo.evolves_to[0]){
                    var evoPokemon = new PokemonEvolutionDetail();
                    evoPokemon.level = this.pokemonEvolutionDetailList[this.pokemonEvolutionDetailList.length-1].level + 1;
                    evoPokemon.name = evolvesTo.evolves_to[0].species.name;
  
                    if (evolvesTo.evolves_to[0].evolution_details[0].min_level){
                      evoPokemon.minLevel = evolvesTo.evolves_to[0].evolution_details[0].min_level;
                    }
                    if(evolvesTo.evolves_to[0].evolution_details[0].item){
                      // console.log(evolvesTo.evolves_to[0].evolution_details[0].item);
                      evoPokemon.item = evolvesTo.evolves_to[0].evolution_details[0].item.name;
                    }
                    if(evolvesTo.evolves_to[0].evolution_details[0].trigger){
                      evoPokemon.trigger = evolvesTo.evolves_to[0].evolution_details[0].trigger.name;
                    }
  
                    // console.log(evolvesTo.evolves_to[0]);
                    
                    this.pokemonEvolutionDetailList.push(evoPokemon);
  
                  }
                  });
          }); 
          
      });
    });
    
  }

  ngOnInit() {
    
    this.getPokemonDetails();
    this.getPokemonSpeciesDetails()
  }

}
