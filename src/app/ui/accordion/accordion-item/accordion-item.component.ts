import {Component, input, InputSignal} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  animations:[
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden',
      })),
      transition('initial <=> final', animate('150ms'))
    ]),
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(-180deg)'})),
      transition('default <=> rotated', animate('150ms'))
    ]),
  ],
})
export class AccordionItemComponent{
  public title: InputSignal<string | undefined> = input<string>();
  protected showBody: boolean = false;

  protected toggle(): void{
    this.showBody = !this.showBody;
  }
}
