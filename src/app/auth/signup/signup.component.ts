import {Component, inject, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SignupModel} from "../../models/signup.model";
import {JwtTokenModel} from "../../models/jwtToken.model";
import {Subscription} from "rxjs";

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl)=>{
    const val1 = control.get(controlName1)?.value; // must correspond to key-value of equivalent formcontrol
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.global.css']
})
export class SignupComponent implements OnDestroy{
  private router = inject(Router);
  private authService = inject(AuthService);
  private subs: Subscription[] = [];

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    }, {
      validators: [equalValues('password', 'confirmPassword')]
    }),
    agree: new FormControl(false, {validators: [Validators.required]}),
  });

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onSubmit() {
    if (this.form.invalid){
      return;
    }

    const email = this.form.controls.email.value || '';
    const password = this.form.controls.passwords.get('password')?.value || '';
    const confirmedPassword = this.form.controls.passwords.get('confirmPassword')?.value || '';
    const signupData: SignupModel = {email: email, password: password, confirmedPassword: confirmedPassword}

    this.subs.push(this.authService.signup(signupData).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {console.error('Error creating user', err)}
    }));
  }

  resetForm() {
    this.form.reset();
  }
}
