import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { TrackFormComponent } from '../../shared/track-form/track-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibraryComponent,
    ButtonPrimaryComponent,
    TrackFormComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LibraryModule { }
