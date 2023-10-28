import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  listarTodos(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return this.http.get(this.categoriaUrl, { headers })
      .toPromise()
      .then(response => response.json());
  }

}
