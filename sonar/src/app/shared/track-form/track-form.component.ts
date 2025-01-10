import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MusicCategory } from '../../core/enums/music-category.enum';
import { Track } from '../../features/track/state/track.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEditedTrack } from '../../features/track/state/track.reducer';
import { TrackActions } from '../../features/track/state/track.actions';


@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.scss'
})
export class TrackFormComponent {
  track$: Observable<Track | null> = this.store.select(selectEditedTrack);
  editedTrack: Track | null = null;
  private subscription: Subscription;
  taskForm: FormGroup;
  categories: string[] = Object.values(MusicCategory);
  @Output() close = new EventEmitter<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      category: ['', [Validators.required, this.categoryValidator.bind(this)]],
      file: ['', [Validators.required, this.fileValidator.bind(this)]],
      cover: ['', this.coverValidator.bind(this)]
    });
    this.subscription = this.track$.subscribe((track) => this.editedTrack = track);
    console.log(this.editedTrack);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }


  categoryValidator(control: AbstractControl): ValidationErrors | null {
    return this.categories.includes(control.value)
      ? null
      : { invalidCategory: true };
  }


  fileValidator(control: AbstractControl): ValidationErrors | null {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/ogg'];
    const file = control.value as File;
    if (file && !allowedTypes.includes(file.type)) {
      return { invalidFileType: true };
    }
    return null;
  }


  coverValidator(control: AbstractControl): ValidationErrors | null {
    const allowedTypes = ['image/png', 'image/jpeg'];
    const maxSize = 15 * 1024 * 1024;
    const file = control.value as File;
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        return { invalidCoverType: true };
      }
      if (file.size > maxSize) {
        return { fileTooLarge: true };
      }
    }
    return null;
  }

  ngOnDestroy() {
    if (this.editedTrack) {
      this.store.dispatch(TrackActions.clearEditedTrack());
    }

    this.subscription.unsubscribe();
  }

  // Pupup methods
  closeForm() {
    this.close.emit();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.task-popup-background') && !target.closest('.task-form-container')) {
      this.closeForm();
    }
  }
}
