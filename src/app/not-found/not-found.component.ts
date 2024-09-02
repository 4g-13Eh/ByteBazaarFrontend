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
  router = inject(Router);

  currentLink = '';

  ngOnInit() {
    this.currentLink = this.router.url;
  }
}
