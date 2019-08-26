/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MuskeetService } from './muskeet.service';

describe('Service: Muskeet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MuskeetService]
    });
  });

  it('should ...', inject([MuskeetService], (service: MuskeetService) => {
    expect(service).toBeTruthy();
  }));
});
