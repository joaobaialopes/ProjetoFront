import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormaPagamento } from 'src/app/component/formaPagamento/formaPagamento.model';
import { formaPagamentoService } from 'src/app/component/formaPagamento/formaPagamento.service';
import { HeaderService } from 'src/app/component/template/header/header.service';

@Component({
  selector: 'app-forma-pagamento-crud', // Define o seletor do componente
  templateUrl: './forma-pagamento-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./forma-pagamento-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FormaPagamentoCrudComponent implements OnInit {
  searchTerm: string = '';
  allFormaPagamento: FormaPagamento[] = [];
  filteredFormaPagamento: FormaPagamento[] = [];
  // Construtor para injetar o serviço de roteamento
  constructor(
    private headerService: HeaderService,
    private router: Router,
    private formaPagamentoService: formaPagamentoService
  ) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    this.headerService.setTitulo('Pagamentos');
    this.headerService.setIcone('payments');
    this.formaPagamentoService.read().subscribe(formaPagamento => {
      this.allFormaPagamento = formaPagamento;
      this.filteredFormaPagamento = formaPagamento;
    });
  }

  // Método para navegar para a tela de criação de forma de pagamento
  navigateToFormaPagamentoCreate(): void {
    this.router.navigate(['/formaPagamento/create']);
  }

  filterFormaPagamento(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredFormaPagamento = this.allFormaPagamento.filter(p =>
      p.fpgDescricao.toLowerCase().includes(term)
    );
  }
}