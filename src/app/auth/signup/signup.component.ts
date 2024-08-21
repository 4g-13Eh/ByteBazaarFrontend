import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ItemModel} from "../../items/item/item.model";

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
      console.log('Invalid Form');
      console.log(this.form);
      return;
    }
    console.log(this.form.value)
    localStorage.setItem('user', JSON.stringify(
      {email: this.form.value.email, password: this.form.value.passwords?.password}
    ));
    return this.form.value;
  }

  resetForm() {
    this.form.reset();
  }
}
