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
import {Subscription} from "rxjs";
import {HeaderComponent} from "../../ui/header/header.component";

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
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.global.css']
})
export class SignupComponent implements OnDestroy{
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private subs: Subscription[] = [];

  protected form = new FormGroup({
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
  });

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  protected onSubmit(): void {
    if (this.form.invalid){
      console.error(`Invalid form: \n ${this.form.errors}`);
      return;
    }

    const email: string = this.form.controls.email.value ?? '';
    const password: string = this.form.controls.passwords.get('password')?.value ?? '';
    const confirmedPassword: string = this.form.controls.passwords.get('confirmPassword')?.value ?? '';
    const signupData: SignupModel = {email: email, password: password, confirmedPassword: confirmedPassword}

    this.subs.push(this.authService.signup(signupData).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error creating user', err)
      }
    }));
  }

  protected resetForm(): void {
    this.form.reset();
  }
}
