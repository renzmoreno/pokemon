import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonEvoDisplayComponent } from './pokemon-evo-display/pokemon-evo-display.component';
import { MoveComponent } from './move/move.component'

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonDetailComponent,
    PokemonProfileComponent,
    PageSelectorComponent,
    PokemonSearchComponent,
    PokemonEvoDisplayComponent,
    MoveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
