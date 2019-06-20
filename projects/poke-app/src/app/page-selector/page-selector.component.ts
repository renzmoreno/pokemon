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
    // this.route.params.subscribe(parameter =>{
    //   this.currentPage = parameter.pageNum;
    //   console.log(this.currentPage)
    // });
    this.pokemonService.getPokemons().subscribe((menu: Menu) => {
      
        let pokemonCount = menu.count;
        this.totalPageCount = Math.ceil(pokemonCount/32);
        for (var i=0; i < this.totalPageCount; i++){
            this.pages.push(i+1);
        }
        // console.log(this.pages);
        // this.setCurrentPage ("1");
      });
  }

  setCurrentPage (pageNum ) {
    // this.route.params.subscribe(respo => {
    //   // this.currentPage = pageNum; 
    //   console.log(respo.pageNum);
    // });
    this.currentPage = pageNum; 
  }

  changePage(){
    this.route.params.subscribe(parameter => {
      console.log("change page");
      console.log(parameter.pageNum);
      var index = this.pageDataService.pageData.indexOf(parameter.pageNum);
      if (index === -1){
        console.log("need to change page");
      }
    });
  }
  

  ngOnInit() {
    // console.log(this.pageDataService.pageData);
    // this.setCurrentPage ("1");
    // this.buildPages();
    this.changePage();

    
        
  }

}
