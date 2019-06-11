import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvoDisplayComponent } from './pokemon-evo-display.component';

describe('PokemonEvoDisplayComponent', () => {
  let component: PokemonEvoDisplayComponent;
  let fixture: ComponentFixture<PokemonEvoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonEvoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEvoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
