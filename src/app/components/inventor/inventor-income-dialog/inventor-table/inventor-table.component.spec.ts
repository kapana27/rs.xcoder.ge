import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorTableComponent } from './inventor-table.component';

describe('InventorTableComponent', () => {
  let component: InventorTableComponent;
  let fixture: ComponentFixture<InventorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
