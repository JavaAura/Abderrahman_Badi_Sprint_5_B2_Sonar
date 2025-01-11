import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../../../track/state/track.model';
import { TrackActions } from '../../../track/state/track.actions';
import { Observable } from 'rxjs';
import { selectAll } from '../../../track/state/track.reducer';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  isOpen: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectAll);

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTracks());
  }

  closeTrackForm() {
    this.isOpen = false;
  }

  editTrack(track: Track) {
    this.store.dispatch(TrackActions.editTrack({ track }))
    this.isOpen = true;
  }

}
