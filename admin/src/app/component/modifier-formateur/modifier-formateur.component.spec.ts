import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFormateurComponent } from './modifier-formateur.component';

describe('ModifierFormateurComponent', () => {
  let component: ModifierFormateurComponent;
  let fixture: ComponentFixture<ModifierFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierFormateurComponent]
    });
    fixture = TestBed.createComponent(ModifierFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
