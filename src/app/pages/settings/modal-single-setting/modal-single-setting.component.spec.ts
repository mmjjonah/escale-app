import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSingleSettingComponent } from './modal-single-setting.component';

describe('ModalSingleSettingComponent', () => {
  let component: ModalSingleSettingComponent;
  let fixture: ComponentFixture<ModalSingleSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSingleSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSingleSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
