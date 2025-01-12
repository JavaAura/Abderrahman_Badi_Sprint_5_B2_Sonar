import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPlayerPipe } from './pipes/time-format-player.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';



@NgModule({
  declarations: [TimeFormatPlayerPipe, TimeFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeFormatPlayerPipe, TimeFormatPipe]
})
export class SharedModule { }
