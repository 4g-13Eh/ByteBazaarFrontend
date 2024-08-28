import {Component, inject} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-paymethod',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatList,
    MatListItem,
    FormsModule
  ],
  templateUrl: './paymethod.component.html',
  styleUrl: './paymethod.component.css',
})
export class PaymethodComponent {
  private router = inject(Router);

  form: FormGroup = new FormGroup({
    ccNumber: new FormControl('', {
      validators: [Validators.required, Validators.minLength(14), Validators.maxLength(14)],
    }),
    ccExpire: new FormControl('', {validators: [Validators.required, Validators.maxLength(7)]
    }),
    cvc: new FormControl('', {validators: [Validators.required, Validators.maxLength(4)]}),
  })

  backToCart(){
    this.router.navigate(['/cart']);
  }

  onBuy(){

  }

}
