import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleGateauComponent } from './modal-single-gateau.component';

describe('ModalSingleGateauComponent', () => {
  let component: ModalSingleGateauComponent;
  let fixture: ComponentFixture<ModalSingleGateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleGateauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleGateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
