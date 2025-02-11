import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatorComponentComponent } from './form-creator-component.component';

describe('FormCreatorComponentComponent', () => {
  let component: FormCreatorComponentComponent;
  let fixture: ComponentFixture<FormCreatorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCreatorComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreatorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
