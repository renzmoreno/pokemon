import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable, Subject  } from 'rxjs';
import { PokemonDetails } from '../response-details.model'

import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
  // pokemon$ : Observable<PokemonDetails>;
  // private searchTerms = new Subject<string>();
  pokemonName: String;


  constructor( private pokemonService : PokemonService,
              private route: ActivatedRoute,
              private router: Router) { }

  search(term: string): void {
    // this.searchTerms.next(term);
    this.pokemonName = term; 
    // this.router.navigate[term]
  }



  ngOnInit() {
    
    // this.pokemon$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   // debounceTime(300),
 
    //   // ignore new term if same as previous term
    //   // distinctUntilChanged(),
 
    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.pokemonService.searchPokemonsByType(term)),

    // );
  
  }

}
