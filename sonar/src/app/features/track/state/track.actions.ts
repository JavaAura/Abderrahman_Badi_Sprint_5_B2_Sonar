import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Track } from './track.model';
import { StoredFile } from '../../../core/services/file/file.service';

export const TrackActions = createActionGroup({
  source: 'Track/API',
  events: {
    'Upload Track Files': props<{ trackFile: File; coverFile: File | null, trackId: string }>(),
    'Upload Track Files Success': emptyProps(),
    'Upload Track Files Failure': props<{ error: string }>(),

    'Load Track Audio': props<{ trackId: string }>(),
    'Load Track Audio Success': props<{ file: StoredFile }>(),
    'Load Track Audio Failure': props<{ error: string }>(),
    'Load Track Cover': props<{ trackId: string }>(),
    'Load Track Cover Success': props<{ file: StoredFile }>(),
    'Load Track Cover Failure': props<{ error: string }>(),


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

    'Play Track': props<{ track: Track }>(),

  }
});
