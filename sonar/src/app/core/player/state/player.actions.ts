import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Player } from './player.model';

export const PlayerActions = createActionGroup({
  source: 'Player/API',
  events: {
    'Load Players': props<{ players: Player[] }>(),
    'Add Player': props<{ player: Player }>(),
    'Upsert Player': props<{ player: Player }>(),
    'Add Players': props<{ players: Player[] }>(),
    'Upsert Players': props<{ players: Player[] }>(),
    'Update Player': props<{ player: Update<Player> }>(),
    'Update Players': props<{ players: Update<Player>[] }>(),
    'Delete Player': props<{ id: string }>(),
    'Delete Players': props<{ ids: string[] }>(),
    'Clear Players': emptyProps(),
  }
});
