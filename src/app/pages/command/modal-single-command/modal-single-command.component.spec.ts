import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleCommandComponent } from './modal-single-command.component';

describe('ModalSingleCommandComponent', () => {
  let component: ModalSingleCommandComponent;
  let fixture: ComponentFixture<ModalSingleCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
