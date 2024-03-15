import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { PasswordComponent } from './password.component';
import { passwordStrengthValidator } from './password.validator';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PasswordComponent],
      providers: [FormBuilder, passwordStrengthValidator],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a password form control', () => {
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should make the password control required', () => {
    let control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  describe('password strength', () => {
    const red = 'weakpassword';
    const yellow = 'MudiumPassword111';
    const green = 'StrongPassword111!!!';

    let control: AbstractControl | null;
    beforeEach(() => (control = component.form.get('password')));

    it('should validate red strength', () => {
      control?.setValue(red);
      expect(control?.hasError('strength')).toBeTruthy();
      expect(control?.errors).toEqual({ strength: 'red' });
    });

    it('should validate yellow strength', () => {
      control?.setValue(yellow);
      expect(control?.hasError('strength')).toBeTruthy();
      expect(control?.errors).toEqual({ strength: 'yellow' });
    });

    it('should validate green strength', () => {
      control?.setValue(green);
      expect(control?.hasError('strength')).toBeTruthy();
      expect(control?.errors).toEqual({ strength: 'green' });
    });
  });
});
