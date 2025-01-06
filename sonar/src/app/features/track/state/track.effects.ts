import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TrackActions } from './track.actions';


@Injectable()
export class TrackEffects {

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TrackActions.loadTracks),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TrackActions.loadTracksSuccess({ data })),
          catchError(error => of(TrackActions.loadTracksFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
