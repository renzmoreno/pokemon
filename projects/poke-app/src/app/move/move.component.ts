import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service'
import { MoveDetails } from '../response-move.model'

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {
  @Input() inputMove: string;
  isDetailShown: boolean = false;

  moveDetails: MoveDetails;
  moveDescription: string;
  moveEffectDesc: string;


  constructor( private pokemonService : PokemonService) { }

  buildMoveDisplay(move: string) : void {
    this.isDetailShown = false;
    this.pokemonService.getMoveDetails(move).subscribe((moveDetails: MoveDetails) => {
        this.moveDetails = moveDetails;
        // console.log(this.isDetailShown);
        moveDetails.flavor_text_entries.forEach(item => {
          if(item.language.name === "en"){
            this.moveDescription = item.flavor_text;

          }
        });
        moveDetails.effect_entries.forEach(item =>{
          if(item.language.name === "en"){
            var desc = item.effect.split("$effect_chance%");
            if (desc.length == 2 ){
              this.moveEffectDesc = desc[0]+ moveDetails.effect_chance + "%" + desc[1];
            } else {
              this.moveEffectDesc = item.effect;
            }
            
          }
        })
    });
  }

  toggleShow(){
    if (this.isDetailShown === true){
      this.isDetailShown = false;
      console.log(this.isDetailShown);
    } else {
      this.isDetailShown = true;
      console.log(this.isDetailShown);
    }
  }

  ngOnInit() {

    this.buildMoveDisplay(this.inputMove);
  }

}
