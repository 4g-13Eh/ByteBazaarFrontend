import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ItemsComponent} from "./items/items.component";
import {ContentCardComponent} from "./ui/content-card/content-card.component";
import {TooltipComponent} from "./ui/tooltip/tooltip.component";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemsComponent, ContentCardComponent, TooltipComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ByteBazaar';
}
