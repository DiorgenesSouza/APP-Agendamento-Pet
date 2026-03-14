import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly API = 'http://localhost:8080/api/agendamentos';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  // Envia o novo agendamento para o backend
  salvar(agendamento: any): Observable<any> {
    return this.http.post<any>(this.API, agendamento);
  }

  remover(id: number): Observable<any> {
  return this.http.delete(`${this.API}/${id}`);
}

atualizar(id: number, agendamento: any): Observable<any> {
  return this.http.put(`${this.API}/${id}`, agendamento);
}

}