import { TestBed } from '@angular/core/testing';

import { ValvesService } from './valves.service';

describe('ValvesService', () => {
  let service: ValvesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValvesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
