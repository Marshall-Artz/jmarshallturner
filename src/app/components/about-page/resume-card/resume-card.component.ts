import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrl: './resume-card.component.css'
})
export class ResumeCardComponent {
  isMobile = window.innerWidth <= 1100;

  openResume() {
    window.open('assets/JMarshallTurner_resume.pdf', '_blank');
  }
}
