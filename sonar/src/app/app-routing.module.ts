import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/player/player.module').then(m => m.PlayerModule) },
  { path: '', loadChildren: () => import('./features/playlist/playlist.module').then(m => m.PlaylistModule) },
  { path: '', loadChildren: () => import('./features/track/track.module').then(m => m.TrackModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
