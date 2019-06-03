import { Component, OnInit, Input } from '@angular/core';

import { PokemonService } from '../pokemon.service'
import { Pokemon } from '../pokemon';
import { PokemonDetails, Types, Type } from '../response-details.model'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() name: string;


  id: number;
  imgSrc: string;
  types: Type[] = new Array();

  constructor(
    private pokemonService: PokemonService
  ) { }

  getPokemonDetail(name: string): void {

    this.pokemonService.getPokemonDetails(name).subscribe((details : PokemonDetails) => {
      this.id = details.id;
      this.imgSrc = details.sprites.front_default;
      // console.log(name);
      details.types.forEach((element: Types) => {
        // console.log(element);
        this.types.push(element.type);
      });
    });
  }

  onSelect(name: String): void {

    console.log("this.id: " + this.id);
    console.log("this.name: " + this.name);
    console.log("this.imgSrc: " + this.imgSrc);
    console.log("this.types: " + this.types);

  }

  ngOnInit() {
    // console.log("renz: " + this.name);
    this.getPokemonDetail(this.name);
  }

}
