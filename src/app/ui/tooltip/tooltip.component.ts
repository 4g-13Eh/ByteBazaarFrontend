import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  @Input() isHidden: boolean = true;
  @Input() tooltipText: string = '';
  @Input() xPos: number = 0;
  @Input() yPos: number = 0;

  get tooltipStyle() {
    return {
      'display': this.isHidden ? 'none' : 'block',
      'top': `${this.yPos}px`,
      'left': `${this.xPos}px`,
    };
  }

}
