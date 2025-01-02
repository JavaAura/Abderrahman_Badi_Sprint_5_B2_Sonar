import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Track } from './track.model';

export const TrackActions = createActionGroup({
  source: 'Track/API',
  events: {
    'Load Tracks': props<{ tracks: Track[] }>(),
    'Add Track': props<{ track: Track }>(),
    'Upsert Track': props<{ track: Track }>(),
    'Add Tracks': props<{ tracks: Track[] }>(),
    'Upsert Tracks': props<{ tracks: Track[] }>(),
    'Update Track': props<{ track: Update<Track> }>(),
    'Update Tracks': props<{ tracks: Update<Track>[] }>(),
    'Delete Track': props<{ id: string }>(),
    'Delete Tracks': props<{ ids: string[] }>(),
    'Clear Tracks': emptyProps(),
  }
});
