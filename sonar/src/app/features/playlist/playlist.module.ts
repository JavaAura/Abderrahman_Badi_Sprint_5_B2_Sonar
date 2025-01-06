import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPlaylist from './state/playlist.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlaylistEffects } from './state/playlist.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPlaylist.playlistsFeatureKey, fromPlaylist.reducer),
    EffectsModule.forFeature([PlaylistEffects])
  ]
})
export class PlaylistModule { }
