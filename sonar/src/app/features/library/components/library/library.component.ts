import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../../../track/state/track.model';
import { MusicCategory } from '../../../../core/enums/music-category.enum';
import { TrackActions } from '../../../track/state/track.actions';
import { log } from 'console';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  isOpen: boolean = false;
  track: Track = {
    id: '1',
    name: "qsdqsdqsd",
    author: 'qsdqsdqsd',
    duration: 200,
    category: MusicCategory.POP,
    creationDate: new Date()
  }

  constructor(private store: Store) { }

  closeTrackForm() {
    this.isOpen = false;
  }

  editTrack(track: Track) {
    this.store.dispatch(TrackActions.editTrack({ track }))
    this.isOpen = true;
  }




  // To be deleted 
  counter: number = 20

  get counterArray(): number[] {
    return Array.from({ length: this.counter }, (_, index) => index + 1);
  }

}
