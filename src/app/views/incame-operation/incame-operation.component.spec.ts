import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncameOperationComponent } from './incame-operation.component';

describe('IncameOperationComponent', () => {
  let component: IncameOperationComponent;
  let fixture: ComponentFixture<IncameOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncameOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncameOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
