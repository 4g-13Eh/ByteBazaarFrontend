import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import {ItemsComponent} from "./items/items.component";
import {ContentCardComponent} from "./ui/content-card/content-card.component";
import {TooltipComponent} from "./ui/tooltip/tooltip.component";
import {HeaderComponent} from "./header/header.component";
import {SearchfieldComponent} from "./ui/searchfield/searchfield.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemsComponent, ContentCardComponent, TooltipComponent, HeaderComponent, SearchfieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ByteBazaar';
  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     console.log(event);
  //   });
  // }
}
