import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicCategory } from '../../core/enums/music-category.enum';
import { log } from 'node:console';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.scss'
})
export class TrackFormComponent {
  taskForm: FormGroup;
  categories: string[] = Object.values(MusicCategory);
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: ['', Validators.required],
      status: [''],
      categoryId: ['', Validators.required]
    });
    console.log(this.categories);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // Close methods
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
