import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

  protected currentLink = inject(Router).url

  ngOnInit() {
    this.currentLink;
  }
}
