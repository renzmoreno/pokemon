import { TestBed } from '@angular/core/testing';

import { PageDataService } from './page-data-service';

describe('PageDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageDataService = TestBed.get(PageDataServiceService);
    expect(service).toBeTruthy();
  });
});
