import { Component, OnInit, Input } from '@angular/core';

import { PokemonService } from '../pokemon.service'
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() name: string;

  listresponse2 : any;
  id: any;
  imgSrc: any;

  constructor(
    private pokemonService: PokemonService
  ) { }

  getPokemonDet(name: string): void {

    this.pokemonService.getPokemonDet(name).subscribe(response => {
      this.id = response.id;
      this.imgSrc = response.sprites.front_default;
      // console.log(this.imgSrc);
    });
  }

  ngOnInit() {
    console.log("renz: " + this.name);
    this.getPokemonDet(this.name);
  }

}
