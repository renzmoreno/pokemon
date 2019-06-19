import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonTag } from '../reponse-of-baseURL.model'
import { PokemonDetails } from '../response-details.model'
import { PokemonEvolutionDetail } from '../pokemon'

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
// 2. level 0 will level up to level 1.
// 3. multiple level 1 may occur. like the case of eevee
// 4. if there are multiple level 1's and level 2's. level 2 evolution will be coming from the immediate level 1 before the current level 2.
// 5. sample order of array lvl0 lvl1 lvl2 lvl3 lvl1 lvl2 lvl1 lvl1 lvl1
// 6. Asssumed that branching from level 1 evoluiont will not occur. 
//    Example. base lvl 0 pokemon is bulbasaur
//              lvl 1 evolution is ivysaur. 
//              lvl 2 evolution is venusaur. threre should be no other evolution possibility
// 6. highest level of evolution is only upto lvl 2
// any changes on these will need to update this component and the pokemon-profile component

  buildPokemonEvolution(pokemonList: PokemonEvolutionDetail[]): void {
    // console.log(pokemonList[0].name);
    // var name = pokemonList[0].name;
    // this.pokemonservice.getPokemonDetails(name).subscribe((details: PokemonDetails) =>{
          
    //         this.pokemonBase.img = details.sprites.front_default;
    //         // console.log(this.pokemonBase);
    //       });
   
    pokemonList.forEach(item => {
      if(item.level === 0) {
        this.pokemonBase = item;
        this.pokemonservice.getPokemonDetails(item.name).subscribe((details: PokemonDetails) =>{
          
          this.pokemonBase.img = details.sprites.front_default;
          // console.log(this.pokemonBase);
        });
      }
      if(item.level === 1) {
        this.isEvolving = true;
          var pokemon: PokemonEvolutionDetail = new PokemonEvolutionDetail();
          pokemon = item;
          this.pokemonservice.getPokemonDetails(item.name).subscribe((details: PokemonDetails) =>{
            pokemon.img = details.sprites.front_default;
            // console.log(pokemon);
            this.pokemonlevel1.push(pokemon);
          });
      }
      if(item.level === 2) {
          var pokemon: PokemonEvolutionDetail = new PokemonEvolutionDetail();
          pokemon = item;
          this.pokemonservice.getPokemonDetails(item.name).subscribe((details: PokemonDetails) =>{
            pokemon.img = details.sprites.front_default;
            // console.log(pokemon);
            this.pokemonlevel2.push(pokemon);
          });
      }
    });

  }

  ngOnInit() {
    // console.log(this.inputEvolveDetList);
    this.buildPokemonEvolution(this.inputEvolveDetList);
      // this.getPokemonDetails(this.inputEvolvesFrom, 'PokemonTag');
      // this.inputEvolvesToList.forEach((element: string) => {
      //   this.getPokemonDetails(element, 'PokemonTag[]')
      // });

  }

}
