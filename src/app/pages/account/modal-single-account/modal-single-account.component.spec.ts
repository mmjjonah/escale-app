import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleAccountComponent } from './modal-single-account.component';

describe('ModalSingleAccountComponent', () => {
  let component: ModalSingleAccountComponent;
  let fixture: ComponentFixture<ModalSingleAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
