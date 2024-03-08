import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDetailLayoutComponent } from './performance-detail-layout.component';

describe('PerformanceDetailLayoutComponent', () => {
  let component: PerformanceDetailLayoutComponent;
  let fixture: ComponentFixture<PerformanceDetailLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceDetailLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceDetailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
