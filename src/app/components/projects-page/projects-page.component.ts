import { Component } from '@angular/core';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent {
  selectedProject: string = 'leadSundayForm';
}
