import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsContainerComponent } from './projects-page.component';

describe('ProjectsContainerComponent', () => {
  let component: ProjectsContainerComponent;
  let fixture: ComponentFixture<ProjectsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
