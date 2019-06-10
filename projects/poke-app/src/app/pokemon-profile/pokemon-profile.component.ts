import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonDetails,Types } from '../response-details.model'

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
        console.log(this.types);

        
        this.imgSrc = details.sprites.front_default;
        

    })
  }

  ngOnInit() {
    this.getPokemonDetails();
  }

}
