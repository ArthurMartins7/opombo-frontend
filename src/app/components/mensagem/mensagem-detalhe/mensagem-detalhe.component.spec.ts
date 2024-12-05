import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemDetalheComponent } from './mensagem-detalhe.component';

describe('MensagemDetalheComponent', () => {
  let component: MensagemDetalheComponent;
  let fixture: ComponentFixture<MensagemDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagemDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
