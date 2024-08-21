import {Component, input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [BrowserAnimationsModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  animations:[
    trigger('smooth', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden',
      })),
      transition('initial<=>final', animate('250ms'))
    ])
  ]
})
export class AccordionItemComponent implements OnInit{
  title = input<string>();
  showBody = false;

  ngOnInit() {
  }

  toggle(){
    this.showBody = !this.showBody;
  }
}
