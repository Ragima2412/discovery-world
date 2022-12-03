import { TestBed } from '@angular/core/testing';

import { CityLocationService } from './city-location.service';

describe('CityLocationService', () => {
  let service: CityLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
