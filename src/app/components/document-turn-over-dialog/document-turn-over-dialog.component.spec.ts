import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTurnOverDialogComponent } from './document-turn-over-dialog.component';

describe('DocumentTurnOverDialogComponent', () => {
  let component: DocumentTurnOverDialogComponent;
  let fixture: ComponentFixture<DocumentTurnOverDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTurnOverDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTurnOverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
