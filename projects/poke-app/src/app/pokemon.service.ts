import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon'
import { Menu } from './reponse-of-baseURL.model'
import { PokemonDetails } from './response-details.model'

import { Observable, of } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

//  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=21';
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(): Observable<Menu> {
    const url = `${this.baseUrl}?offset=0&limit=30`
    return this.http.get<Menu>(url);
  }

  getPokemonDetails(name: string): Observable<PokemonDetails>{
    const url = `${this.baseUrl}/${name}`
    console.log("url: " + url);
    return this.http.get<PokemonDetails>(url);
  }


  constructor(
    private http: HttpClient  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {  

     // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
      return of(result as T);
  };
}

  
}
