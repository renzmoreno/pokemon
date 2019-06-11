import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonTag } from '../reponse-of-baseURL.model'
import { PokemonDetails } from '../response-details.model'

@Component({
  selector: 'app-pokemon-evo-display',
  templateUrl: './pokemon-evo-display.component.html',
  styleUrls: ['./pokemon-evo-display.component.css']
})
export class PokemonEvoDisplayComponent implements OnInit {
  @Input() inputEvolvesFrom: string;
  @Input() inputEvolvesTo: string[];

  evolvesFromTag: PokemonTag;
  evolvesToList: PokemonTag[]= new Array();

  evolvesFromName: string;
  evolvesFromURL: string;

  evolvesToNames: string[] = new Array();
  evolvesToURLs: string[]  = new Array();


  constructor( private pokemonservice : PokemonService  ) { }

  getPokemonDetails(name: string, container?: any): void {
    if (container === 'PokemonTag'){
      console.log('from ' + name + container);
      this.pokemonservice.getPokemonDetails(name).subscribe((details: PokemonDetails) => {
        // console.log(details);
        // console.log(details.name);
        this.evolvesFromName = details.name;
        this.evolvesFromURL = details.sprites.front_default;
       
      });
    }
    if (container === 'PokemonTag[]'){
      console.log('to' + name);
      this.pokemonservice.getPokemonDetails(name).subscribe((details: PokemonDetails) => {
        let evolvesTo: PokemonTag;
        // evolvesTo.name = details.name;
        // evolvesTo.url = details.sprites.front_default;
        // this.evolvesToList.push(evolvesTo);
        this.evolvesToNames.push(details.name);
        this.evolvesToURLs.push(details.sprites.front_default);

      });
    }
  }

  ngOnInit() {
          
      this.getPokemonDetails(this.inputEvolvesFrom, 'PokemonTag');
      this.inputEvolvesTo.forEach((element: string) => {
        this.getPokemonDetails(element, 'PokemonTag[]')
      });

  }

}
