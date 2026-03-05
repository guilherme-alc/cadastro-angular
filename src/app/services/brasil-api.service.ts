import { Injectable } from '@angular/core';
import { Estado, Municipio } from '../models/brasilApi.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  private baseUrl: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  public getUFs() : Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseUrl}/ibge/uf/v1`);
  }

  public getMunicipios(uf: string) : Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.baseUrl}/ibge/municipios/v1/${uf}`);
  }
}
