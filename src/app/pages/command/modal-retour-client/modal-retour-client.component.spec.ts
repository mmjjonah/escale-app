import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRetourClientComponent } from './modal-retour-client.component';

describe('ModalRetourClientComponent', () => {
  let component: ModalRetourClientComponent;
  let fixture: ComponentFixture<ModalRetourClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRetourClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRetourClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
