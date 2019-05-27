import { Injectable } from '@angular/core';

import { Pokemon } from './Pokemon'

import { Observable, of } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=21';

  getpokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonUrl)
      .pipe(
        catchError(this.handleError<Pokemon[]>('getPokemons', []))
      );
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
