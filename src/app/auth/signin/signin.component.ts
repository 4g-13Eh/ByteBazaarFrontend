import {Component, inject, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {SigninModel} from "../../models/signin.model";
import {AuthService} from "../../services/auth.service";
import {HeaderComponent} from "../../ui/header/header.component";


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../auth.global.css']
})
export class SigninComponent implements OnDestroy{
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private subs: Subscription[] = [];

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
    this.subs.forEach(sub => sub.unsubscribe())
  }

  protected onSubmit(): void {
    if (this.form.invalid){
      console.error(`Invalid form: \n ${this.form.errors}`);
      return;
    }

    const enteredEmail: string = this.form.value.email ?? '';
    const enteredPassword: string = this.form.value.password ?? '';
    const signinData: SigninModel = {email: enteredEmail, password: enteredPassword};

    this.subs.push(this.authService.signin(signinData).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(`Error creating user: \n ${err}`)
      }
    }));
  }
}
