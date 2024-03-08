import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceUserListComponent } from './performance-user-list.component';

describe('PerformanceUserListComponent', () => {
  let component: PerformanceUserListComponent;
  let fixture: ComponentFixture<PerformanceUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
