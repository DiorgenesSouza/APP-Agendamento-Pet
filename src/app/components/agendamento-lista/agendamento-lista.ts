import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AgendamentoService } from '../../services/agendamento'; 

@Component({
  selector: 'app-agendamento-lista',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './agendamento-lista.html',
  styleUrl: './agendamento-lista.css'
})
export class AgendamentoLista implements OnInit {

  listaAgendamentos: any[] = [];
  idEmEdicao: number | null = null;
  dataMinima: string = ''; // Variável para bloquear datas passadas no HTML
  
  novoAgendamento = {
    nome_pet: '',    
    nome_dono: '',   
    tipo_servico: '',
    data_hora: '' , 
    observacoes: ''
  };

  constructor(private service: AgendamentoService) {}

  ngOnInit(): void {
    this.listar();
    this.configurarDataMinima();
  }

  // Define a data mínima como "agora" para o input do calendário
  configurarDataMinima(): void {
    const agora = new Date();
    // Formata para YYYY-MM-DDTHH:mm exigido pelo input datetime-local
    this.dataMinima = agora.toISOString().slice(0, 16);
  }

  listar(): void {
    this.service.listarTodos().subscribe({
      next: (dados) => {
        this.listaAgendamentos = dados;
      },
      error: (erro) => console.error('Erro ao buscar dados:', erro)
    });
  }

  prepararEdicao(agendamento: any): void {
    this.idEmEdicao = agendamento.id;
    this.novoAgendamento = { ...agendamento }; 
  }

  adicionar(): void {
    // 1. Validação de campos obrigatórios
    if (!this.novoAgendamento.nome_pet || !this.novoAgendamento.data_hora) {
      alert('Por favor, preencha o nome do pet e a data!');
      return;
    }

    // 2. Validação de Segurança: Não permitir data no passado
    const dataSelecionada = new Date(this.novoAgendamento.data_hora);
    const agora = new Date();
    if (dataSelecionada < agora) {
      alert('Não é possível agendar para uma data ou hora que já passou!');
      return;
    }

    if (this.idEmEdicao) {
      this.service.atualizar(this.idEmEdicao, this.novoAgendamento).subscribe({
        next: () => {
          alert('Agendamento atualizado com sucesso!');
          this.limparFormulario();
        },
        error: (erro) => alert('Erro ao atualizar agendamento.')
      });
    } else {
      this.service.salvar(this.novoAgendamento).subscribe({
        next: () => this.limparFormulario(),
        error: (erro) => alert('Erro ao salvar agendamento.')
      });
    }
  }

  limparFormulario(): void {
    this.listar();
    this.idEmEdicao = null;
    this.novoAgendamento = { 
      nome_pet: '', 
      nome_dono: '', 
      tipo_servico: '', 
      data_hora: '' ,
      observacoes: ''
    };
    this.configurarDataMinima(); // Reseta a data mínima
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      this.service.remover(id).subscribe({
        next: () => this.listar(),
        error: (erro) => console.error('Erro ao excluir:', erro)
      });
    }
  }
}