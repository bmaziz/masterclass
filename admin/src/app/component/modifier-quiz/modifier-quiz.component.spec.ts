import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierQuizComponent } from './modifier-quiz.component';

describe('ModifierQuizComponent', () => {
  let component: ModifierQuizComponent;
  let fixture: ComponentFixture<ModifierQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierQuizComponent]
    });
    fixture = TestBed.createComponent(ModifierQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
