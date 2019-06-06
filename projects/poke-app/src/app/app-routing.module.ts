import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component'
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component'


const routes: Routes = [
  { path: 'pokemon/page/:pageNum', component: PokemonComponent },
  { path: '', redirectTo: '/pokemon/page/1', pathMatch: 'full' },
  { path: 'pokemon/:name', component: PokemonProfileComponent}

];

@NgModule({
  // declarations: [],
  imports: [ RouterModule.forRoot(routes) ],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
