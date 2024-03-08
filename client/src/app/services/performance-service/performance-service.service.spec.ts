import { TestBed } from '@angular/core/testing';

import { PerformanceServiceService } from './performance-service.service';

describe('PerformanceServiceService', () => {
  let service: PerformanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
