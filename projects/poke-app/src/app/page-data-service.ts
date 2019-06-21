import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {
  currentPage: string;
  pageData : string[] = [];
  pageType : string;

  
  addNumberedPage(maxPage : number) {
    this.pageType = "numeric";
    for (var i=0; i < maxPage; i++){
      var item = i + 1 as unknown as string;
      this.pageData.push(item);
    }
  }

  add(str : string): void{
    this.pageType = "pokemonType";
    this.pageData.push(str);
    this.pageData.sort();
    // console.log(this.pageData);
  }

  clear() {
    this.pageData = [];
  }

  remove(str: string): void {
    const index = this.pageData.indexOf(str);
    if (index > -1) {
      var removed = this.pageData.splice(index, 1);
      this.pageData.sort();
      // console.log("removed " + removed)
      // console.log(this.pageData);
    }
  }


}
