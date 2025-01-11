import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of, from } from 'rxjs';
import { TrackActions } from './track.actions';
import { FileService } from '../../../core/services/file/file.service';
import { TrackService } from '../services/track.service';


@Injectable()
export class TrackEffects {

  loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() => from(this.trackService.getAllTracks())
        .pipe(
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        ))
    );
  });

  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(({ track }) =>
        from(this.trackService.addTrack(track))
          .pipe(
            map(track => TrackActions.addTrackSuccess({ track })),
            catchError(error => of(TrackActions.addTrackFailure({ error })))
          ))
    )
  );

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



  constructor(private actions$: Actions, private fileService: FileService, private trackService: TrackService) { }
}


