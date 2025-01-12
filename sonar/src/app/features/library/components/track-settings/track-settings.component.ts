import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Track } from '../../../track/state/track.model';

@Component({
  selector: 'app-track-settings',
  templateUrl: './track-settings.component.html',
  styleUrl: './track-settings.component.scss'
})
export class TrackSettingsComponent {
  @Input() track!: Track;
  @Output() open = new EventEmitter<Track>();
  isOpen: boolean = false

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-button')) {
      this.isOpen = false;
    }
  }


  editTrack() {
    this.open.emit(this.track);
  }
}
