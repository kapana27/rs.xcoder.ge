import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorIncomeDialogComponent } from './inventor-income-dialog.component';

describe('InventorIncomeDialogComponent', () => {
  let component: InventorIncomeDialogComponent;
  let fixture: ComponentFixture<InventorIncomeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorIncomeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorIncomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
