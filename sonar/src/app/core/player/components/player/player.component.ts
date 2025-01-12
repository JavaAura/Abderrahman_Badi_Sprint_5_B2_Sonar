import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from '../../../../features/track/state/track.model';
import { selectActiveTrack, selectAll, selectTrackAudio, selectTrackCover } from '../../../../features/track/state/track.reducer';
import { isPlatformBrowser } from '@angular/common';
import { StoredFile } from '../../../services/file/file.service';
import { TrackActions } from '../../../../features/track/state/track.actions';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  duration: number = 225;
  currentTime: number = 0;
  isPlaying: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectAll);
  activeTrack$: Observable<Track | null> = this.store.select(selectActiveTrack)
  trackAudio$: Observable<StoredFile | null> = this.store.select(selectTrackAudio)
  trackCover$: Observable<StoredFile | null> = this.store.select(selectTrackCover)
  audio!: HTMLAudioElement;
  url: string | null = null;
  private objectUrls: string[] = [];

  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
    }
  }

  ngOnInit() {
    this.activeTrack$.subscribe((activeTrack) => {
      if (activeTrack) {
        this.onActiveTrackChange(activeTrack);
      }
    });
    this.trackAudio$.subscribe((audioFile) => {
      if (audioFile) {
        this.onAudioFileChange(audioFile);
      }
    });
    this.trackCover$.subscribe((coverFile) => {
      if (coverFile) {
        this.onCoverFileChange(coverFile);
      }
    });
  }


  onCoverFileChange(coverFile: StoredFile) {
    if (this.url) {
      URL.revokeObjectURL(this.url);
    }

    this.url = URL.createObjectURL(coverFile.file);
  }

  onAudioFileChange(audioFile: StoredFile) {
    const url = URL.createObjectURL(audioFile.file);
    this.objectUrls.push(url);
    this.audio.src = url;
    this.isPlaying = true;
    this.isPlaying = true;
    this.audio.play();

  }

  onActiveTrackChange(track: Track) {
    this.store.dispatch(TrackActions.loadTrackAudio({ trackId: track.id }))
    this.store.dispatch(TrackActions.loadTrackCover({ trackId: track.id }))
  }

  togglePlayer() {
    if(this.isPlaying){
      this.audio.pause();
    }else{
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying

  }

  updateValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const parentElement = input.parentNode as HTMLElement;

    // Update the parent node's custom property
    parentElement?.style.setProperty('--value', value);

    // Optionally update currentTime for live updates
    this.currentTime = parseFloat(value);
  }
}
