import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ResultMessage } from '../models/result/result-message';
import { LoginService } from '../services/login.service';

import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  mensagens: Array<ResultMessage>;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required)
    });
  }

  login(): void {
    const usuario = { ...this.loginForm.value };
    
    this.loginService.login(usuario).subscribe(
      response => {
        if (response.messages?.length) {
          this.mensagens = response.messages;
          this.exibirMensagensErro(response.messages);
        }
        else {
          this.localStorageService.salvarDadosLocaisUsuario(response.content, usuario);
          this.router.navigate(['/lotes']);
        }
      },
      error => { console.log(error) }
    );
  }

  exibirMensagensErro(mensagens: Array<ResultMessage>): void {
    mensagens.forEach(mensagem => {
      this.toastrService.error(mensagem.content, 'Erro :-(')
    });
  }
}
