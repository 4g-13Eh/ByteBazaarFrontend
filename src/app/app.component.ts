import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ItemsComponent} from "./items/items.component";
import {HeaderComponent} from "./header/header.component";
import {ContentCardComponent} from "./ui/content-card/content-card.component";
import {TooltipComponent} from "./ui/tooltip/tooltip.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemsComponent, HeaderComponent, ContentCardComponent, TooltipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ByteBazaar';
  searchQuery: string = '';
}
