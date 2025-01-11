import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Track } from './track.model';

export const TrackActions = createActionGroup({
  source: 'Track/API',
  events: {
    'Upload Track Files': props<{ trackFile: File; coverFile: File | null, trackId: string }>(),
    'Upload Track Files Success': emptyProps(),
    'Upload Track Files Failure': props<{ error: string }>(),
    'Edit Track': props<{ track: Track }>(),
    'Clear Edited Track': emptyProps(),
    'Load Tracks': emptyProps(),
    'Load Tracks Success': props<{ tracks: Track[] }>(),
    'Load Tracks Failure': props<{ error: string }>(),
    'Add Track': props<{ track: Track }>(),
    'Add Track Success': props<{ track: Track }>(),
    'Add Track Failure': props<{ error: string }>(),
    'Update Track': props<{ track: Update<Track> }>(),
    'Update Track Success': props<{ track: Update<Track> }>(),
    'Update Track Failure': props<{ error: string }>(),
    'Delete Track': props<{ id: string }>(),
    'Delete Track Success': props<{ id: string }>(),
    'Delete Track Failure': props<{ error: string }>(),
  }
});
