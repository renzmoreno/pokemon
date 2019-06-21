import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'

import { AllPokemonTypes } from '../response-type.model'

import { ActivatedRoute, Router } from '@angular/router'
import { PageDataService } from '../page-data-service'


@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
  pokemonName: String;
  functionType: string;
  pokemonTypes: string[] = new Array();

  constructor( private pokemonService : PokemonService,
              private route: ActivatedRoute,
              private router: Router,
              public pageDataService: PageDataService) { }

  search(term: string): void {
    this.pokemonName = term.toLocaleLowerCase(); 

  }

  onSelectFunction() {
    var e = document.getElementById("functionOptions") as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel].value;
    this.functionType = opt;
    if(opt === "searchByName"){
      if(!this.pageDataService.pageData.length) {
        this.router.navigate(['pokemon/page/1']);
      }
      this.pageDataService.clear();
      this.pageDataService.addNumberedPage(31);

    } else {
      this.pageDataService.clear();
    }
  }



  getPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((response: AllPokemonTypes) => {
      response.results.forEach(item => {
        // console.log(item.name);
        
        this.pokemonTypes.push(item.name);
      });
      this.pokemonTypes.sort();

    })
  }

  selectedType(isChecked: boolean, type: string) {
    // console.log(isChecked + ' ' +type);
    if(isChecked){
      this.pageDataService.add(type);
    } else {
      this.pageDataService.remove(type);
      // var currPage = this.route.snapshot.paramMap.get('pageNum')
      var currPage = this.pageDataService.currentPage;
      // console.log(currPage);
      if (currPage === type){
        this.router.navigate(['pokemon/byType/' + this.pageDataService.pageData[0]]);
      }
    }
  }



  ngOnInit() {
    console.log("onInit search");
    this.functionType = "searchByName";
    this.getPokemonTypes();
    this.pageDataService.clear();
    this.pageDataService.addNumberedPage(31);
   
  }

}
