import {Component, inject} from '@angular/core';
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
export class SignupComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private token: string  = "";

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required,]
      }),
    }, {
      validators: [equalValues('password', 'confirmPassword')]
    }),
    agree: new FormControl(false, {validators: [Validators.required]}),
  });

  onSubmit() {
    if (this.form.invalid){
      return;
    }

    const email = this.form.controls.email.value || '';
    const password = this.form.controls.passwords.get('password')?.value || '';
    const confirmedPassword = this.form.controls.passwords.get('confirmedPassword')?.value || '';
    const signupData: SignupModel = {email: email, password: password, confirmPassword: confirmedPassword}

    const newUser = this.authService.signup(signupData)

    // if (newUser){
    //   localStorage.setItem('currentUser', newUser);
    //   this.router.navigate([''])
    // }
  }

  resetForm() {
    this.form.reset();
  }
}
