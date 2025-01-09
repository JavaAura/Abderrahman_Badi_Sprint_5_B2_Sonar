import { Component, HostListener } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist-menu',
  templateUrl: './playlist-menu.component.html',
  styleUrl: './playlist-menu.component.css'
})
export class PlaylistMenuComponent {
  isOpen: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private screenService: ScreenService) { }

  openMenu() {
    this.isOpen = true;
  }

  ngOnInit() {
    this.subscription = this.screenService.isMediumScreen$.subscribe(isMedium => {
      this.isOpen = isMedium;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
