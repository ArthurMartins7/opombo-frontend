import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeUserAdminComponent } from './home.component';



describe('HomeComponent', () => {
  let component: HomeUserAdminComponent;
  let fixture: ComponentFixture<HomeUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUserAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
