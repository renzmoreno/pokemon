import { Injectable } from '@angular/core';


import { Menu, PokemonTag } from './reponse-of-baseURL.model'
import { PokemonDetails } from './response-details.model'
import { PokemonSpecies } from './response-species.model'
import { Evolution } from './response-evolution.model'
import { MoveDetails } from './response-move.model'
import { AllPokemonTypes,TypeDetails } from './response-type.model';


import { Observable, of, throwError } from 'rxjs';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

//  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=21';
  private baseUrl = 'https://pokeapi.co/api/v2/';
  private baseURLSpecies = 'https://pokeapi.co/api/v2/pokemon-species';

  getPokemons(num?: number): Observable<Menu> {
    if (num) {
      let offsetVal = (num-1)*32;
      const url = `${this.baseUrl}pokemon?offset=${offsetVal}&limit=32`;
      return this.http.get<Menu>(url);
    }
    else {
      const url = `${this.baseUrl}pokemon?offset=0&limit=32`;
      return this.http.get<Menu>(url);
    }
  }

  getPokemonDetails(name: string): Observable<PokemonDetails>{
    const url = `${this.baseUrl}pokemon/${name}`
    // console.log("url: " + url);
    return this.http.get<PokemonDetails>(url).pipe(catchError(this.handleError2));
  }

  searchPokemonsByType(term: String) : Observable<Menu> {
    const url = `${this.baseUrl}pokemon/${term}`
    
    return  this.http.get<Menu>(url); 
  }

  getPokemonSpecies(name: String): Observable<PokemonSpecies> {
    const url = `${this.baseURLSpecies}/${name}`
    // console.log(url);
    return this.http.get<PokemonSpecies>(url).pipe(
      
      catchError(this.handleError<PokemonSpecies>('getSpecies',)));
    // return this.http.get<PokemonSpecies>(url);
  }

  getPokemonSpeciesbyURL(url: string): Observable<PokemonSpecies> {
      return this.http.get<PokemonSpecies>(url);
  }

  getPokemonEvolution(url: string): Observable<Evolution> {
    return this.http.get<Evolution>(url);
  }

  getMoveDetails(name: string): Observable<MoveDetails> {
    const url = `${this.baseUrl}move/${name}`
    return this.http.get<MoveDetails>(url);

  }

  getPokemonTypes(): Observable<AllPokemonTypes> {
    const url = `${this.baseUrl}type`
    return this.http.get<AllPokemonTypes>(url);
  }

  getPokemonByType(type: string): Observable<TypeDetails> {
    const url = `${this.baseUrl}type/${type}`
    // console.log(url);
    return this.http.get<TypeDetails>(url);
  }

  // searchPokemons(term: string): Observable<PokemonDetails> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of();
  //   }
  //   return this.http.get<PokemonDetails>(`${this.baseUrl}/${term}`).pipe(
  //     tap(_ => console.log(`${this.baseUrl}/${term}`)),
  //     catchError(this.handleError<PokemonDetails>('searchPokemon', ))
  //   );
  // }




  constructor(
    private http: HttpClient  ) { }


    private handleError2(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    };

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
