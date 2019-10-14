import { Injectable } from '@angular/core';
import { Secret } from './secret';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SecretService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getSecrets():  Promise<Secret[]> {
    return this.http.get(this.baseUrl + '/api/secrets/')
      .toPromise()
      .then(response => response as Secret[])
      .catch(this.handleError);
  }

  createSecret(secretData: Secret): Promise<Secret> {
    return this.http.post(this.baseUrl + '/api/secrets/', secretData)
      .toPromise().then(response => response as Secret)
      .catch(this.handleError);
  }

  updateSecret(secretData: Secret): Promise<Secret> {
    return this.http.put(this.baseUrl + '/api/secrets/' + secretData.id, secretData)
      .toPromise()
      .then(response => response as Secret)
      .catch(this.handleError);
  }

  deleteSecret(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/secrets/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}