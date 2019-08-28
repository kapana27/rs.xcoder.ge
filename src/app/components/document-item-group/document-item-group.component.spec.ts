import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentItemGroupComponent } from './document-item-group.component';

describe('DocumentItemGroupComponent', () => {
  let component: DocumentItemGroupComponent;
  let fixture: ComponentFixture<DocumentItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentItemGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
