import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  duration: number = 225;
  currentTime: number = 0;
  isPlaying: boolean = false;

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
