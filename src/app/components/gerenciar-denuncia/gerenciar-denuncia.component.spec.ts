import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarDenunciaComponent } from './gerenciar-denuncia.component';

describe('GerenciarDenunciaComponent', () => {
  let component: GerenciarDenunciaComponent;
  let fixture: ComponentFixture<GerenciarDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarDenunciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
