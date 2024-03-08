import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLayoutComponent } from './performance-layout.component';

describe('PerformanceLayoutComponent', () => {
  let component: PerformanceLayoutComponent;
  let fixture: ComponentFixture<PerformanceLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
