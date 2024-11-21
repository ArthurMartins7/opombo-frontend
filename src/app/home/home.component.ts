import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { Usuario } from '../shared/model/entity/Usuario';
import { Mensagem } from '../shared/model/entity/Mensagem';
import { MensagemSeletor } from '../shared/model/seletor/Mensagem_seletor';
import { MensagemService } from '../shared/service/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public usuarioAutenticado: Usuario;
  public mensagens: Array<Mensagem> = new Array();
  track: TrackByFunction<Mensagem>;
  trackMensagem: TrackByFunction<Mensagem>;
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 3;
  public seletor: MensagemSeletor = new MensagemSeletor();

  constructor(
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute,
  ){}


  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.pesquisar();
    this.contarPaginas();
  }

  public inserir() {
    const mensagem: Mensagem = this.mensagens[0]; // Pegando a primeira mensagem do array
    this.mensagemService.publicarMensagem(mensagem).subscribe(
      (resposta) => {
        Swal.fire('Pruu salvo com sucesso!', '', 'success');
      },
      (erro) => {
        Swal.fire('Erro ao salvar o pruu: ' + erro.error, '', 'error');
      }
    );
  }


  public pesquisar() {
    this.mensagemService.buscarComSeletor(this.seletor).subscribe(
      resultado => {
        this.mensagens = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar mensagens!', erro.error, 'error');
      }
    );
  }

  public cadastro(){
    this.router.navigate(["/home/pru"])
  }
  public contarPaginas() {
    this.mensagemService.contarPaginas(this.seletor).subscribe(
      resultado => {
        this.totalPaginas = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar total de paginas', erro.error, 'error');
      }
    );
  }

  public limpar(){
    this.seletor = new MensagemSeletor();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.pesquisar();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.pesquisar();
  }

  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.pesquisar();
  }

  private buscarTodosPruus(){
    this.mensagemService.buscarTodos().subscribe(
      resultado => {
        this.mensagens = resultado;
      },
      erro => {
        console.error('Erro ao buscar mensagens! ', erro);
      }
    );
  }
}
