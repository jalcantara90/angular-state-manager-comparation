import { TestBed } from '@angular/core/testing';

import { TaskStateRxjsService } from './task-state-rxjs.service';

describe('TaskStateRxjsService', () => {
  let service: TaskStateRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStateRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
