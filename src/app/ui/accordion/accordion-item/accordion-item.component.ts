import {Component, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css'
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
