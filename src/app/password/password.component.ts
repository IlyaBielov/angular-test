import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordDirective } from './password.directive';
import { passwordStrengthValidator } from './password.validator';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PasswordDirective],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      password: ['', passwordStrengthValidator()],
    });
  }
}
