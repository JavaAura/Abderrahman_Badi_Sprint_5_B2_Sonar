import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of, from } from 'rxjs';
import { TrackActions } from './track.actions';
import { FileService } from '../../../core/services/file/file.service';


@Injectable()
export class TrackEffects {

  // loadTracks$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(TrackActions.loadTracks),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => TrackActions.loadTracksSuccess({ data })),
  //         catchError(error => of(TrackActions.loadTracksFailure({ error }))))
  //     )
  //   );
  // });

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.uploadTrackFiles),
      mergeMap(({ trackFile, coverFile, trackId }) =>
        from(this.fileService.storeFiles(trackFile, coverFile, trackId)).pipe(
          map((success) => {
            if (success) {
              return TrackActions.uploadTrackFilesSuccess();
            }
            return TrackActions.uploadTrackFilesFailure({ error: 'Failed to store files' });
          }),
          catchError((error: unknown) => {
            const errorMessage =
              error instanceof Error ? error.message : 'An unknown error occurred';
            return of(TrackActions.uploadTrackFilesFailure({ error: errorMessage }));
          })
        )
      )
    )
  );



  constructor(private actions$: Actions, private fileService: FileService) { }
}


