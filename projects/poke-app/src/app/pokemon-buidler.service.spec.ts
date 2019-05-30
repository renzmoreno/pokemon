import { TestBed } from '@angular/core/testing';

import { PokemonBuidlerService } from './pokemon-buidler.service';

describe('PokemonBuidlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonBuidlerService = TestBed.get(PokemonBuidlerService);
    expect(service).toBeTruthy();
  });
});
