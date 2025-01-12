import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoredFile } from '../../../../core/services/file/file.service';
import { selectLoadFilesStatus, selectTrackCovers } from '../../../track/state/track.reducer';
import { TrackActions } from '../../../track/state/track.actions';
import { Track } from '../../../track/state/track.model';

@Component({
  selector: 'app-track-covers-popup',
  templateUrl: './track-covers-popup.component.html',
  styleUrl: './track-covers-popup.component.scss'
})
export class TrackCoversPopupComponent {
  @Input() track!: Track;
  @Output() close = new EventEmitter<void>()  
  trackCovers$: Observable<StoredFile[]> = this.store.select(selectTrackCovers)    
  status$: Observable<string> = this.store.select(selectLoadFilesStatus)


  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTrackCovers({ trackId: this.track.id }))
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.track-popup-background') && !target.closest('.track-container')) {
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit();
  }
}
