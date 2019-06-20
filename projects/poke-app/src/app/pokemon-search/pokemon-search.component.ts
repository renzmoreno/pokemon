import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable, Subject  } from 'rxjs';
import { PokemonDetails } from '../response-details.model'
import { AllPokemonTypes } from '../response-type.model'

import { ActivatedRoute, Router } from '@angular/router'
import { PageDataService } from '../page-data-service'


@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
  // pokemon$ : Observable<PokemonDetails>;
  // private searchTerms = new Subject<string>();
  pokemonName: String;
  functionType: string;
  pokemonTypes: string[] = new Array();

  constructor( private pokemonService : PokemonService,
              private route: ActivatedRoute,
              private router: Router,
              public pageDataService: PageDataService) { }

  search(term: string): void {
    // this.searchTerms.next(term);
    this.pokemonName = term.toLocaleLowerCase(); 
    // this.router.navigate[term]
  }

  onSelectFunction() {
    var e = document.getElementById("functionOptions") as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel].value;
    this.functionType = opt;
    console.log(opt);
  }

  onSelectType() {
    var e = document.getElementById("typeOptions") as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel].value;
    this.functionType = opt;
    // console.log(opt);
    this.router.navigate(['pokemon/byType/' + opt]);
  }

  getPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((response: AllPokemonTypes) => {
      this.pokemonTypes.push("ALL");
      response.results.forEach(item => {
        // console.log(item.name);
        
        this.pokemonTypes.push(item.name);
      });
      this.pokemonTypes.sort();

    })
  }

  test(isChecked: boolean, type: string) {
    console.log(isChecked + ' ' +type);
    if(isChecked){
      this.pageDataService.add(type);
    } else {
      this.pageDataService.remove(type);
    }
  }



  ngOnInit() {
    this.functionType = "searchByName";
    this.getPokemonTypes();
    // this.pokemonTypes = ["electric", "dark"];
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
