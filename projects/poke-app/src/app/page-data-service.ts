import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {
  pageData : string[] = [];

 

  add(str : string): void{
    this.pageData.push(str);
    this.pageData.sort();
    console.log(this.pageData);
  }

  clear() {
    this.pageData = [];
  }

  remove(str: string): void {
    const index = this.pageData.indexOf(str);
    if (index > -1) {
      var removed = this.pageData.splice(index, 1);
      this.pageData.sort();
      console.log("removed " + removed)
      console.log(this.pageData);
    }
  }


}
