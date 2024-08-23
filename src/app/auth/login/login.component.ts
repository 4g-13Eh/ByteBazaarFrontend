import {Component, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of, Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../user/user.service";

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
  private userService = inject(UserService);
  loginSuccess = false;
  users = true;
  private router = inject(Router);


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
    const enteredEmail = this.form.value.email || '';
    const enteredPassword = this.form.value.password || '';

    const user = this.userService.getUserByEmail(enteredEmail);

    if (user){
      if (user.password === enteredPassword){
        this.loginSuccess = true;
        console.log('succ')
        this.router.navigate([''])
      } else {
        this.loginSuccess = false
      }
    }else{
      this.users = false;
    }
  }
}
