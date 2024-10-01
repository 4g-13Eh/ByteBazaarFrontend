import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ItemsComponent} from "./items/items.component";
import {DialogComponent} from "./ui/dialog/dialog.component";
import {HeaderComponent} from "./ui/header/header.component";
import {SearchfieldComponent} from "./ui/searchfield/searchfield.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemsComponent, DialogComponent, HeaderComponent, SearchfieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'ByteBazaar';
  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     console.log(event);
  //   });
  // }
}
