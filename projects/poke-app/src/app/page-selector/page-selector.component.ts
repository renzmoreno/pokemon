import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { Menu } from '../reponse-of-baseURL.model'
import { ActivatedRoute } from '@angular/router'
import { PageDataService } from '../page-data-service'

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css']
})
export class PageSelectorComponent implements OnInit {

  constructor(
    private pokemonService : PokemonService,
    private route: ActivatedRoute,
    public pageDataService : PageDataService
    ) { }

  totalPageCount : number;
  // pages: string[] = new Array(); 
  pages: number[] =  new Array(); 
  currentPage : string;

  buildPages() : void {

    this.pokemonService.getPokemons().subscribe((menu: Menu) => {
      
        let pokemonCount = menu.count;
        this.totalPageCount = Math.ceil(pokemonCount/32);
        for (var i=0; i < this.totalPageCount; i++){
            this.pages.push(i+1);
        }
      });
  }

  // setCurrentPage (pageNum ) {

  //   this.currentPage = pageNum; 
  // }


  
  getCurrentPage (){
    this.route.params.subscribe(parameter =>{
      console.log(parameter.pageNum);
      this.pageDataService.currentPage = parameter.pageNum;
    })
  }

  ngOnInit() {
    this.getCurrentPage();


    
        
  }

}
