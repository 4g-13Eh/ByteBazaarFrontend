import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ItemComponent} from "./item/item.component";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ByteBazaar';
  searchQuery: string = '';
}
