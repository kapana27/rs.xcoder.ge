import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorIncomeDialogFieldsComponent } from './inventor-income-dialog-fields.component';

describe('InventorIncomeDialogFieldsComponent', () => {
  let component: InventorIncomeDialogFieldsComponent;
  let fixture: ComponentFixture<InventorIncomeDialogFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorIncomeDialogFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorIncomeDialogFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
