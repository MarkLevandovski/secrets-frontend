import { Component, OnInit } from '@angular/core';
import { Secret } from './secret';
import { SecretService } from './secret.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'secret-list',
  templateUrl: './secret-list.component.html'
})

export class SecretListComponent implements OnInit {
  secrets: Secret[];
  newSecret: Secret = new Secret();
  editing: boolean = false;
  editingSecret: Secret = new Secret();

  constructor(
    private secretService: SecretService,
  ) {}

  ngOnInit(): void {
    this.getSecrets();
  }

  getSecrets(): void {
    this.secretService.getSecrets()
    .then(secrets => this.secrets = secrets );  
  }

  createSecret(secretForm: FormsModule): void {
    this.secretService.createSecret(this.newSecret)
      .then(createSecret => {        
        this.newSecret = new Secret();
        this.secrets.unshift(createSecret)
      });
  }

  deleteSecret(id: string): void {
    this.secretService.deleteSecret(id)
    .then(() => {
      this.secrets = this.secrets.filter(secret => secret.id != id);
    });
  }

  updateSecret(secretData: Secret): void {
    console.log(secretData);
    this.secretService.updateSecret(secretData)
    .then(updatedSecret => {
      let existingSecret = this.secrets.find(secret => secret.id === updatedSecret.id);
      Object.assign(existingSecret, updatedSecret);
      this.clearEditing();
    });
  }

  editSecret(secretData: Secret): void {
    this.editing = true;
    Object.assign(this.editingSecret, secretData);
  }

  clearEditing(): void {
    this.editingSecret = new Secret();
    this.editing = false;
  }
}