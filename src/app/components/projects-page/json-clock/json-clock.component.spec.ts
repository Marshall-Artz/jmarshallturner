import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonClockComponent } from './json-clock.component';

describe('JsonClockComponent', () => {
  let component: JsonClockComponent;
  let fixture: ComponentFixture<JsonClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsonClockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
