import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFormationComponent } from './ajouter-formation.component';

describe('AjouterFormationComponent', () => {
  let component: AjouterFormationComponent;
  let fixture: ComponentFixture<AjouterFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterFormationComponent]
    });
    fixture = TestBed.createComponent(AjouterFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
