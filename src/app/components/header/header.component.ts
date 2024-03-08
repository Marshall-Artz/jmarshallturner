import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  @Input() tabPanel: any;
  links = ['About', 'Projects'];
  activeLink = this.links[0]; // Default active set for 'About'
}
