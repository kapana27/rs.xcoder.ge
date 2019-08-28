import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTurnOverDisabledDialogComponent } from './document-turn-over-disabled-dialog.component';

describe('DocumentTurnOverDisabledDialogComponent', () => {
  let component: DocumentTurnOverDisabledDialogComponent;
  let fixture: ComponentFixture<DocumentTurnOverDisabledDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTurnOverDisabledDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTurnOverDisabledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
