import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Player } from './player.model';
import { PlayerActions } from './player.actions';

export const playersFeatureKey = 'players';

export interface State extends EntityState<Player> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PlayerActions.addPlayer,
    (state, action) => adapter.addOne(action.player, state)
  ),
  on(PlayerActions.upsertPlayer,
    (state, action) => adapter.upsertOne(action.player, state)
  ),
  on(PlayerActions.addPlayers,
    (state, action) => adapter.addMany(action.players, state)
  ),
  on(PlayerActions.upsertPlayers,
    (state, action) => adapter.upsertMany(action.players, state)
  ),
  on(PlayerActions.updatePlayer,
    (state, action) => adapter.updateOne(action.player, state)
  ),
  on(PlayerActions.updatePlayers,
    (state, action) => adapter.updateMany(action.players, state)
  ),
  on(PlayerActions.deletePlayer,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PlayerActions.deletePlayers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PlayerActions.loadPlayers,
    (state, action) => adapter.setAll(action.players, state)
  ),
  on(PlayerActions.clearPlayers,
    state => adapter.removeAll(state)
  ),
);

export const playersFeature = createFeature({
  name: playersFeatureKey,
  reducer,
  extraSelectors: ({ selectPlayersState }) => ({
    ...adapter.getSelectors(selectPlayersState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = playersFeature;
