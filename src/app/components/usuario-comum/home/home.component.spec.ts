import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserCommomComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeUserCommomComponent;
  let fixture: ComponentFixture<HomeUserCommomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUserCommomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserCommomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
