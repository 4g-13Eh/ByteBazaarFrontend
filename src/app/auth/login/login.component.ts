import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of, Subscription} from "rxjs";
import {RouterLink} from "@angular/router";

function userNameIsUnique(control: AbstractControl){
  if (control.value !== 'test@email.com'){
    return of(null);
  }

  return of({ isNotUniqueEmail: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.global.css']
})
export class LoginComponent {
  private subscription!: Subscription;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required ],
      asyncValidators: [userNameIsUnique]
    }),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get passwordIsInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;

  }

  ngOnInit() {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedForm.email,
      })
    }

    this.subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    console.log(this.form);
    const enteredEmail = this.form.value.email
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword)
    const signupCredentials = localStorage.getItem('user' );
    if (signupCredentials){
      const user = JSON.parse(signupCredentials);
      if (user.email === enteredEmail && user.password === enteredPassword){
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    } else{
      console.log('No user found, please sign up first');
    }
  }
}
