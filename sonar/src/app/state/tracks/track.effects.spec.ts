import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TrackEffects } from './track.effects';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TrackEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TrackEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
