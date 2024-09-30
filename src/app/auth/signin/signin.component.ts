import {Component, inject, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {SigninModel} from "../../models/signin.model";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../auth.global.css']
})
export class SigninComponent implements OnDestroy{
  private authService = inject(AuthService);
  private router = inject(Router);
  private authSubscription!: Subscription;

  protected form = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required ],
    }),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.minLength(8)],
    }),
  });

  get emailIsInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get passwordIsInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSubmit(){
    if (this.form.invalid){
      return;
    }

    const enteredEmail = this.form.value.email || '';
    const enteredPassword = this.form.value.password || '';
    const signinData: SigninModel = {email: enteredEmail, password: enteredPassword};

    this.authSubscription = this.authService.signin(signinData).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => console.error('Error signing in user', err)
    });
  }
}
