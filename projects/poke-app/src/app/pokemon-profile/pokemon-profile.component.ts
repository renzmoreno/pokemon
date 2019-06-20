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
  isAPokemon: boolean;


  constructor(
    private pokemonService : PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
 
  getPokemonDetails(): void {
    this.isAPokemon = true;

    // const name  = this.route.snapshot.paramMap.get('name');
    const name = this.route.params.subscribe(parameter => {
      this.pokemonService.getPokemonDetails(parameter.name).subscribe((details: PokemonDetails) => {
        this.details = details;
        this.name = details.name;
        this.types =  details.types;
        // console.log(this.types);
        this.imgSrc = details.sprites.front_default;
        // console.log("dfdfs");
        // console.log(details.species.name);
        this.getPokemonSpeciesDetails(details.species.name);
      }, err => {
        console.log("pokemon component error");
        this.isAPokemon = false;
      });
    });

  }

  // getPokemonSpeciesDetails(): void {
    // const name  = this.route.snapshot.paramMap.get('name');
    // const name = this.route.params.subscribe(parameter =>{

  getPokemonSpeciesDetails(name: string): void {
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
                this.lvl = 0;
                var evoPokemonbase = new PokemonEvolutionDetail();
                evoPokemonbase.level = this.lvl;
                evoPokemonbase.name = evolution.chain.species.name;
                evoPokemonbase.speciesURL = evolution.chain.species.url;
                this.pokemonEvolutionDetailList.push(evoPokemonbase);
  

                evolution.chain.evolves_to.forEach((evolvesTo, index) => {
                    var i = index;
                    let evoLvl1 = evolvesTo
                    var evoPokemon = new PokemonEvolutionDetail();
                    evoPokemon.level = this.lvl + 1;
                    evoPokemon.name = evoLvl1.species.name;
                    evoPokemon.speciesURL = evoLvl1.species.url;
                    if (evoLvl1.evolution_details[0].min_level){
                      evoPokemon.minLevel = evoLvl1.evolution_details[0].min_level;
                    }
                    if(evoLvl1.evolution_details[0].item){
                      // console.log(evolves.evolution_details[0].item);
                      evoPokemon.item = evoLvl1.evolution_details[0].item.name;
                    }
                    if(evoLvl1.evolution_details[0].trigger){
                      evoPokemon.trigger = evoLvl1.evolution_details[0].trigger.name;
                    }
                    this.pokemonEvolutionDetailList.push(evoPokemon);
                    
                    
                    evoLvl1.evolves_to.forEach(evolvesTo => {
                        let evoLvl2 = evolvesTo
                        var evoPokemon = new PokemonEvolutionDetail();
                        evoPokemon.level = this.lvl + 2;
                        evoPokemon.name = evoLvl2.species.name;
                        evoPokemon.speciesURL = evoLvl2.species.url;
                        if (evoLvl2.evolution_details[0].min_level){
                          evoPokemon.minLevel = evoLvl2.evolution_details[0].min_level;
                        }
                        if(evoLvl2.evolution_details[0].item){
                          // console.log(evolves.evolution_details[0].item);
                          evoPokemon.item = evoLvl2.evolution_details[0].item.name;
                        }
                        if(evoLvl2.evolution_details[0].trigger){
                          evoPokemon.trigger = evoLvl2.evolution_details[0].trigger.name;
                        }
                        this.pokemonEvolutionDetailList.push(evoPokemon);
                    });
                });
          }); 
      });

    
  }


  buildEvoList() {

  }

  ngOnInit() {
    
    this.getPokemonDetails();
    // this.getPokemonSpeciesDetails()
  }

}
