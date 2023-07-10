import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewletterComponent } from './newletter.component';

describe('NewletterComponent', () => {
  let component: NewletterComponent;
  let fixture: ComponentFixture<NewletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewletterComponent]
    });
    fixture = TestBed.createComponent(NewletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
