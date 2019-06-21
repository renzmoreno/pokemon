import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonTag } from '../reponse-of-baseURL.model'
import { PokemonDetails } from '../response-details.model'
import { PokemonEvolutionDetail } from '../pokemon'
import { PokemonSpecies } from '../response-species.model'

@Component({
  selector: 'app-pokemon-evo-display',
  templateUrl: './pokemon-evo-display.component.html',
  styleUrls: ['./pokemon-evo-display.component.css']
})
export class PokemonEvoDisplayComponent implements OnInit {
  @Input() inputEvolveDetList: PokemonEvolutionDetail[];

  pokemonBase: PokemonEvolutionDetail = new PokemonEvolutionDetail();
  pokemonlevel1: PokemonEvolutionDetail[] = new Array();
  pokemonlevel2: PokemonEvolutionDetail[] = new Array();
  isEvolving: boolean = false;


  constructor( private pokemonservice : PokemonService  ) { }

// based on how I coded the retrieval of inputEvolveDetList
// 1. only one base pokemon (level 0 inside the class) 
// 2. level 0 will level up to level 1. no level up jump
// 3. multiple level 1 and level 2 may occur. 
// 4. highest level of evolution is only upto lvl 2

// any changes on these will need to update this component and the pokemon-profile component

  buildPokemonEvolution(pokemonList: PokemonEvolutionDetail[]): void {
     
    pokemonList.forEach(item => {
      if(item.level === 0) {
        this.pokemonBase = item;
        this.pokemonservice.getPokemonSpeciesbyURL(item.speciesURL).subscribe((species: PokemonSpecies) => {
          this.pokemonBase.name = species.varieties[0].pokemon.name;
          this.pokemonservice.getPokemonDetails(item.name).subscribe((details: PokemonDetails) =>{
          
            this.pokemonBase.img = details.sprites.front_default;
            // console.log(this.pokemonBase);
          });
        });
        
      }
      if(item.level === 1) {
        this.isEvolving = true;
          var pokemon: PokemonEvolutionDetail = new PokemonEvolutionDetail();
          pokemon = item;
          // console.log(item.speciesURL);
          this.pokemonservice.getPokemonSpeciesbyURL(item.speciesURL).subscribe((species: PokemonSpecies) => {
            pokemon.name = species.varieties[0].pokemon.name;
            
            this.pokemonservice.getPokemonDetails(species.varieties[0].pokemon.name).subscribe((details: PokemonDetails) =>{
              pokemon.img = details.sprites.front_default;
              // console.log(pokemon);
              this.pokemonlevel1.push(pokemon);
            });
          });
          
      }
      if(item.level === 2) {
          var pokemon: PokemonEvolutionDetail = new PokemonEvolutionDetail();
          pokemon = item;
          // console.log(item.speciesURL);
          this.pokemonservice.getPokemonSpeciesbyURL(item.speciesURL).subscribe((species: PokemonSpecies) => {
            pokemon.name = species.varieties[0].pokemon.name;
            this.pokemonservice.getPokemonDetails(species.varieties[0].pokemon.name).subscribe((details: PokemonDetails) =>{
              pokemon.img = details.sprites.front_default;
              // console.log(pokemon);
              this.pokemonlevel2.push(pokemon);
            });
          });
          
      }
    });

  }

  ngOnInit() {
    this.buildPokemonEvolution(this.inputEvolveDetList);
  }

}
