import { Component } from '@angular/core';

@Component({
  selector: 'app-playlist-menu',
  templateUrl: './playlist-menu.component.html',
  styleUrl: './playlist-menu.component.css'
})
export class PlaylistMenuComponent {
isOpen: boolean = false;

  openMenu() {
    this.isOpen = true;
  }

}
