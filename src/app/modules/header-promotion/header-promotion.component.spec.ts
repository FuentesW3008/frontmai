import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPromotionComponent } from './header-promotion.component';

describe('HeaderPromotionComponent', () => {
  let component: HeaderPromotionComponent;
  let fixture: ComponentFixture<HeaderPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPromotionComponent]
    });
    fixture = TestBed.createComponent(HeaderPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
