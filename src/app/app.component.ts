import { Component } from '@angular/core';
import { AgendamentoLista } from './components/agendamento-lista/agendamento-lista';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgendamentoLista], // Certifique-se que o componente da tabela está aqui
  template: '<app-agendamento-lista></app-agendamento-lista>'
})
export class AppComponent { } // Esse nome "AppComponent" tem que ser idêntico ao do main.ts