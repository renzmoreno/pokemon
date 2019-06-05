import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { Menu } from '../reponse-of-baseURL.model'

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css']
})
export class PageSelectorComponent implements OnInit {

  constructor(private pokemonService : PokemonService) { }

  totalPageCount : number;
  pages : string[];

  buildPages() : void {
    this.pokemonService.getPokemons().subscribe((menu: Menu) => {
        let pokemonCount = menu.count;
        this.totalPageCount = Math.ceil(pokemonCount/32);
        console.log(this.totalPageCount)
      });
  }

  createPages(i: number) {
    console.log("createpages" + i);
    return new Array(i);
    
  }

  ngOnInit() {
    this.buildPages();
    
  }

}
