import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromPlayer from './player/state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './player/state/player.effects';
import { PlayerComponent } from './player/components/player/player.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PlaylistMenuComponent } from './shared/playlist-menu/playlist-menu.component';
import { IndexedDbService } from './services/indexed-db.service'

@NgModule({
  declarations: [
    SidebarComponent,
    PlayerComponent,
    PlaylistMenuComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPlayer.playersFeatureKey, fromPlayer.reducer),
    EffectsModule.forFeature([PlayerEffects])
  ],
  exports: [
    SidebarComponent,
    PlayerComponent
  ],
  providers: [
    IndexedDbService
  ]
})
export class CoreModule { }
