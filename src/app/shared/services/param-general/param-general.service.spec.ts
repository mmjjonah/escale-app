import { TestBed } from '@angular/core/testing';

import { ParamGeneralService } from './param-general.service';

describe('ParamGeneralService', () => {
  let service: ParamGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
