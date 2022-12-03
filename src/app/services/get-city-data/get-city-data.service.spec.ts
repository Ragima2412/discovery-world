import { TestBed } from '@angular/core/testing';

import { GetCityDataService } from './get-city-data.service';

describe('GetCityDataService', () => {
  let service: GetCityDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCityDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
