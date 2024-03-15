import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordComponent],
  template: `<app-password />`,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {}
