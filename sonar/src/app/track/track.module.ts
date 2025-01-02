import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTrack from '../state/tracks/track.reducer';
import { TrackEffects } from '../state/tracks/track.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TrackRoutingModule,
    StoreModule.forFeature(fromTrack.tracksFeatureKey, fromTrack.reducer),
    EffectsModule.forFeature([TrackEffects]),
  ]
})
export class TrackModule { }
