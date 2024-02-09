import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerQuizComponent } from './creer-quiz.component';

describe('CreerQuizComponent', () => {
  let component: CreerQuizComponent;
  let fixture: ComponentFixture<CreerQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerQuizComponent]
    });
    fixture = TestBed.createComponent(CreerQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
