import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Track } from './track.model';
import { TrackActions } from './track.actions';

export const tracksFeatureKey = 'tracks';

export interface State extends EntityState<Track> {
  message: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
  editedTrack: Track | null;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  uploadError: string | null;
}

export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>();

export const initialState: State = adapter.getInitialState({
  message: null,
  status: 'pending',
  editedTrack: null,
  uploadStatus: 'idle',
  uploadError: null
});

export const reducer = createReducer(
  initialState,

  on(TrackActions.editTrack, (state, { track }) => ({
    ...state,
    editedTrack: track  // Destructure track from action payload
  })),
  on(TrackActions.clearEditedTrack, (state) => ({
    ...state,
    editedTrack: null  // Clear the track
  })),

  on(TrackActions.loadTracks, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...adapter.setAll(tracks, state),
    status: 'success' as const,
    message: null
  })),
  on(TrackActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),

  on(TrackActions.uploadTrackFiles, (state) => ({
    ...state,
    uploadStatus: 'uploading' as const,
    uploadError: null,
  })),

  on(TrackActions.uploadTrackFilesSuccess, (state) => ({
    ...state,
    uploadStatus: 'success' as const,
    uploadError: null,
  })),

  on(TrackActions.uploadTrackFilesFailure, (state, { error }) => ({
    ...state,
    uploadStatus: 'error' as const,
    uploadError: error,
  })),


  on(TrackActions.addTrack, (state) => ({
    ...state,
    status: 'loading' as const,
    messge: null,
  })
  ),
  on(TrackActions.addTrackSuccess, (state, action) => ({
    ...adapter.addOne(action.track, state),
    status: 'success' as const,
    messge: null,
  })),
  on(TrackActions.addTrackFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


  on(TrackActions.updateTrack, (state) => ({
    ...state,
    status: 'loading' as const,
    message: null,
  })
  ),
  on(TrackActions.updateTrackSuccess, (state, action) => ({
    ...adapter.updateOne(action.track, state),
    status: 'success' as const,
    message: null,
  })),
  on(TrackActions.updateTrackFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


  on(TrackActions.deleteTrack, (state) => ({
    ...state,
    status: 'loading' as const,
    message: null,
  })
  ),
  on(TrackActions.deleteTrackSuccess, (state, action) => ({
    ...adapter.removeOne(action.id, state),
    status: 'success' as const,
    message: null,
  })),
  on(TrackActions.deleteTrackFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),

);

export const tracksFeature = createFeature({
  name: tracksFeatureKey,
  reducer,
  extraSelectors: ({ selectTracksState }) => ({
    ...adapter.getSelectors(selectTracksState),
    selectStatus: createSelector(
      selectTracksState,
      (state: State) => state.status
    ),
    selectMessage: createSelector(
      selectTracksState,
      (state: State) => state.message
    ),
    selectEditedTrack: createSelector(
      selectTracksState,
      (state: State) => state.editedTrack
    ),
    selectUploadStatus: createSelector(
      selectTracksState,
      (state: State) => state.uploadStatus
    ),
    selectUploadError: createSelector(
      selectTracksState,
      (state: State) => state.uploadError
    ),

  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectStatus,
  selectMessage,
  selectEditedTrack,
  selectUploadStatus,
  selectUploadError,
} = tracksFeature;
