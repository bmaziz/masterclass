import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteQuizComponent } from './note-quiz.component';

describe('NoteQuizComponent', () => {
  let component: NoteQuizComponent;
  let fixture: ComponentFixture<NoteQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteQuizComponent]
    });
    fixture = TestBed.createComponent(NoteQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
