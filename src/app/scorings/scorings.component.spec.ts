import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringsComponent } from './scorings.component';

describe('ScoringsComponent', () => {
  let component: ScoringsComponent;
  let fixture: ComponentFixture<ScoringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
