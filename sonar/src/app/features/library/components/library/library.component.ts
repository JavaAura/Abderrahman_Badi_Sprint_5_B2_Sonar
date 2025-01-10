import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  counter: number = 20

  get counterArray(): number[] {
    return Array.from({ length: this.counter }, (_, index) => index + 1);
  }
}
