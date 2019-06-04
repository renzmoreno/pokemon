import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { PokemonDetails } from '../response-details.model'

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
  // imgSrc: string;


  constructor(
    private pokemonService : PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
 
  getPokemonDetails(): void {
    const name  = this.route.snapshot.paramMap.get('name');
      this.pokemonService.getPokemonDetails(name).subscribe((details: PokemonDetails) => {
        this.details = details;
        this.name = name;
        
        // this.imgSrc = details.sprites.front_default;
        
        console.log(details.moves);
    })
  }

  ngOnInit() {
    this.getPokemonDetails();
  }

}
